"use client";

import { useEffect, useState } from "react";

/**
 * Возвращает true на десктопе (>= 1024px, брейкпоинт lg).
 *
 * Стартует с false (mobile-first), поэтому при серверном рендере и на
 * телефонах тяжёлые «десктопные» элементы (ховер-картинки, видео) не
 * монтируются вовсе. На ПК значение становится true после гидрации —
 * визуально десктоп не меняется, т.к. эти элементы либо невидимы до
 * ховера, либо просто появляются.
 */
export function useIsDesktop(query = "(min-width: 1024px)") {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return isDesktop;
}
