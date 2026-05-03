/**
 * ProductionVideoCompressionEngine
 *
 * Secure, production-ready client-side video compression.
 * - Strict file validation (type, size, magic-bytes-ish via MIME)
 * - Configurable target bitrate / resolution / FPS / codec
 * - Uses MediaRecorder + HTMLVideoElement + Canvas pipeline (no upload)
 * - Progress reporting + cancellation (AbortSignal)
 * - Defensive memory cleanup (object URLs, streams)
 */

export type VideoQualityPreset = 'low' | 'medium' | 'high' | 'custom';

export interface VideoCompressionOptions {
  quality?: VideoQualityPreset;
  /** Target max width in pixels. Height scales to keep aspect ratio. */
  maxWidth?: number;
  /** Target max height in pixels. */
  maxHeight?: number;
  /** Target video bitrate in bits/sec. */
  videoBitrate?: number;
  /** Target audio bitrate in bits/sec. */
  audioBitrate?: number;
  /** Frames per second of the output. */
  fps?: number;
  /** Preferred MIME type, e.g. "video/webm;codecs=vp9,opus". */
  mimeType?: string;
  /** Mute audio in the output. */
  muteAudio?: boolean;
  /** Cancel via AbortSignal. */
  signal?: AbortSignal;
}

export interface VideoCompressionProgress {
  phase: 'validating' | 'preparing' | 'encoding' | 'finalizing' | 'done' | 'error';
  progress: number; // 0..100
  message?: string;
}

export interface VideoCompressionResult {
  blob: Blob;
  mimeType: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number; // 0..1, fraction saved
  width: number;
  height: number;
  durationSec: number;
  url: string; // object URL for preview/download
}

const PRESETS: Record<Exclude<VideoQualityPreset, 'custom'>, Required<Pick<VideoCompressionOptions, 'maxWidth' | 'maxHeight' | 'videoBitrate' | 'audioBitrate' | 'fps'>>> = {
  low:    { maxWidth: 640,  maxHeight: 360,  videoBitrate: 500_000,  audioBitrate: 64_000,  fps: 24 },
  medium: { maxWidth: 1280, maxHeight: 720,  videoBitrate: 1_500_000, audioBitrate: 96_000,  fps: 30 },
  high:   { maxWidth: 1920, maxHeight: 1080, videoBitrate: 4_000_000, audioBitrate: 128_000, fps: 30 },
};

// Security: hard limits to avoid OOM / abuse
const MAX_INPUT_BYTES = 500 * 1024 * 1024; // 500 MB
const ALLOWED_MIME_PREFIX = 'video/';
const ALLOWED_EXTENSIONS = ['mp4', 'webm', 'mov', 'm4v', 'mkv', 'avi', 'ogv', '3gp'];

export class ProductionVideoCompressionEngine {
  /** Pick the best supported MIME type. */
  static pickMimeType(preferred?: string): string {
    const candidates = [
      preferred,
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/webm',
      'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
      'video/mp4',
    ].filter(Boolean) as string[];

    for (const t of candidates) {
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) return t;
    }
    return 'video/webm';
  }

  static validate(file: File): void {
    if (!file) throw new Error('No file provided');
    if (file.size <= 0) throw new Error('File is empty');
    if (file.size > MAX_INPUT_BYTES) {
      throw new Error(`File too large. Max ${(MAX_INPUT_BYTES / (1024 * 1024)).toFixed(0)} MB`);
    }
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    const mimeOk = file.type.startsWith(ALLOWED_MIME_PREFIX);
    const extOk = ALLOWED_EXTENSIONS.includes(ext);
    if (!mimeOk && !extOk) {
      throw new Error('Unsupported file type. Please upload a video file.');
    }
  }

  async compress(
    file: File,
    options: VideoCompressionOptions = {},
    onProgress?: (p: VideoCompressionProgress) => void,
  ): Promise<VideoCompressionResult> {
    const emit = (p: VideoCompressionProgress) => onProgress?.(p);

    try {
      emit({ phase: 'validating', progress: 1, message: 'Validating file' });
      ProductionVideoCompressionEngine.validate(file);

      const preset = options.quality && options.quality !== 'custom' ? PRESETS[options.quality] : PRESETS.medium;
      const maxWidth = options.maxWidth ?? preset.maxWidth;
      const maxHeight = options.maxHeight ?? preset.maxHeight;
      const videoBitrate = options.videoBitrate ?? preset.videoBitrate;
      const audioBitrate = options.audioBitrate ?? preset.audioBitrate;
      const fps = Math.max(1, Math.min(60, options.fps ?? preset.fps));
      const mimeType = ProductionVideoCompressionEngine.pickMimeType(options.mimeType);

      if (typeof MediaRecorder === 'undefined') {
        throw new Error('Your browser does not support MediaRecorder.');
      }

      emit({ phase: 'preparing', progress: 5, message: 'Preparing video' });

      const objectUrl = URL.createObjectURL(file);
      const video = document.createElement('video');
      video.src = objectUrl;
      video.muted = true; // required to autoplay reliably
      video.playsInline = true;
      video.preload = 'auto';
      video.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        const onLoaded = () => {
          video.removeEventListener('loadedmetadata', onLoaded);
          video.removeEventListener('error', onErr);
          resolve();
        };
        const onErr = () => {
          video.removeEventListener('loadedmetadata', onLoaded);
          video.removeEventListener('error', onErr);
          reject(new Error('Failed to load video metadata'));
        };
        video.addEventListener('loadedmetadata', onLoaded);
        video.addEventListener('error', onErr);
      });

      const srcW = video.videoWidth;
      const srcH = video.videoHeight;
      const duration = isFinite(video.duration) ? video.duration : 0;
      if (!srcW || !srcH || !duration) {
        URL.revokeObjectURL(objectUrl);
        throw new Error('Invalid video: missing dimensions or duration');
      }

      const scale = Math.min(1, maxWidth / srcW, maxHeight / srcH);
      const outW = Math.max(2, Math.floor((srcW * scale) / 2) * 2);
      const outH = Math.max(2, Math.floor((srcH * scale) / 2) * 2);

      const canvas = document.createElement('canvas');
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        throw new Error('Canvas 2D context unavailable');
      }

      const canvasStream = (canvas as HTMLCanvasElement).captureStream(fps);

      // Audio: capture from the video element when possible
      let audioTrack: MediaStreamTrack | null = null;
      if (!options.muteAudio) {
        try {
          // @ts-expect-error - non-standard but widely supported
          const elementStream: MediaStream | undefined = video.captureStream
            ? // @ts-expect-error
              video.captureStream()
            : // @ts-expect-error
              video.mozCaptureStream?.();
          const tracks = elementStream?.getAudioTracks?.() ?? [];
          if (tracks.length > 0) {
            audioTrack = tracks[0];
            canvasStream.addTrack(audioTrack);
          }
        } catch {
          // audio capture not available; proceed silent
        }
      }

      const recorder = new MediaRecorder(canvasStream, {
        mimeType,
        videoBitsPerSecond: videoBitrate,
        audioBitsPerSecond: audioBitrate,
      });

      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      const stopAll = () => {
        try { recorder.state !== 'inactive' && recorder.stop(); } catch {}
        try { video.pause(); } catch {}
        try { canvasStream.getTracks().forEach((t) => t.stop()); } catch {}
        try { audioTrack?.stop(); } catch {}
      };

      const abort = () => {
        stopAll();
        URL.revokeObjectURL(objectUrl);
      };

      if (options.signal) {
        if (options.signal.aborted) {
          abort();
          throw new Error('Compression aborted');
        }
        options.signal.addEventListener('abort', abort, { once: true });
      }

      const finished = new Promise<Blob>((resolve, reject) => {
        recorder.onerror = (e: any) => reject(new Error(e?.error?.message || 'Recorder error'));
        recorder.onstop = () => {
          try {
            const blob = new Blob(chunks, { type: mimeType });
            resolve(blob);
          } catch (err) {
            reject(err as Error);
          }
        };
      });

      // Drive playback and draw frames
      emit({ phase: 'encoding', progress: 10, message: 'Encoding video' });
      recorder.start(250);

      let rafId = 0;
      let stopped = false;
      const drawLoop = () => {
        if (stopped) return;
        try {
          ctx.drawImage(video, 0, 0, outW, outH);
        } catch {
          // ignore transient draw errors
        }
        const pct = duration > 0 ? Math.min(99, 10 + (video.currentTime / duration) * 85) : 10;
        emit({ phase: 'encoding', progress: pct });
        rafId = requestAnimationFrame(drawLoop);
      };

      const onEnded = () => {
        stopped = true;
        cancelAnimationFrame(rafId);
        emit({ phase: 'finalizing', progress: 96, message: 'Finalizing' });
        // Allow final frames to flush
        setTimeout(stopAll, 120);
      };
      video.addEventListener('ended', onEnded, { once: true });

      try {
        await video.play();
      } catch (err) {
        stopAll();
        URL.revokeObjectURL(objectUrl);
        throw new Error('Failed to start video playback for encoding');
      }
      drawLoop();

      const blob = await finished;
      URL.revokeObjectURL(objectUrl);

      const result: VideoCompressionResult = {
        blob,
        mimeType,
        originalSize: file.size,
        compressedSize: blob.size,
        compressionRatio: file.size > 0 ? Math.max(0, 1 - blob.size / file.size) : 0,
        width: outW,
        height: outH,
        durationSec: duration,
        url: URL.createObjectURL(blob),
      };

      emit({ phase: 'done', progress: 100, message: 'Done' });
      return result;
    } catch (err: any) {
      emit({ phase: 'error', progress: 0, message: err?.message || 'Compression failed' });
      throw err;
    }
  }
}

export default ProductionVideoCompressionEngine;
