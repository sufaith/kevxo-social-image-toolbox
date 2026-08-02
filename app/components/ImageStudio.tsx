"use client";

import { ChangeEvent, DragEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getPresetById, platforms, type ImagePreset } from "../data/presets";

type FitMode = "cover" | "contain";
type ExportFormat = "image/png" | "image/jpeg" | "image/webp";

function renderImage(
  image: HTMLImageElement,
  preset: Pick<ImagePreset, "width" | "height">,
  options: { fit: FitMode; zoom: number; x: number; y: number; rotation: number; flip: boolean; background: string },
  canvas?: HTMLCanvasElement,
) {
  const output = canvas || document.createElement("canvas");
  output.width = preset.width;
  output.height = preset.height;
  const context = output.getContext("2d", { alpha: false });
  if (!context) return output;

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.fillStyle = options.background;
  context.fillRect(0, 0, output.width, output.height);

  const swapped = options.rotation % 180 !== 0;
  const naturalWidth = swapped ? image.naturalHeight : image.naturalWidth;
  const naturalHeight = swapped ? image.naturalWidth : image.naturalHeight;
  const baseScale = options.fit === "cover"
    ? Math.max(output.width / naturalWidth, output.height / naturalHeight)
    : Math.min(output.width / naturalWidth, output.height / naturalHeight);
  const scale = baseScale * options.zoom;
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;

  context.save();
  context.translate(
    output.width / 2 + (options.x / 100) * output.width * 0.42,
    output.height / 2 + (options.y / 100) * output.height * 0.42,
  );
  context.rotate((options.rotation * Math.PI) / 180);
  context.scale(options.flip ? -1 : 1, 1);
  context.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  context.restore();
  return output;
}

function canvasBlob(canvas: HTMLCanvasElement, format: ExportFormat, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Unable to create image")), format, quality);
  });
}

function filenameFor(name: string, width: number, height: number, format: ExportFormat) {
  const extension = format.split("/")[1].replace("jpeg", "jpg");
  return `kevxo-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${width}x${height}.${extension}`;
}

export function ImageStudio({ initialPlatform }: { initialPlatform?: string }) {
  const preferredPlatform = platforms.find((item) => item.id === initialPlatform) || platforms[0];
  const firstPreset = preferredPlatform.presets[0];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageName, setImageName] = useState("");
  const [imageMeta, setImageMeta] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [platformId, setPlatformId] = useState(preferredPlatform.id);
  const [activePresetId, setActivePresetId] = useState(firstPreset.id);
  const [selectedIds, setSelectedIds] = useState<string[]>([firstPreset.id]);
  const [fit, setFit] = useState<FitMode>("cover");
  const [zoom, setZoom] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState(false);
  const [background, setBackground] = useState("#f2f0ff");
  const [format, setFormat] = useState<ExportFormat>("image/png");
  const [quality, setQuality] = useState(0.92);
  const [safeZone, setSafeZone] = useState(true);
  const [customWidth, setCustomWidth] = useState(1200);
  const [customHeight, setCustomHeight] = useState(630);
  const [batchState, setBatchState] = useState("");

  const selectedPlatform = platforms.find((item) => item.id === platformId) || platforms[0];
  const customPreset: ImagePreset = useMemo(() => ({ id: "custom", name: "Custom size", width: customWidth, height: customHeight, note: "Your custom canvas" }), [customWidth, customHeight]);
  const activePreset = getPresetById(activePresetId) || customPreset;

  const editorOptions = useMemo(() => ({
    fit,
    zoom,
    x: positionX,
    y: positionY,
    rotation,
    flip,
    background,
  }), [fit, zoom, positionX, positionY, rotation, flip, background]);

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    renderImage(image, activePreset, editorOptions, canvasRef.current);
  }, [image, activePreset, editorOptions]);

  useEffect(() => () => {
    if (image?.src.startsWith("blob:")) URL.revokeObjectURL(image.src);
  }, [image]);

  const loadFile = useCallback((file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setBatchState("Please choose a PNG, JPEG, WebP, GIF, BMP or AVIF image.");
      return;
    }
    if (file.size > 40 * 1024 * 1024) {
      setBatchState("Please choose an image smaller than 40 MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    const nextImage = new Image();
    nextImage.onload = () => {
      setImage((current) => {
        if (current?.src.startsWith("blob:")) URL.revokeObjectURL(current.src);
        return nextImage;
      });
      setImageName(file.name.replace(/\.[^.]+$/, ""));
      setImageMeta(`${nextImage.naturalWidth} × ${nextImage.naturalHeight} · ${(file.size / 1024 / 1024).toFixed(1)} MB`);
      setZoom(1);
      setPositionX(0);
      setPositionY(0);
      setRotation(0);
      setBatchState("");
    };
    nextImage.onerror = () => {
      URL.revokeObjectURL(url);
      setBatchState("That image could not be opened. Try exporting it as PNG or JPEG.");
    };
    nextImage.src = url;
  }, []);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => loadFile(event.target.files?.[0]);
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    loadFile(event.dataTransfer.files?.[0]);
  };

  const choosePreset = (id: string) => {
    setActivePresetId(id);
    setZoom(1);
    setPositionX(0);
    setPositionY(0);
    if (id !== "custom" && !selectedIds.includes(id)) setSelectedIds((current) => [...current, id]);
  };

  const togglePreset = (id: string) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const downloadCurrent = async () => {
    if (!image || !canvasRef.current) return;
    const blob = await canvasBlob(canvasRef.current, format, quality);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filenameFor(activePreset.name, activePreset.width, activePreset.height, format);
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  };

  const downloadBatch = async () => {
    if (!image || selectedIds.length === 0) return;
    setBatchState(`Preparing ${selectedIds.length} sizes…`);
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const id of selectedIds) {
      const preset = getPresetById(id);
      if (!preset) continue;
      const canvas = renderImage(image, preset, editorOptions);
      const blob = await canvasBlob(canvas, format, quality);
      zip.file(filenameFor(preset.name, preset.width, preset.height, format), blob);
    }
    const archive = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(archive);
    link.download = `kevxo-social-images-${imageName || "export"}.zip`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    setBatchState(`${selectedIds.length} optimized sizes downloaded.`);
  };

  const resetTransform = () => {
    setZoom(1);
    setPositionX(0);
    setPositionY(0);
    setRotation(0);
    setFlip(false);
  };

  return (
    <section className="studio-section" id="studio" aria-labelledby="studio-title">
      <div className="shell">
        <div className="section-heading studio-heading">
          <div><span className="eyebrow">PRIVATE BROWSER TOOL</span><h2 id="studio-title">One image. Every social size.</h2></div>
          <p>Crop once, fine-tune the focus, then export one format or a ready-to-publish ZIP.</p>
        </div>

        <div className="workflow-steps" aria-label="Four-step workflow">
          <span className={image ? "done" : "active"}><b>1</b> Upload</span>
          <i />
          <span className={image ? "active" : ""}><b>2</b> Select sizes</span>
          <i />
          <span><b>3</b> Adjust crop</span>
          <i />
          <span><b>4</b> Export</span>
        </div>

        <div className="studio-grid">
          <aside className="preset-panel">
            <div className="panel-title-row">
              <div><span className="panel-kicker">STEP 1 + 2</span><h3>Image & sizes</h3></div>
              {image && <button className="text-button" type="button" onClick={() => fileInputRef.current?.click()}>Replace</button>}
            </div>

            <div
              className={`drop-zone ${isDragging ? "is-dragging" : ""} ${image ? "has-image" : ""}`}
              onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") fileInputRef.current?.click(); }}
            >
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInput} hidden />
              <span className="upload-symbol">{image ? "✓" : "+"}</span>
              <div>{image ? <><strong>{imageName}</strong><small>{imageMeta}</small></> : <><strong>Drop an image here</strong><small>or click to browse · up to 40 MB</small></>}</div>
            </div>

            <div className="platform-tabs" aria-label="Platforms">
              {platforms.map((platform) => (
                <button
                  className={platformId === platform.id ? "active" : ""}
                  key={platform.id}
                  type="button"
                  onClick={() => { setPlatformId(platform.id); choosePreset(platform.presets[0].id); }}
                  title={platform.name}
                >
                  <span style={{ background: platform.color }}>{platform.mark}</span>{platform.name}
                </button>
              ))}
            </div>

            <div className="preset-list">
              <div className="preset-list-label"><strong>{selectedPlatform.name} sizes</strong><button type="button" onClick={() => setSelectedIds((current) => Array.from(new Set([...current, ...selectedPlatform.presets.map((item) => item.id)])))}>Select all</button></div>
              {selectedPlatform.presets.map((preset) => (
                <div className={`preset-row ${activePresetId === preset.id ? "active" : ""}`} key={preset.id}>
                  <input type="checkbox" checked={selectedIds.includes(preset.id)} onChange={() => togglePreset(preset.id)} aria-label={`Select ${preset.name}`} />
                  <button type="button" onClick={() => choosePreset(preset.id)}>
                    <span className="ratio-mini" style={{ aspectRatio: `${preset.width}/${preset.height}` }} />
                    <span><strong>{preset.name}</strong><small>{preset.width} × {preset.height} · {preset.note}</small></span>
                  </button>
                </div>
              ))}
            </div>

            <div className={`preset-row custom-row ${activePresetId === "custom" ? "active" : ""}`}>
              <button type="button" onClick={() => choosePreset("custom")}>
                <span className="ratio-mini custom">↔</span>
                <span><strong>Custom size</strong><small>Set exact pixel dimensions</small></span>
              </button>
              <div className="custom-inputs">
                <label>W<input type="number" min="32" max="8192" value={customWidth} onChange={(event) => setCustomWidth(Math.max(32, Number(event.target.value)))} /></label>
                <span>×</span>
                <label>H<input type="number" min="32" max="8192" value={customHeight} onChange={(event) => setCustomHeight(Math.max(32, Number(event.target.value)))} /></label>
              </div>
            </div>
          </aside>

          <div className="preview-panel">
            <div className="panel-title-row preview-title">
              <div><span className="panel-kicker">LIVE PREVIEW</span><h3>{activePreset.name}</h3></div>
              <span className="dimension-badge">{activePreset.width} × {activePreset.height}</span>
            </div>
            <div className="canvas-stage">
              {image ? (
                <div className="canvas-wrap" style={{ aspectRatio: `${activePreset.width}/${activePreset.height}` }}>
                  <canvas ref={canvasRef} aria-label={`${activePreset.name} preview`} />
                  {safeZone && activePreset.safeZone && (
                    <div className="safe-zone" style={{ left: `${activePreset.safeZone.x * 100}%`, top: `${activePreset.safeZone.y * 100}%`, width: `${activePreset.safeZone.width * 100}%`, height: `${activePreset.safeZone.height * 100}%` }}>
                      <span>{activePreset.safeZone.label}</span>
                    </div>
                  )}
                </div>
              ) : (
                <button className="empty-canvas" type="button" onClick={() => fileInputRef.current?.click()}>
                  <span className="empty-art"><i /><i /><i /></span>
                  <strong>Your preview starts here</strong>
                  <small>Upload a photo or design to see every crop live.</small>
                  <b>Choose an image</b>
                </button>
              )}
            </div>
            <div className="preview-meta"><span>{fit === "cover" ? "Fill canvas" : "Fit whole image"}</span><span>{Math.round(zoom * 100)}% zoom</span>{activePreset.safeZone && <label><input type="checkbox" checked={safeZone} onChange={(event) => setSafeZone(event.target.checked)} /> Safe zone</label>}</div>
          </div>

          <aside className="controls-panel">
            <div className="panel-title-row"><div><span className="panel-kicker">STEP 3 + 4</span><h3>Adjust & export</h3></div><button className="text-button" type="button" onClick={resetTransform}>Reset</button></div>
            <div className="control-group">
              <label className="control-label">Fit mode</label>
              <div className="segmented"><button type="button" className={fit === "cover" ? "active" : ""} onClick={() => setFit("cover")}>Fill crop</button><button type="button" className={fit === "contain" ? "active" : ""} onClick={() => setFit("contain")}>Fit image</button></div>
            </div>
            <div className="control-group">
              <label className="control-label" htmlFor="zoom">Zoom <span>{Math.round(zoom * 100)}%</span></label>
              <input id="zoom" type="range" min="1" max="3" step="0.01" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
            </div>
            <div className="control-group dual-range">
              <label className="control-label" htmlFor="position-x">Horizontal focus <span>{positionX}</span></label>
              <input id="position-x" type="range" min="-100" max="100" value={positionX} onChange={(event) => setPositionX(Number(event.target.value))} />
              <label className="control-label" htmlFor="position-y">Vertical focus <span>{positionY}</span></label>
              <input id="position-y" type="range" min="-100" max="100" value={positionY} onChange={(event) => setPositionY(Number(event.target.value))} />
            </div>
            <div className="control-group">
              <label className="control-label">Transform</label>
              <div className="transform-buttons"><button type="button" onClick={() => setRotation((rotation + 90) % 360)}>↻ <span>Rotate</span></button><button type="button" className={flip ? "active" : ""} onClick={() => setFlip(!flip)}>↔ <span>Flip</span></button></div>
            </div>
            <div className="control-group color-control">
              <label className="control-label" htmlFor="background">Canvas background</label>
              <label className="color-input"><input id="background" type="color" value={background} onChange={(event) => setBackground(event.target.value)} /><span>{background.toUpperCase()}</span></label>
            </div>
            <div className="control-group export-options">
              <label className="control-label" htmlFor="format">Export format</label>
              <select id="format" value={format} onChange={(event) => setFormat(event.target.value as ExportFormat)}>
                <option value="image/png">PNG — sharp graphics</option>
                <option value="image/jpeg">JPG — smaller photos</option>
                <option value="image/webp">WebP — modern web</option>
              </select>
              {format !== "image/png" && <><label className="control-label" htmlFor="quality">Quality <span>{Math.round(quality * 100)}%</span></label><input id="quality" type="range" min="0.55" max="1" step="0.01" value={quality} onChange={(event) => setQuality(Number(event.target.value))} /></>}
            </div>
            <button className="download-primary" type="button" disabled={!image} onClick={downloadCurrent}><span>↓</span> Download current size</button>
            <button className="download-batch" type="button" disabled={!image || selectedIds.length === 0} onClick={downloadBatch}>Download {selectedIds.length} selected as ZIP</button>
            <p className="batch-status" aria-live="polite">{batchState || "Processing happens locally. Nothing is uploaded."}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
