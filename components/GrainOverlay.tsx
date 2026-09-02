/**
 * Fixed, pointer-events-none grain plate. Kept off every scrolling container so
 * it never enters the compositing path of an animated element.
 */
export default function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}
