import { useState } from "react";
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
