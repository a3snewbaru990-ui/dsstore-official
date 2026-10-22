# DS Store — Joki Rank Mobile Legends Season 42

Landing page resmi **DS Store**: promo joki rank Mobile Legends Season 42.
Halaman ini dibangun ulang dengan gaya (kartu rapat, chip navigasi,
CTA kuning kontras) lalu di-rethem ke warna logo DS Store — navy tua
`#0a0c17` + lemon `#fde126`.

## Isi repo

| Path | Keterangan |
| --- | --- |
| `index.html` | **Halaman yang dipublikasikan.** Satu file, CSS + JS sudah di-inline, gambar tetap file eksternal. |
| `assets/` | Gambar asli situs (banner, emblem rank, logo, favicon). Dipakai ulang apa adanya, tidak di-base64. |
| `dsstore-web/` | Source React + TypeScript + Vite + Tailwind + shadcn/ui. |
| `.agents/skills/web-artifacts-builder/` | Skill yang dipakai untuk membangun halaman. |

## Membangun ulang

```bash
cd dsstore-web
npm install
npm run typecheck     # tsc --noEmit
npm run bundle        # Parcel -> html-inline -> ../index.html
```

`npm run bundle` (= `node scripts/build-single.mjs`) menjalankan:

1. `parcel build` → `dsstore-web/dist/`
2. Stylesheet Google Fonts remote diubah jadi `@import` (html-inline tidak bisa
   mengambil CSS dari jaringan)
3. `html-inline --ignore-images --ignore-links` → CSS + JS di-inline ke satu file
4. Sanity check (CSS inlined, JS inlined, tanpa `<script src>`, aset teruji)

Hasilnya ditulis ke `../index.html` (~373 KB). Folder `dist/` dibersihkan
otomatis sebelum build karena Parcel melompati file yang dianggap sudah mutakhir.

Untuk dev server:

```bash
cd dsstore-web
npm run dev            # sync assets + vite
```

`npm run dev` menyalin `../assets` ke `dsstore-web/assets/` (di-git-ignore)
supaya Vite bisa menyajikan gambar di path relatif yang sama dengan produksi.

## Catatan teknis

- **Gambar eksternal, bukan import.** `src/lib/assets.ts` memakai string path
  relatif (`assets/...`), bukan `import` ES. Import gambar akan membuat Parcel
  menggantinya dengan objek kosong sehingga seluruh gambar rusak. Asli di
  `assets/` tidak pernah diubah.
- **Palet.** Body `#0a0c17`, kartu `#181c2a`, header panel `#15182b`, aksen
  lemon `#fde126`, teks `#f8f9fa`. Semua permukaan form dibuat opak
  (`bg-card`), tanpa warna transparan yang bikin tulisan tak terbaca.
- **State terpilih** memakai kelas `is-selected` dari state React, dengan
  `:has(input:checked)` sebagai fallback. Some engine tidak selalu
  meng-*invalidate* ulang `:has()` saat radio React berubah.
- **Fokus** memakai `:focus-within` (bukan `:focus`) agar ring lemon selalu
  terlihat.
- `package.json` punya alias `@radix-ui/primitive/is-development` karena
  Parcel tidak bisa resolve conditional export tersebut.

## Fungsi halaman

- Banner carousel (2 slide + srcset 960w/1920w, auto-play + dots + arrow).
- Form pemesanan 6 langkah: Data Akun → Pilih Nominal → Jumlah Pembelian →
  Kode Promo → Pilih Pembayaran → Detail Kontak.
- Kode promo `DSSTORE` = 10% off subtotal. Bonus +2 bintang otomatis untuk
  order ≥ 10 bintang (paket per bintang).
- Ringkasan order + sticky bar + tombol WhatsApp dengan pesan otomatis.
- WhatsApp: `6281807283181` · Instagram: `@dsstore_official`.
