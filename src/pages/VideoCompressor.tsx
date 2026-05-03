import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Upload, Video as VideoIcon, Download, X, Loader2, ShieldCheck } from 'lucide-react';
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

const VideoCompressor: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<VideoQualityPreset>('medium');
  const [muteAudio, setMuteAudio] = useState(false);
  const [bitrateMbps, setBitrateMbps] = useState<number>(1.5);
  const [progress, setProgress] = useState<VideoCompressionProgress | null>(null);
  const [result, setResult] = useState<VideoCompressionResult | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const engine = useMemo(() => new ProductionVideoCompressionEngine(), []);

  const handleSelect = useCallback((f: File | null) => {
    if (!f) return;
    try {
      ProductionVideoCompressionEngine.validate(f);
    } catch (e: any) {
      toast({ title: t.error, description: e.message, variant: 'destructive' });
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setResult(null);
    setProgress(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }, [preview, result, t, toast]);

  const start = async () => {
    if (!file || isCompressing) return;
    setIsCompressing(true);
    setResult(null);
    abortRef.current = new AbortController();
    try {
      const res = await engine.compress(
        file,
        {
          quality,
          videoBitrate: Math.round(bitrateMbps * 1_000_000),
          muteAudio,
          signal: abortRef.current.signal,
        },
        (p) => setProgress(p),
      );
      setResult(res);
      toast({
        title: t.compressed,
        description: `${formatSize(res.originalSize)} → ${formatSize(res.compressedSize)} (${(res.compressionRatio * 100).toFixed(1)}% ${t.saved})`,
      });
    } catch (e: any) {
      toast({ title: t.error, description: e.message || 'Failed', variant: 'destructive' });
    } finally {
      setIsCompressing(false);
    }
  };

  const cancel = () => {
    abortRef.current?.abort();
    setIsCompressing(false);
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setPreview(null);
    setResult(null);
    setProgress(null);
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    const ext = result.mimeType.includes('mp4') ? 'mp4' : 'webm';
    const base = file?.name.replace(/\.[^.]+$/, '') || 'video';
    a.download = `${base}-compressed.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

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
            {!file && (
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleSelect(e.dataTransfer.files?.[0] ?? null);
                }}
                className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/60 transition"
              >
                <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium">{t.dragDropVideo}</p>
                <p className="text-sm text-muted-foreground">{t.orClickToSelect}</p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleSelect(e.target.files?.[0] ?? null)}
                />
              </div>
            )}

            {file && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t.originalSize}</p>
                    {preview && (
                      <video src={preview} controls className="w-full rounded-lg bg-black" />
                    )}
                    <p className="text-sm mt-2 truncate">{file.name} — {formatSize(file.size)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t.compressedSize}</p>
                    {result ? (
                      <>
                        <video src={result.url} controls className="w-full rounded-lg bg-black" />
                        <p className="text-sm mt-2">
                          {formatSize(result.compressedSize)} · {result.width}×{result.height} ·{' '}
                          <span className="text-primary font-semibold">
                            {(result.compressionRatio * 100).toFixed(1)}% {t.saved}
                          </span>
                        </p>
                      </>
                    ) : (
                      <div className="w-full aspect-video rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
                        {isCompressing ? `${progress?.phase ?? ''} ${Math.round(progress?.progress ?? 0)}%` : t.awaitingCompression}
                      </div>
                    )}
                  </div>
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

                {(isCompressing || progress) && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{progress?.message || t.compressing}</span>
                      <span>{Math.round(progress?.progress ?? 0)}%</span>
                    </div>
                    <Progress value={progress?.progress ?? 0} />
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {!isCompressing && !result && (
                    <Button onClick={start} className="gap-2">
                      <VideoIcon className="w-4 h-4" /> {t.startCompressing}
                    </Button>
                  )}
                  {isCompressing && (
                    <Button variant="destructive" onClick={cancel} className="gap-2">
                      <X className="w-4 h-4" /> {t.cancel}
                    </Button>
                  )}
                  {result && (
                    <Button onClick={download} className="gap-2">
                      <Download className="w-4 h-4" /> {t.download}
                    </Button>
                  )}
                  <Button variant="outline" onClick={reset} disabled={isCompressing}>
                    {t.clearAll}
                  </Button>
                </div>

                {isCompressing && (
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    {t.processingLocally}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default VideoCompressor;
