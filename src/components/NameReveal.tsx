interface NameRevealProps {
  className?: string;
  english?: string;
  chinese?: string;
}

export function NameReveal({
  className = "",
  english = "Sophia Lee",
  chinese = "李舒雅",
}: NameRevealProps) {
  return (
    <span className={`name-reveal ${className}`.trim()} title={chinese} tabIndex={0}>
      <span className="name-reveal__en">{english}</span>
      <span className="name-reveal__zh" aria-hidden="true">
        {chinese}
      </span>
    </span>
  );
}
