import { DiscProperties } from "../types/haxball-api";

export function discsDistance(p1: DiscProperties, p2: DiscProperties) {
  const d1 = p1.x - p2.x;
  const d2 = p1.y - p2.y;
  return Math.sqrt(d1 * d1 + d2 * d2);
}
