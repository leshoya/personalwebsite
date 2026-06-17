interface KoiIllustrationProps {
  className?: string;
  variant?: "coral" | "cream";
  flip?: boolean;
}

export function KoiIllustration({
  className = "",
  variant = "coral",
  flip = false,
}: KoiIllustrationProps) {
  const body = "#fffbf7";
  const patch = variant === "coral" ? "#f4a896" : "#fbcab8";
  const fin = variant === "coral" ? "#e8927c" : "#fad4c8";
  const accent = variant === "coral" ? "#d47868" : "#e8a898";

  return (
    <svg
      viewBox="0 0 120 48"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <ellipse cx="58" cy="24" rx="34" ry="14" fill={body} opacity="0.96" />
      <ellipse cx="68" cy="22" rx="22" ry="11" fill={patch} opacity="0.9" />
      <ellipse cx="52" cy="26" rx="8" ry="4" fill={accent} opacity="0.35" />
      <path d="M24 24 Q8 20 4 24 Q8 28 24 24" fill={fin} opacity="0.8" />
      <path d="M18 24 Q4 14 2 24 Q4 34 18 24" fill={body} opacity="0.75" />
      <path d="M72 30 Q78 38 74 42 Q70 36 72 30" fill={fin} opacity="0.55" />
      <path d="M76 18 Q82 10 78 8 Q74 14 76 18" fill={fin} opacity="0.5" />
      <circle cx="88" cy="20" r="2.2" fill="#2a4050" opacity="0.55" />
      <circle cx="89" cy="19.2" r="0.6" fill="#fff" opacity="0.5" />
      <path d="M52 18 Q58 14 64 18" stroke={fin} strokeWidth="1.2" fill="none" opacity="0.55" />
      <path d="M40 24 Q46 22 52 24" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.3" />
    </svg>
  );
}
