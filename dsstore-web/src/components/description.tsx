import { Icon } from "@/components/icon";
import { images } from "@/lib/assets";

export function Description() {
  return (
    <section id="deskripsi" className="scroll-mt-24 py-12 lg:py-16">
      <div className="shell">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
          <div className="flex items-center overflow-hidden rounded-t-xl bg-card">
            <img
              src={images.heroArt}
              width={739}
              height={415}
              alt="Joki rank Mobile Legends oleh DS Store"
              loading="lazy"
              decoding="async"
              className="h-24 w-full object-cover sm:h-32"
            />
          </div>

          <div className="p-5 sm:p-7">
            <p className="eyebrow">Deskripsi</p>
            <h2 className="mt-2 text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold uppercase leading-tight tracking-tight text-ink">
              Joki Rank Mobile Legends Season 42
            </h2>

            <div className="measure mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                <strong className="font-semibold text-ink">DS STORE</strong> adalah jasa
                joki rank <strong className="font-semibold text-ink">Mobile Legends</strong>{" "}
                yang fokus menaikkan rank akun kamu dari GM, Epic, Legend, Mythic, Honor,
                sampai Glory. Kamu cukup mengisi data akun, menentukan jumlah bintang, lalu
                admin kami yang menjalankan prosesnya sampai target tercapai.
              </p>
              <p>
                Harga dihitung per bintang dan ditampilkan terbuka di halaman ini, jadi kamu
                bisa menghitung sendiri lebih dulu sebelum memesan. Yang kamu bayar hanya biaya joki per
                bintang, tanpa biaya admin tersembunyi.
              </p>
              <p>
                Semua proses berjalan di akun kamu sendiri, tanpa cheat, tanpa exploit, dan
                tanpa program ilegal. Admin hanya menjalankan match reguler supaya rank kamu
                naik secara organik dan tetap aman.
              </p>
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Rank naik sesuai target, progres dilaporkan berkala",
                "Akun dikembalikan utuh dengan pengaturan awal",
                "Pembayaran lewat QRIS, DANA, OVO, GoPay, atau transfer bank",
                "Bonus 2 bintang otomatis untuk pesanan 10 bintang ke atas",
              ].map((text) => (
                <li
                  key={text}
                  className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed text-ink-soft"
                >
                  <Icon
                    name="check"
                    className="mt-0.5 h-4 w-4 flex-none text-ink-faint"
                    strokeWidth={2.4}
                  />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
