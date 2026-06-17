import { useCallback, useRef } from "react";

export function useTilt(intensity = 10) {
  const ref = useRef<HTMLElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--tilt-x", `${-y * intensity}deg`);
      el.style.setProperty("--tilt-y", `${x * intensity}deg`);
      el.style.setProperty("--rx", `${(x + 0.5) * 100}%`);
      el.style.setProperty("--ry", `${(y + 0.5) * 100}%`);
    },
    [intensity]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }, []);

  return { ref, onMove, onLeave };
}
