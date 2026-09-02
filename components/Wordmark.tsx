import { brand } from "@/lib/site";

export default function Wordmark({
  className = "",
  withDescriptor = false,
}: {
  className?: string;
  withDescriptor?: boolean;
}) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="font-mark font-semibold tracking-[-0.03em]" translate="no">
        {brand.wordmark}
      </span>
      {withDescriptor ? (
        <span className="mt-[0.35em] text-[0.3em] font-medium uppercase tracking-[0.34em] text-muted">
          {brand.descriptor}
        </span>
      ) : null}
    </span>
  );
}
