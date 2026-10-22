import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/icon";
import { StarMeter } from "@/components/star-meter";
import { Button } from "@/components/ui/button";
import { useOrderContext } from "@/hooks/order-context";
import { BONUS_THRESHOLD, IG_HANDLE, WA_LINK } from "@/lib/data";
import { idr, plain } from "@/lib/format";

export function OrderSummary({ className }: { className?: string }) {
  const order = useOrderContext();
  const t = order.totals;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(order.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
      toast.success("Ringkasan pesanan tersalin.");
    } catch {
      toast.error("Gagal menyalin. Select teks pratinjaunya lalu salin manual.");
    }
  };

  const starsNote =
    t.bonusStars > 0
      ? `${plain.format(t.qty)} bintang + bonus ${plain.format(t.bonusStars)} = ${plain.format(t.totalStars)} bintang`
      : `${plain.format(t.qty)} bintang. Bonus 2 bintang gratis mulai order ${BONUS_THRESHOLD} bintang.`;

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-card/70 p-5 shadow-soft">
        <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
          Ringkasan pesanan
        </h3>

        <div className="mt-4 space-y-2.5">
          <p className="ticket__row">
            <span className="ticket__key">Paket</span>
            <span className="ticket__val">{t.pkg.label}</span>
          </p>
          <p className="ticket__row">
            <span className="ticket__key">Harga satuan</span>
            <span className="ticket__val">{idr.format(t.unit)}</span>
          </p>
          <p className="ticket__row">
            <span className="ticket__key">Jumlah</span>
            <span className="ticket__val">
              {t.pkg.perStar
                ? `${plain.format(t.qty)} bintang`
                : `${t.qty} match`}
            </span>
          </p>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <p className="eyebrow">Bintang</p>
          <StarMeter
            className="mt-2"
            qty={t.qty}
            total={t.totalStars}
            bonusKey={order.bonusKey}
          />
          <p className="mt-2 text-xs leading-relaxed text-ink-mute">{starsNote}</p>
        </div>

        <div className="mt-4 space-y-2.5 border-t border-border pt-4">
          <p className="ticket__row">
            <span className="ticket__key">Subtotal</span>
            <span className="ticket__val">{idr.format(t.subtotal)}</span>
          </p>
          {t.discount > 0 ? (
            <p className="ticket__row">
              <span className="ticket__key text-lemon">Diskon</span>
              <span className="ticket__val text-lemon">
                -{idr.format(t.discount)} ({t.voucherLabel})
              </span>
            </p>
          ) : null}
        </div>

        <div className="ticket__dash mt-4 pt-4">
          <div className="flex items-end justify-between gap-3">
            <span className="text-sm font-semibold text-ink-soft">Total bayar</span>
            <span className="num text-2xl font-bold text-ink">{idr.format(t.total)}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink-faint">
            {t.bonusStars > 0
              ? `Harga ini sudah termasuk bonus ${plain.format(t.bonusStars)} bintang gratis.`
              : "Belum termasuk biaya admin, dan biaya admin gratis."}
          </p>
        </div>

        <div className="mt-5 space-y-2.5">
          <Button asChild className="w-full">
            <a
              href={order.checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                const bad = order.validateAll();
                if (bad !== null) {
                  event.preventDefault();
                  order.scrollToStep(bad);
                  order.focusFirstError();
                  toast.error(`Lengkapi dulu data di bagian ${bad}.`);
                }
              }}
            >
              <Icon name="send" className="h-4 w-4" />
              Pesan Sekarang!
            </a>
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={copy}>
            <Icon name={copied ? "check" : "copy"} className="h-4 w-4" />
            {copied ? "Tersalin" : "Salin ringkasan"}
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card/60 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-ink">
          Masih ragu?
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-ink-mute">
          Chat admin di WhatsApp{" "}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="num font-semibold text-ink underline underline-offset-2"
          >
            081807283181
          </a>{" "}
          atau DM Instagram{" "}
          <a
            href="https://www.instagram.com/dsstore_officia?dlrf=MWZ1NGhsbzFreTR5cA=="
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink underline underline-offset-2"
          >
            {IG_HANDLE}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
