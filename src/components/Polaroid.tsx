import type { CSSProperties } from "react";
import { publicPath } from "../lib/publicPath";

/** A photo in a tilted polaroid frame; `tilt` is the rotation in degrees. */
export function Polaroid({
  src,
  alt,
  caption,
  tilt = -3,
  position,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  tilt?: number;
  /** CSS object-position for the crop, e.g. "top". */
  position?: string;
  className?: string;
}) {
  return (
    <figure className={`polaroid ${className}`.trim()} style={{ "--tilt": `${tilt}deg` } as CSSProperties} data-reveal>
      <img src={publicPath(src)} alt={alt} loading="lazy" style={position ? { objectPosition: position } : undefined} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
