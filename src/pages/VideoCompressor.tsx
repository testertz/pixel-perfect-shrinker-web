import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Upload, Video as VideoIcon, Download, X, Loader2, ShieldCheck, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import ProductionVideoCompressionEngine, {
  VideoCompressionProgress,
  VideoCompressionResult,
  VideoQualityPreset,
} from '@/components/ProductionVideoCompressionEngine';

const formatSize = (bytes: number) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
};

type QueueStatus = 'pending' | 'processing' | 'done' | 'error' | 'cancelled';

interface QueueItem {
  id: string;
  file: File;
  previewUrl: string;
  status: QueueStatus;
  progress: number;
  phase?: string;
  message?: string;
  result?: VideoCompressionResult;
  error?: string;
  controller?: AbortController;
}

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const VideoCompressor: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [items, setItems] = useState<QueueItem[]>([]);
  const [quality, setQuality] = useState<VideoQualityPreset>('medium');
  const [muteAudio, setMuteAudio] = useState(false);
  const [bitrateMbps, setBitrateMbps] = useState<number>(1.5);
  const [mode, setMode] = useState<'bitrate' | 'targetSize'>('bitrate');
  const [targetValue, setTargetValue] = useState<number>(10);
  const [targetUnit, setTargetUnit] = useState<'KB' | 'MB'>('MB');
  const [isRunning, setIsRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const runningRef = useRef(false);

  const engine = useMemo(() => new ProductionVideoCompressionEngine(), []);

  const updateItem = useCallback((id: string, patch: Partial<QueueItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  const addFiles = useCallback((files: FileList | File[] | null) => {
    if (!files) return;
    const arr = Array.from(files);
    const accepted: QueueItem[] = [];
    for (const f of arr) {
      try {
        ProductionVideoCompressionEngine.validate(f);
        accepted.push({
          id: uid(),
          file: f,
          previewUrl: URL.createObjectURL(f),
          status: 'pending',
          progress: 0,
        });
      } catch (e: any) {
        toast({ title: t.error, description: `${f.name}: ${e.message}`, variant: 'destructive' });
      }
    }
    if (accepted.length) setItems((prev) => [...prev, ...accepted]);
  }, [t, toast]);

  const processItem = useCallback(async (id: string) => {
    const current = (it: QueueItem | undefined) => it;
    let snapshot: QueueItem | undefined;
    setItems((prev) => {
      snapshot = prev.find((p) => p.id === id);
      return prev;
    });
    if (!snapshot) return;
    const controller = new AbortController();
    updateItem(id, { status: 'processing', progress: 0, phase: 'preparing', controller });

    try {
      const res = await engine.compress(
        snapshot.file,
        {
          quality,
          videoBitrate: Math.round(bitrateMbps * 1_000_000),
          muteAudio,
          signal: controller.signal,
        },
        (p: VideoCompressionProgress) => {
          updateItem(id, { progress: p.progress, phase: p.phase, message: p.message });
        },
      );
      updateItem(id, { status: 'done', progress: 100, result: res, controller: undefined });
    } catch (e: any) {
      const cancelled = controller.signal.aborted;
      updateItem(id, {
        status: cancelled ? 'cancelled' : 'error',
        error: e?.message || 'Failed',
        controller: undefined,
      });
    }
    // suppress unused warning
    void current;
  }, [bitrateMbps, engine, muteAudio, quality, updateItem]);

  const startAll = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setIsRunning(true);
    try {
      // Process pending items sequentially to avoid memory pressure
      while (true) {
        const next = await new Promise<QueueItem | undefined>((resolve) => {
          setItems((prev) => {
            resolve(prev.find((it) => it.status === 'pending'));
            return prev;
          });
        });
        if (!next) break;
        await processItem(next.id);
      }
    } finally {
      runningRef.current = false;
      setIsRunning(false);
    }
  }, [processItem]);

  const cancelItem = (id: string) => {
    setItems((prev) => {
      const it = prev.find((p) => p.id === id);
      it?.controller?.abort();
      return prev;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const it = prev.find((p) => p.id === id);
      it?.controller?.abort();
      if (it?.previewUrl) URL.revokeObjectURL(it.previewUrl);
      if (it?.result?.url) URL.revokeObjectURL(it.result.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const downloadItem = (it: QueueItem) => {
    if (!it.result) return;
    const a = document.createElement('a');
    a.href = it.result.url;
    const ext = it.result.mimeType.includes('mp4') ? 'mp4' : 'webm';
    const base = it.file.name.replace(/\.[^.]+$/, '') || 'video';
    a.download = `${base}-compressed.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadAll = () => {
    items.filter((it) => it.status === 'done').forEach((it, i) => setTimeout(() => downloadItem(it), i * 200));
  };

  const clearAll = () => {
    items.forEach((it) => {
      it.controller?.abort();
      URL.revokeObjectURL(it.previewUrl);
      if (it.result?.url) URL.revokeObjectURL(it.result.url);
    });
    setItems([]);
  };

  const pendingCount = items.filter((i) => i.status === 'pending').length;
  const doneCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            <ShieldCheck className="w-3 h-3 mr-1" /> {t.secure}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-3">
            {t.videoCompressorTitle}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.videoCompressorDesc}
          </p>
        </div>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <VideoIcon className="w-5 h-5" /> {t.uploadVideo}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addFiles(e.dataTransfer.files);
              }}
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/60 transition"
            >
              <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="font-medium">{t.dragDropVideo}</p>
              <p className="text-sm text-muted-foreground">{t.orClickToSelect}</p>
              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  addFiles(e.target.files);
                  if (inputRef.current) inputRef.current.value = '';
                }}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm">{t.qualityPreset}</Label>
                <Select value={quality} onValueChange={(v) => setQuality(v as VideoQualityPreset)}>
                  <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t.qualityLow}</SelectItem>
                    <SelectItem value="medium">{t.qualityMedium}</SelectItem>
                    <SelectItem value="high">{t.qualityHigh}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm">{t.bitrate}: {bitrateMbps.toFixed(1)} Mbps</Label>
                <Slider
                  className="mt-3"
                  min={0.2}
                  max={8}
                  step={0.1}
                  value={[bitrateMbps]}
                  onValueChange={(v) => setBitrateMbps(v[0])}
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch checked={muteAudio} onCheckedChange={setMuteAudio} id="mute" />
                <Label htmlFor="mute" className="text-sm">{t.muteAudio}</Label>
              </div>
            </div>

            {items.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button onClick={startAll} disabled={isRunning || pendingCount === 0} className="gap-2">
                  <VideoIcon className="w-4 h-4" /> {t.startCompressing} ({pendingCount})
                </Button>
                <Button variant="outline" onClick={() => inputRef.current?.click()} className="gap-2">
                  <Plus className="w-4 h-4" /> {t.uploadVideo}
                </Button>
                {doneCount > 0 && (
                  <Button variant="secondary" onClick={downloadAll} className="gap-2">
                    <Download className="w-4 h-4" /> {t.download} ({doneCount})
                  </Button>
                )}
                <Button variant="outline" onClick={clearAll} disabled={isRunning}>
                  <Trash2 className="w-4 h-4 mr-1" /> {t.clearAll}
                </Button>
              </div>
            )}

            <div className="space-y-3">
              {items.map((it) => (
                <Card key={it.id} className="border-border/60">
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-[160px_1fr_auto] gap-4 items-center">
                      <video
                        src={it.result?.url || it.previewUrl}
                        className="w-full md:w-40 aspect-video rounded-md bg-black object-cover"
                        muted
                        playsInline
                      />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{it.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatSize(it.file.size)}
                          {it.result && (
                            <>
                              {' → '}
                              {formatSize(it.result.compressedSize)} ·{' '}
                              <span className="text-primary font-semibold">
                                {(it.result.compressionRatio * 100).toFixed(1)}% {t.saved}
                              </span>
                            </>
                          )}
                        </p>

                        {it.status === 'processing' && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{it.message || it.phase || t.compressing}</span>
                              <span>{Math.round(it.progress)}%</span>
                            </div>
                            <Progress value={it.progress} />
                          </div>
                        )}
                        {it.status === 'pending' && (
                          <p className="text-xs text-muted-foreground mt-2">{t.awaitingCompression}</p>
                        )}
                        {it.status === 'error' && (
                          <p className="text-xs text-destructive mt-2">{it.error}</p>
                        )}
                        {it.status === 'cancelled' && (
                          <p className="text-xs text-muted-foreground mt-2">{t.cancel}</p>
                        )}
                      </div>
                      <div className="flex gap-2 justify-end">
                        {it.status === 'processing' && (
                          <Button size="sm" variant="destructive" onClick={() => cancelItem(it.id)} className="gap-1">
                            <X className="w-3 h-3" /> {t.cancel}
                          </Button>
                        )}
                        {it.status === 'done' && (
                          <Button size="sm" onClick={() => downloadItem(it)} className="gap-1">
                            <Download className="w-3 h-3" /> {t.download}
                          </Button>
                        )}
                        {it.status !== 'processing' && (
                          <Button size="sm" variant="ghost" onClick={() => removeItem(it.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {isRunning && (
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                {t.processingLocally}
              </p>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default VideoCompressor;
