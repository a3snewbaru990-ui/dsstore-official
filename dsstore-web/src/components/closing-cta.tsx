import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { WA_LINK } from "@/lib/data";

export function ClosingCta() {
  return (
    <section className="py-12 lg:py-16">
      <div className="shell">
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-10 text-center sm:px-10 sm:py-14"
          style={{
            backgroundImage:
              "linear-gradient(120deg,#1c2135 0%,#14172a 45%,#0a0c17 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full opacity-25 blur-3xl"
            style={{ backgroundColor: "#fde126" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: "#f5d020" }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lemon">
              Season 42 · Closing 15 Desember 2026
            </p>
            <h2 className="mt-3 text-[clamp(1.6rem,4vw,2.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-paper">
              Siap menaikkan rank kamu sekarang?
            </h2>
            <p className="measure mx-auto mt-3.5 text-base leading-relaxed text-paper/75">
              Isi formulirnya kurang dari dua menit, bayar lewat QRIS atau e-wallet, lalu
              pantau progresnya di WhatsApp. Akun kamu kembali utuh setelah rank
              tercapai.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="#pesan">
                  Isi formulir pemesanan
                  <Icon name="arrowRight" className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-white/25 bg-transparent text-paper hover:bg-white/10 hover:text-paper sm:w-auto"
              >
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  Tanyakan ke admin
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
