import { useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/icon";
import { RankEmblem } from "@/components/rank-emblem";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { useOrderContext } from "@/hooks/order-context";
import { PACKAGES } from "@/lib/data";
import { idr } from "@/lib/format";

export function PriceLadder() {
  const order = useOrderContext();
  const [picking, setPicking] = useState<string | null>(null);

  const pick = (id: string) => {
    const pkg = PACKAGES.find((p) => p.id === id);
    if (!pkg) return;
    setPicking(id);
    order.selectPackage(id);
    order.scrollToStep(2, { focus: true });
    toast.success(`Paket ${pkg.label} dipilih. Atur jumlah bingungnya.`);
  };

  return (
    <section id="paket" className="scroll-mt-24 py-12 lg:py-16">
      <div className="shell">
        <SectionHeading
          title="Harga per bintang, naik per jenjang"
          desc="Semakin tinggi rank, semakin mahal per bintangnya karena matchmaking-nya makin berat. Pilih paket dulu, atur jumlahnya di formulir."
        />

        <div className="panel mt-8 overflow-hidden">
          <div className="panel-head">
            <span className="step-num">2</span>
            <div className="min-w-0">
              <h3 className="text-base font-bold uppercase tracking-wide text-ink">
                Pilih Nominal
              </h3>
              <p className="text-xs leading-relaxed text-ink-mute">
                Harga per bintang, sesuai jenjang rank.
              </p>
            </div>
          </div>

          <ul>
            {PACKAGES.map((pkg) => {
              const active = order.pkgId === pkg.id;
              return (
                <li
                  key={pkg.id}
                  className={`grid gap-3 border-t border-border px-4 py-4 transition-colors duration-150 sm:px-5 md:grid-cols-[3.25rem_minmax(0,1fr)_auto_9.5rem] md:items-center md:gap-5 ${
                    active ? "bg-slateink" : ""
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center">
                    <RankEmblem
                      id={pkg.id}
                      className={
                        pkg.id === "grading"
                          ? "h-9 w-9 text-ink-soft"
                          : "h-10 w-auto"
                      }
                    />
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-ink">{pkg.label}</h4>
                      <span className="text-xs font-medium text-ink-faint">{pkg.tier}</span>
                      {pkg.tag ? (
                        <span
                          className={`chip ${
                            pkg.tag.tone === "lemon" ? "chip-lemon" : "chip-gold"
                          }`}
                        >
                          {pkg.tag.text}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-mute">
                      {pkg.note}
                    </p>
                  </div>

                  <p className="flex items-baseline gap-1 md:flex-col md:items-end md:gap-0">
                    <span className="num text-lg font-bold text-ink">
                      {idr.format(pkg.unit)}
                    </span>
                    <span className="text-xs text-ink-faint">
                      {pkg.perStar ? "per bintang" : "per paket"}
                    </span>
                  </p>

                  <div className="md:justify-self-end">
                    <Button
                      type="button"
                      size="sm"
                      variant={active ? "default" : "outline"}
                      onClick={() => pick(pkg.id)}
                      disabled={picking === pkg.id}
                      className="w-full md:w-auto"
                    >
                      {active ? (
                        <>
                          <Icon name="check" className="h-4 w-4" />
                          Dipilih
                        </>
                      ) : (
                        "Pilih"
                      )}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
