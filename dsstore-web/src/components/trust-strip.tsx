import { Icon } from "@/components/icon";
import { TRUST_BADGES } from "@/lib/data";

export function TrustStrip() {
  return (
    <div className="shell py-7 sm:py-9">
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {TRUST_BADGES.map((badge) => (
          <li key={badge.text} className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-lemon text-[#15130b]">
              <Icon name={badge.icon} className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="text-xs font-semibold text-ink">{badge.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
