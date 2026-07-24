"use client";

import { useEffect } from "react";

function isProtectedMedia(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  const el = target.closest("img, picture, video, canvas, svg");
  if (!el) return false;
  // Don't block icons inside buttons/controls (lucide SVGs etc.)
  if (el.closest("button, [role='button'], a[href^='tel:'], a[href^='mailto:']")) {
    if (el.tagName === "SVG" || el.closest("svg")) return false;
  }
  // Allow browser menu on linked media so "Open in new tab" works
  if (el.closest("a[href]")) return false;
  // Product / hero / catalog photos are usually <img> (incl. next/image)
  return el.tagName === "IMG" || el.tagName === "PICTURE" || el.tagName === "VIDEO" || el.tagName === "CANVAS";
}

/**
 * Soft deterrent against saving storefront media.
 * Cannot stop screenshots or DevTools downloads — only blocks casual
 * right-click / drag / iOS long-press save.
 */
export default function ProtectImages() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      if (isProtectedMedia(e.target)) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      if (isProtectedMedia(e.target)) e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("dragstart", onDragStart, true);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("dragstart", onDragStart, true);
    };
  }, []);

  return null;
}
