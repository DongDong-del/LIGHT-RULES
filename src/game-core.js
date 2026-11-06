export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function distanceToSegment(point, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSquared = dx * dx + dy * dy;
  if (!lengthSquared) return Math.hypot(point.x - a.x, point.y - a.y);
  const t = clamp(((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSquared, 0, 1);
  return Math.hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy));
}

export function isReceiverLit(receiver, beams) {
  return beams.some((beam) =>
    beam.color === receiver.color &&
    distanceToSegment(receiver, beam.a, beam.b) <= receiver.radius + beam.width / 2
  );
}

export function gestureTransform(view, start, current) {
  const ratio = current.distance / Math.max(1, start.distance);
  const scale = clamp(view.scale * ratio, 0.65, 2.4);
  const factor = scale / view.scale;
  return {
    scale,
    x: current.midpoint.x - (start.midpoint.x - view.x) * factor,
    y: current.midpoint.y - (start.midpoint.y - view.y) * factor,
  };
}

export function isNewVersion(current, incoming) {
  return Boolean(current && incoming && current !== incoming);
}
