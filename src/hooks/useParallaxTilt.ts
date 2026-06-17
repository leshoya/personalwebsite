import { useCallback, useRef } from "react";

export function useParallaxTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--px", `${x * intensity}px`);
      el.style.setProperty("--py", `${y * intensity}px`);
      el.style.setProperty("--pr", `${x * 4}deg`);
    },
    [intensity]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
    el.style.setProperty("--pr", "0deg");
  }, []);

  return { ref, onMove, onLeave };
}
