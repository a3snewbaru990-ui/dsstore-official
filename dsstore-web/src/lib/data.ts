import { images } from "@/lib/assets";

export const WA_NUMBER = "6281807283181";
export const IG_HANDLE = "@dsstore_official";
export const IG_URL = "https://www.instagram.com/dsstore_officia?dlrf=MWZ1NGhsbzFreTR5cA==";
export const WA_LINK = `https://wa.me/${WA_NUMBER}`;
export const BONUS_THRESHOLD = 10;
export const BONUS_STARS = 2;

export type Pkg = {
  id: string;
  label: string;
  tier: string;
  unit: number;
  perStar: boolean;
  stars?: number;
  note: string;
  tag?: { text: string; tone: "lemon" | "gold" };
  /** short label used on compact cards */
  short?: string;
};

export const PACKAGES: Pkg[] = [
  {
    id: "gm",
    label: "GM",
    short: "GM",
    tier: "Grandmaster",
    unit: 5000,
    perStar: true,
    note: "Paling ramah di kantong. Cocok untuk menaikkan rank lebih dulu sebelum mencoba tier di atasnya.",
  },
  {
    id: "epic",
    label: "Epic",
    short: "Epic",
    tier: "Epic",
    unit: 6000,
    perStar: true,
    note: "Sudah bisa masuk ranah kompetitif. Cocok jika target kamu menembus Epic atau Legend.",
  },
  {
    id: "legend",
    label: "Legend",
    short: "Legend",
    tier: "Legend",
    unit: 7000,
    perStar: true,
    note: "Titik balik bagi pemain yang sering tertahan di Legend. Matchmaking-nya jauh lebih kompetitif.",
  },
  {
    id: "mythic",
    label: "Mythic",
    short: "Mythic",
    tier: "Mythic",
    unit: 12000,
    perStar: true,
    note: "Titik paling dicari dan paling cepat prosesnya. Pesan 10 bintang di sini dan dapatkan bonus 2 bintang gratis.",
    tag: { text: "Paling banyak dipilih", tone: "lemon" },
  },
  {
    id: "honor",
    label: "Mythic Honor",
    short: "Honor",
    tier: "Honor",
    unit: 15000,
    perStar: true,
    note: "Rank dijaga stabil, jadi hasil akhirnya lebih rapi dan tidak mudah turun lagi.",
  },
  {
    id: "glory",
    label: "Mythic Glory",
    short: "Glory",
    tier: "Glory",
    unit: 20000,
    perStar: true,
    note: "Penanganan khusus untuk rank tinggi. Tim admin memakai strategi khusus agar poin tidak terbuang.",
    tag: { text: "Puncak ladder", tone: "gold" },
  },
  {
    id: "grading",
    label: "Full Grading Mythic",
    short: "Grading",
    tier: "Full Grading",
    unit: 150000,
    perStar: false,
    stars: 10,
    note: "Sekali pesan, 10 match langsung dikerjakan sampai Mythic. Cocok untuk kamu yang malas grinding satu per satu.",
    tag: { text: "10 match penuh", tone: "gold" },
  },
];

export const VOUCHERS: Record<string, { code: string; percent: number }> = {
  DSSTORE: { code: "DSSTORE", percent: 10 },
};

export const PAYMENT_METHODS: { value: string; label: string; meta: string }[] = [
  { value: "QRIS", label: "QRIS", meta: "Semua e-wallet dan m-banking" },
  { value: "DANA", label: "DANA", meta: "Saldo atau transfer" },
  { value: "OVO", label: "OVO", meta: "Saldo atau transfer" },
  { value: "GoPay", label: "GoPay", meta: "Saldo atau transfer" },
  { value: "ShopeePay", label: "ShopeePay", meta: "Saldo atau SPay" },
  { value: "Transfer Bank BCA", label: "Bank BCA", meta: "Transfer manual" },
  { value: "Transfer Bank BRI", label: "Bank BRI", meta: "Transfer manual" },
  { value: "Transfer Bank Mandiri", label: "Bank Mandiri", meta: "Transfer manual" },
];

export const LOGIN_METHODS = ["Moonton", "VK", "Facebook", "TikTok"];

export const STEPS = [
  { n: 1, title: "Masukkan Data Akun", short: "Data akun" },
  { n: 2, title: "Pilih Nominal", short: "Nominal" },
  { n: 3, title: "Masukkan Jumlah Pembelian", short: "Jumlah" },
  { n: 4, title: "Kode Promo", short: "Promo" },
  { n: 5, title: "Pilih Pembayaran", short: "Bayar" },
  { n: 6, title: "Detail Kontak", short: "Kontak" },
];

export type Banner = {
  id: string;
  eyebrow: string;
  title: string;
  src: string;
  srcSet: string;
  alt: string;
};

export const BANNERS: Banner[] = [
  {
    id: "granger",
    eyebrow: "Promo Season 42",
    title: "Promo Joki Akun",
    src: images.bannerGranger,
    srcSet: `${images.bannerGrangerSm} 960w, ${images.bannerGranger} 1920w`,
    alt: "Poster Promo Joki Akun Season 42 dengan hero Granger M7",
  },
  {
    id: "sora",
    eyebrow: "Promo Season 42",
    title: "Promo Joki Gendong & Main Bareng",
    src: images.bannerSora,
    srcSet: `${images.bannerSoraSm} 960w, ${images.bannerSora} 1920w`,
    alt: "Poster promosi joki gendong dan main bareng pro player",
  },
];

export const HERO_CHIPS = [
  { icon: "zap", text: "Proses Cepat" },
  { icon: "chat", text: "Layanan Chat 24/7" },
  { icon: "shield", text: "Pembayaran Aman" },
];

export const TRUST_BADGES = [
  { icon: "zap", text: "Jaminan Layanan" },
  { icon: "clock", text: "Jaminan Layanan 24 Jam" },
  { icon: "shield", text: "Pembayaran Aman & Terpercaya" },
  { icon: "bolt", text: "Proses Cepat & Otomatis" },
];

export const GUARANTEES = [
  {
    icon: "zap",
    title: "Respons cepat",
    body: "Admin membalas di bawah 10 menit selama jam layanan 08.00 sampai 23.00 WIB. Di luar jam itu, pesanan tetap masuk dan diproses pagi berikutnya.",
  },
  {
    icon: "gauge",
    title: "Progres kilat",
    body: "Satu bintang selesai sekitar 30 sampai 60 menit. Admin kirim update rank minimal dua kali sehari sampai target tercapai.",
  },
  {
    icon: "shield",
    title: "Amanah, data kembali utuh",
    body: "Data akun hanya dipakai sesuai instruksi, lalu dikembalikan lengkap dengan pengaturan awal kamu. Password tidak dibagikan ke siapa pun.",
  },
  {
    icon: "tag",
    title: "Harga di depan, tanpa tipu-tipu",
    body: "Harga per bintang ditampilkan apa adanya di halaman ini. Tidak ada biaya tersembunyi yang muncul di akhir pesanan.",
  },
];

export const HOW_IT_WORKS = [
  {
    title: "Isi data akun",
    body: "User ID, Zone ID, cara login, email atau nomor HP, password, dan nickname in-game.",
  },
  {
    title: "Pilih rank & bintang",
    body: "Tentukan rank target dari GM sampai Mythic Glory, lalu atur berapa bintang yang ingin dinaikkan.",
  },
  {
    title: "Pasang promo",
    body: "Kode DSSTORE memotong 10% dari subtotal. Bonus bintang otomatis dihitung.",
  },
  {
    title: "Bayar",
    body: "QRIS, DANA, OVO, GoPay, ShopeePay, atau transfer ke BCA, BRI, dan Mandiri.",
  },
  {
    title: "Admin mulai joki",
    body: "Kamu menerima pembaruan progres, akun kembali utuh, dan pembayaran selesai. Semua lewat WhatsApp.",
  },
];

export const FAQS = [
  {
    q: "Berapa lama proses joki rank selesai?",
    a: "Satu bintang biasanya selesai 30 sampai 60 menit. Untuk paket Full Grading Mythic 10 match, prosesnya bisa memakan 1 sampai 2 hari tergantung antrean dan matchmaking. Admin memberikan estimasi terbaru begitu pesanan dikonfirmasi.",
  },
  {
    q: "Apakah data akun aman dan dikembalikan utuh?",
    a: "Ya. Data akun hanya dipakai untuk menjalankan proses joki sesuai instruksi, lalu dikembalikan lengkap dengan pengaturan awal kamu. Demi keamanan, password akun tidak pernah dibagikan ke pihak lain.",
  },
  {
    q: "Bagaimana cara memakai kode promo DSSTORE?",
    a: "Di bagian Kode Promo (langkah 4) formulir, ketik DSSTORE lalu klik “Gunakan”. Potongan 10% langsung dipotong dari subtotal dan ikut tercantum di ringkasan serta pesan WhatsApp yang dikirim ke admin.",
  },
  {
    q: "Apakah bonus 2 bintang berlaku otomatis?",
    a: "Ya, sepenuhnya otomatis. Begitu jumlah bintang yang dipesan mencapai 10 atau lebih, dua bintang bonus langsung muncul sendiri di meter bintang dan ikut masuk ke ringkasan pesanan. Kamu tidak perlu menekan tombol, memakai kode, atau mengajukan apa pun ke admin.",
  },
  {
    q: "Metode pembayaran apa saja yang diterima?",
    a: "QRIS, DANA, OVO, GoPay, ShopeePay, plus transfer manual ke BCA, BRI, dan Mandiri. Nomor QRIS dan rekening dikirim admin lewat WhatsApp setelah pesanan dikonfirmasi.",
  },
  {
    q: "Bisakah meminta hero atau spell tertentu?",
    a: "Bisa. Tulis permintaan hero dan konfigurasi spell di kolom Catatan pada langkah 1. Admin mengikuti instruksi semaksimal mungkin, tergantung ketersediaan draft dan situasi match.",
  },
];

export const SITE_LINKS = [
  { label: "Joki akun GM", href: "#paket" },
  { label: "Joki akun Epic", href: "#paket" },
  { label: "Joki akun Legend", href: "#paket" },
  { label: "Joki akun Mythic", href: "#paket" },
  { label: "Mythic Honor dan Glory", href: "#paket" },
  { label: "Full Grading Mythic", href: "#paket" },
];

export const NAV_LINKS = [
  { label: "Paket", href: "#paket" },
  { label: "Keunggulan", href: "#kenapa" },
  { label: "Cara Pesan", href: "#cara" },
  { label: "Formulir", href: "#pesan" },
  { label: "FAQ", href: "#faq" },
];
