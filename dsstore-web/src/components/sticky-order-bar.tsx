import { Icon } from "@/components/icon";
import { useOrderContext } from "@/hooks/order-context";
import { idr } from "@/lib/format";

export function StickyOrderBar() {
  const order = useOrderContext();
  const total = order.totals.total;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl lg:hidden">
      <div className="shell flex items-center gap-3 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium text-ink-mute">
            {order.hasPkg ? (
              <>
                {order.totals.pkg.label} &middot; {order.totals.qty}{" "}
                {order.totals.pkg.perStar ? "bintang" : "match"}
              </>
            ) : (
              "Pilih paket dulu"
            )}
          </p>
          <p className="num truncate text-base font-bold text-ink">
            {order.hasPkg ? idr.format(total) : "—"}
          </p>
        </div>
        <a
          href={order.checkoutHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-lemon flex-none"
          onClick={(event) => {
            const bad = order.validateAll();
            if (bad !== null) {
              event.preventDefault();
              order.scrollToStep(bad);
              order.focusFirstError();
            }
          }}
        >
          <Icon name="send" className="h-4 w-4" />
          Pesan Sekarang
        </a>
      </div>
    </div>
  );
}
