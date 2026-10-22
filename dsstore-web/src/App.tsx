import { useEffect, useState } from "react";
import { OrderProvider } from "@/hooks/order-context";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { PriceLadder } from "@/components/price-ladder";
import { OrderSection } from "@/components/order-section";
import { Guarantees } from "@/components/guarantees";
import { HowItWorks } from "@/components/how-it-works";
import { Description } from "@/components/description";
import { Faq } from "@/components/faq";
import { ClosingCta } from "@/components/closing-cta";
import { SiteFooter } from "@/components/site-footer";
import { StickyOrderBar } from "@/components/sticky-order-bar";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const [tab, setTab] = useState<"transaksi" | "keterangan">("transaksi");

  /*
   * Di layar kecil, bagian "keterangan" disembunyikan saat tab "transaksi"
   * aktif. Tanpa ini, tautan navbar ke #kenapa, #cara, #deskripsi, dan #faq
   * tidak menggeser halaman karena targetnya masih display:none.
   */
  useEffect(() => {
    const SECTION_TAB: Record<string, "transaksi" | "keterangan"> = {
      paket: "transaksi",
      pesan: "transaksi",
      kenapa: "keterangan",
      cara: "keterangan",
      deskripsi: "keterangan",
      faq: "keterangan",
    };

    const scrollToId = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target
        ? target.closest<HTMLAnchorElement>("a[href^='#']")
        : null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id || id === "main") return;
      const nextTab = SECTION_TAB[id];
      if (!nextTab) return;

      event.preventDefault();
      setTab(nextTab);
      try {
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.replaceState(null, "", url.toString());
      } catch {
        /* abaikan bila URL tidak bisa diubah */
      }
      // Menu seluler (Radix Sheet) mengunci scroll body selama animasi tutup,
      // jadi beri waktu sebelum menggulir. Selain itu cukup tunggu render tab.
      if (document.querySelector('[role="dialog"]')) {
        window.setTimeout(() => scrollToId(id), 380);
      } else {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => scrollToId(id));
        });
      }
    };

    document.addEventListener("click", onClick);

    const initial = window.location.hash.slice(1);
    if (initial && SECTION_TAB[initial]) setTab(SECTION_TAB[initial]);

    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <OrderProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-lg focus:bg-lemon focus:px-4 focus:py-2 focus:font-semibold focus:text-[#15130b]"
      >
        Lewati ke konten utama
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <TrustStrip />

        {/* Pemisah Transaksi / Keterangan ala Takapedia (hanya di layar kecil) */}
        <div className="shell pt-2 lg:hidden">
          <div
            className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1"
            role="tablist"
            aria-label="Pilih bagian halaman"
          >
            {(
              [
                { id: "transaksi", label: "Transaksi" },
                { id: "keterangan", label: "Keterangan" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => setTab(item.id)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
                  tab === item.id
                    ? "bg-card text-ink shadow-soft"
                    : "text-ink-mute hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className={tab === "transaksi" ? "block" : "hidden lg:block"}>
          <PriceLadder />
          <OrderSection />
        </div>

        <div className={tab === "keterangan" ? "block" : "hidden lg:block"}>
          <Guarantees />
          <HowItWorks />
          <Description />
          <Faq />
        </div>

        <ClosingCta />
      </main>

      <SiteFooter />
      <StickyOrderBar />
      <FloatingWhatsapp />

      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast: "!rounded-xl !border-border !bg-card !text-ink !shadow-card",
            description: "!text-ink-mute",
          },
        }}
      />
    </OrderProvider>
  );
}
