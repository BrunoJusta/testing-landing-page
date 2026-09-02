/**
 * The brand mark from the deck: the grape cluster whose top berry becomes the
 * macron "o" of kōmvitis. The one hand-drawn vector on the page, because it is
 * the logo itself and not decoration.
 */
export default function GrapeMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 112"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g fill="rgb(var(--accent-wash))">
        <circle cx="23" cy="46" r="15.5" />
        <circle cx="77" cy="46" r="15.5" />
        <circle cx="36" cy="68" r="15.5" />
        <circle cx="64" cy="68" r="15.5" />
        <circle cx="50" cy="90" r="14" />
      </g>
      <rect x="33" y="5" width="34" height="7" rx="3.5" fill="currentColor" />
      <circle
        cx="50"
        cy="38"
        r="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="7.5"
      />
    </svg>
  );
}
