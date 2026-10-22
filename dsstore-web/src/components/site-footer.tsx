import { Icon } from "@/components/icon";
import { images } from "@/lib/assets";
import { IG_HANDLE, SITE_LINKS, WA_LINK } from "@/lib/data";

const SERVICE_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Pilih paket", href: "#paket" },
  { label: "Formulir pemesanan", href: "#pesan" },
  { label: "Keunggulan", href: "#kenapa" },
  { label: "Cara pesan", href: "#cara" },
  { label: "Deskripsi", href: "#deskripsi" },
  { label: "Pertanyaan", href: "#faq" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-6 overflow-hidden bg-deep text-paper">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "url('" + images.heroArt + "')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="shell grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-deep/70">
                <img
                  src={images.dsLogo}
                  width={44}
                  height={44}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </span>
              <span>
                <span className="block text-lg font-bold uppercase leading-tight tracking-wide">
                  DS Store
                </span>
                <span className="block text-xs font-medium text-paper/60">
                  Joki Rank Mobile Legends
                </span>
              </span>
            </div>

            <p className="measure-sm mt-4 text-sm leading-relaxed text-paper/70">
              DS Store adalah jasa joki rank Mobile Legends Season 42. Rank naik sesuai
              target, akun dikembalikan utuh, pembayaran aman lewat QRIS atau e-wallet.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="chip chip-dark hover:border-lemon/60 hover:text-lemon"
              >
                <Icon name="whatsapp" className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/dsstore_officia?dlrf=MWZ1NGhsbzFreTR5cA=="
                target="_blank"
                rel="noopener noreferrer"
                className="chip chip-dark hover:border-lemon/60 hover:text-lemon"
              >
                <Icon name="instagram" className="h-3.5 w-3.5" />
                {IG_HANDLE}
              </a>
            </div>
          </div>

          {/* Peta situs */}
          <nav aria-label="Peta situs">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-lemon">
              Peta Situs
            </h2>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-paper/70 transition-colors hover:text-lemon"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Paket */}
          <nav aria-label="Paket joki rank">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-lemon">
              Paket Rank
            </h2>
            <ul className="mt-4 space-y-2.5">
              {SITE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-paper/70 transition-colors hover:text-lemon"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-lemon">
              Hubungi Kami
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-paper/70">
              <li className="flex items-start gap-2.5">
                <Icon name="chat" className="mt-0.5 h-4 w-4 flex-none text-lemon" />
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="num hover:text-lemon">
                  0818-0728-3181
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="clock" className="mt-0.5 h-4 w-4 flex-none text-lemon" />
                <span>
                  Jam layanan 08.00 &ndash; 23.00 WIB
                  <span className="block text-xs text-paper/50">
                    Pesanan di luar jam itu diproses pagi berikutnya.
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="instagram" className="mt-0.5 h-4 w-4 flex-none text-lemon" />
                <a
                  href="https://www.instagram.com/dsstore_officia?dlrf=MWZ1NGhsbzFreTR5cA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lemon"
                >
                  {IG_HANDLE}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="shield" className="mt-0.5 h-4 w-4 flex-none text-lemon" />
                <span>
                  Pembayaran aman
                  <span className="block text-xs text-paper/50">
                    QRIS, DANA, OVO, GoPay, ShopeePay, dan transfer bank.
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-paper/60">
              &copy; {year} DS Store. Semua hak cipta dilindungi.
            </p>
            <p className="text-xs text-paper/60">
              Joki rank Mobile Legends Season 42 &middot; Promo closing 15 Desember 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
