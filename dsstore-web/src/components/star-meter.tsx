import { cn } from "@/lib/utils";

export function StarMeter({
  qty,
  total,
  bonusKey,
  className,
}: {
  qty: number;
  total: number;
  bonusKey: number;
  className?: string;
}) {
  const shown = Math.min(24, Math.max(total, 10));
  const pips: React.ReactNode[] = [];

  for (let i = 0; i < shown; i += 1) {
    if (i < qty) {
      pips.push(
        <span key={`on-${i}`} className="meter__pip meter__pip--on">
          ★
        </span>,
      );
    } else if (i < total) {
      pips.push(
        <span
          key={`bonus-${bonusKey}-${i}`}
          className="meter__pip meter__pip--bonus"
          style={{ animationDelay: `${(i - qty) * 60}ms` }}
        >
          ★
        </span>,
      );
    } else {
      pips.push(
        <span key={`off-${i}`} className="meter__pip">
          ★
        </span>,
      );
    }
  }

  if (total > shown) {
    pips.push(
      <span key="more" className="meter__more">
        +{total - shown}
      </span>,
    );
  }

  return (
    <div className={cn("meter", className)} aria-hidden="true">
      {pips}
    </div>
  );
}
