import { BannerCarousel } from "@/components/banner-carousel";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/assets";
import { HERO_CHIPS, WA_LINK } from "@/lib/data";

export function Hero() {
  return (
    <section id="beranda" className="scroll-mt-24">
      <div className="relative bg-deep pb-14 sm:pb-16">
        <div className="shell pt-4 sm:pt-6">
          <BannerCarousel />
        </div>
      </div>

      <div
        className="relative -mt-12 sm:-mt-14"
        style={{
          backgroundImage:
            "linear-gradient(115deg,#1c2135 0%,#14172a 42%,#0a0c17 100%)",
        }}
      >
        <div className="shell py-7 sm:py-9">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-deep/70 sm:h-16 sm:w-16">
                <img
                  src={images.dsLogo}
                  width={64}
                  height={64}
                  alt="Logo DS Store"
                  className="h-full w-full object-cover"
                />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lemon">
                  Promo Season 42 · Closing 15 Desember 2026
                </p>
                <h1 className="mt-2 text-[clamp(1.7rem,4.4vw,2.9rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-paper">
                  Joki Rank Mobile Legends
                </h1>
                <p className="measure mt-2.5 text-sm leading-relaxed text-paper/70">
                  Rank{" "}
                  <span className="font-semibold text-paper">Mobile Legends</span> kamu
                  naikin tanpa ribet. Admin masuk, kamu pantau progresnya, akun kembali
                  utuh. Mulai{" "}
                  <span className="font-semibold text-lemon">Rp 5.000</span> per bintang.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild size="lg" className="w-full xl:w-auto">
                <a href="#pesan">
                  Isi formulir pemesanan
                  <Icon name="arrowRight" className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-white/25 bg-transparent text-paper hover:bg-white/10 hover:text-paper xl:w-auto"
              >
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  Tanya admin dulu
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5">
            {HERO_CHIPS.map((chip) => (
              <span
                key={chip.text}
                className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-paper/85"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-lemon text-[#15130b]">
                  <Icon name={chip.icon} className="h-4 w-4" strokeWidth={2.2} />
                </span>
                {chip.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
