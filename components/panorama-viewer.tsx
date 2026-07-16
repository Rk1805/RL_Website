"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Maximize, Minimize, Minus, Plus } from "lucide-react";

const MIN_FOV = 30;
const MAX_FOV = 95;

export function PanoramaViewer({ src, label }: { src: string; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{ zoom: (delta: number) => void } | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed || !host) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        host.clientWidth / Math.max(1, host.clientHeight),
        0.1,
        1100,
      );

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(host.clientWidth, host.clientHeight);
      host.appendChild(renderer.domElement);
      renderer.domElement.style.display = "block";
      renderer.domElement.style.cursor = "grab";

      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1); // render on the inside of the sphere

      const texture = await new Promise<InstanceType<
        typeof THREE.Texture
      > | null>((resolve) => {
        new THREE.TextureLoader().load(
          src,
          (tex) => resolve(tex),
          undefined,
          () => resolve(null),
        );
      });
      if (disposed) {
        texture?.dispose();
        renderer.dispose();
        return;
      }
      if (!texture) {
        setLoading(false);
        setFailed(true);
        renderer.dispose();
        return;
      }

      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({ map: texture });
      scene.add(new THREE.Mesh(geometry, material));
      setLoading(false);

      let lon = 0;
      let lat = 0;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let frame = 0;

      const render = () => {
        lat = Math.max(-85, Math.min(85, lat));
        const phi = THREE.MathUtils.degToRad(90 - lat);
        const theta = THREE.MathUtils.degToRad(lon);
        camera.lookAt(
          500 * Math.sin(phi) * Math.cos(theta),
          500 * Math.cos(phi),
          500 * Math.sin(phi) * Math.sin(theta),
        );
        renderer.render(scene, camera);
      };

      const animate = () => {
        frame = requestAnimationFrame(animate);
        if (!dragging) {
          lon += 0.02; // gentle auto-rotate, like the original viewer
          render();
        }
      };
      animate();

      const onPointerDown = (event: PointerEvent) => {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        renderer.domElement.style.cursor = "grabbing";
        renderer.domElement.setPointerCapture(event.pointerId);
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!dragging) return;
        lon -= (event.clientX - lastX) * 0.12;
        lat += (event.clientY - lastY) * 0.12;
        lastX = event.clientX;
        lastY = event.clientY;
        render();
      };
      const onPointerUp = () => {
        dragging = false;
        renderer.domElement.style.cursor = "grab";
      };
      const zoom = (delta: number) => {
        camera.fov = Math.max(MIN_FOV, Math.min(MAX_FOV, camera.fov + delta));
        camera.updateProjectionMatrix();
        render();
      };
      const onWheel = (event: WheelEvent) => {
        event.preventDefault();
        zoom(event.deltaY * 0.03);
      };

      apiRef.current = { zoom };

      const canvas = renderer.domElement;
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
      canvas.addEventListener("wheel", onWheel, { passive: false });

      const resizeObserver = new ResizeObserver(() => {
        const width = host.clientWidth;
        const height = host.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        render();
      });
      resizeObserver.observe(host);

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
        canvas.removeEventListener("wheel", onWheel);
        texture.dispose();
        material.dispose();
        geometry.dispose();
        renderer.dispose();
        canvas.remove();
        apiRef.current = null;
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [src]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen?.();
    }
  };

  if (failed) return null;

  return (
    <div
      ref={containerRef}
      className="relative h-[385px] overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-lg"
    >
      <div ref={canvasHostRef} className="h-full w-full" />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
          <div className="flex flex-col items-center gap-3 text-stone-400">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Loading 360° view
            </span>
          </div>
        </div>
      )}

      {!loading && (
        <>
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-stone-950/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            {label}
          </span>
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            <button
              onClick={() => apiRef.current?.zoom(-8)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-stone-700 shadow-md transition-colors hover:bg-white hover:text-amber-700"
              aria-label="Zoom in"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={() => apiRef.current?.zoom(8)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-stone-700 shadow-md transition-colors hover:bg-white hover:text-amber-700"
              aria-label="Zoom out"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-stone-700 shadow-md transition-colors hover:bg-white hover:text-amber-700"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </button>
          </div>
          <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-stone-950/50 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm">
            Drag to look around
          </span>
        </>
      )}
    </div>
  );
}
