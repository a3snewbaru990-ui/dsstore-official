import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/icon";
import { OrderSummary } from "@/components/order-summary";
import { RankEmblem } from "@/components/rank-emblem";
import { SectionHeading } from "@/components/section-heading";
import { StarMeter } from "@/components/star-meter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TOTAL_STEPS, useOrderContext } from "@/hooks/order-context";
import {
  BONUS_STARS,
  BONUS_THRESHOLD,
  LOGIN_METHODS,
  PACKAGES,
  PAYMENT_METHODS,
  STEPS,
  VOUCHERS,
} from "@/lib/data";
import { idr, plain } from "@/lib/format";

/* ------------------------------------------------------------------ */
/* Panel bagian (ala Takapedia: kartu bernomor)                        */
/* ------------------------------------------------------------------ */
function Panel({
  n,
  title,
  desc,
  children,
}: {
  n: number;
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <section data-section={n} className="panel scroll-mt-28">
      <div className="panel-head">
        <span className="step-num">{n}</span>
        <div className="min-w-0">
          <h3 className="text-base font-bold uppercase tracking-wide text-ink">
            {title}
          </h3>
          <p className="text-xs leading-relaxed text-ink-mute">{desc}</p>
        </div>
      </div>
      <div className="panel-body">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Field + pesan error                                                  */
/* ------------------------------------------------------------------ */
function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint ? (
        <p className="field-hint" id={`hint-${id}`}>
          {hint}
        </p>
      ) : null}
      <p className="field-error" id={`err-${id}`} hidden={!error}>
        <Icon name="alert" className="h-4 w-4 flex-none" />
        <span>{error}</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function OrderSection() {
  const order = useOrderContext();
  const [showPassword, setShowPassword] = useState(false);
  const [voucherInput, setVoucherInput] = useState("");
  const [promoOpen, setPromoOpen] = useState(false);
  const ticking = useRef(false);

  /* Scroll spy: menandai bagian yang sedang terlihat */
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        ticking.current = false;
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>("[data-section]"),
        );
        if (!sections.length) return;
        const marker = window.scrollY + 190;
        let current = 1;
        for (const node of sections) {
          const top = node.getBoundingClientRect().top + window.scrollY;
          if (top <= marker) current = Number(node.dataset.section);
          else break;
        }
        order.setActiveStep(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [order]);

  const { values, errors, totals } = order;
  const t = totals;

  const applyVoucher = (code: string) => {
    const result = order.applyVoucherCode(code);
    if (result.ok) {
      setVoucherInput(code);
      setPromoOpen(false);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const goNext = () => {
    const current = order.step;
    if (!order.validateStep(current)) {
      order.focusFirstError();
      toast.error("Lengkapi dulu data yang masih kurang.");
      return;
    }
    if (current < TOTAL_STEPS) order.scrollToStep(current + 1);
  };

  const goPrev = () => {
    if (order.step > 1) order.scrollToStep(order.step - 1);
  };

  const sendOrder = (event: React.MouseEvent) => {
    const bad = order.validateAll();
    if (bad !== null) {
      event.preventDefault();
      order.scrollToStep(bad);
      order.focusFirstError();
      toast.error(`Lengkapi dulu data di bagian ${bad}.`);
      return;
    }
    toast.success("Membuka WhatsApp dengan ringkasan pesanan.");
  };

  return (
    <section id="pesan" className="scroll-mt-24 py-12 lg:py-16">
      <div className="shell">
        <SectionHeading
          title="Formulir pemesanan"
          desc="Enam bagian singkat. Harga dihitung otomatis, dan pesanannya dikirim ke WhatsApp admin dalam hitungan detik."
        />

        {/* Sub-navigasi bagian */}
        <nav
          className="sticky top-[3.75rem] z-30 -mx-4 mb-4 border-y border-border bg-background/92 px-4 py-2 backdrop-blur-xl sm:mx-0 sm:rounded-xl sm:border"
          aria-label="Bagian formulir"
        >
          <ol className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
            {STEPS.map((s) => {
              const active = order.step === s.n;
              return (
                <li key={s.n} className="flex-none">
                  <button
                    type="button"
                    onClick={() => order.scrollToStep(s.n)}
                    aria-current={active ? "true" : undefined}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                      active
                        ? "bg-lemon text-[#15130b]"
                        : "text-ink-mute hover:bg-slateink hover:text-ink"
                    }`}
                  >
                    <span
                      className={`num flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
                        active ? "bg-[#15130b]/15 text-[#15130b]" : "bg-muted text-ink-faint"
                      }`}
                    >
                      {s.n}
                    </span>
                    {s.short}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* ---------- FORMULIR ---------- */}
          <form ref={order.formRef} id="order-form" noValidate className="lg:col-span-2">
            <div className="space-y-4">
              {/* ============ 1. DATA AKUN ============ */}
              <Panel
                n={1}
                title="Masukkan Data Akun"
                desc="Pastikan data ini benar, karena admin memakainya untuk masuk ke akun kamu."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="userId"
                    label="User ID"
                    hint="Tanpa spasi, hanya angka."
                    error={errors.userId}
                  >
                    <Input
                      id="userId"
                      className="field"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="Contoh 123456789…"
                      aria-invalid={errors.userId ? "true" : undefined}
                      aria-describedby="hint-userId err-userId"
                      value={values.userId}
                      onChange={(e) => order.setValue("userId", e.target.value)}
                    />
                  </Field>

                  <Field id="zoneId" label="Zone ID" error={errors.zoneId}>
                    <Input
                      id="zoneId"
                      className="field"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="Contoh 1234…"
                      aria-invalid={errors.zoneId ? "true" : undefined}
                      aria-describedby="err-zoneId"
                      value={values.zoneId}
                      onChange={(e) => order.setValue("zoneId", e.target.value)}
                    />
                  </Field>

                  <Field id="loginVia" label="Login Via" error={errors.loginVia}>
                    <select
                      id="loginVia"
                      className="field"
                      aria-invalid={errors.loginVia ? "true" : undefined}
                      aria-describedby="err-loginVia"
                      value={values.loginVia}
                      onChange={(e) => order.setValue("loginVia", e.target.value)}
                    >
                      <option value="">Pilih Login Via…</option>
                      {LOGIN_METHODS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    id="emailHp"
                    label="Email / No. Hp / Moonton ID"
                    error={errors.emailHp}
                  >
                    <Input
                      id="emailHp"
                      className="field"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="Contoh 0812… atau email@…"
                      aria-invalid={errors.emailHp ? "true" : undefined}
                      aria-describedby="err-emailHp"
                      value={values.emailHp}
                      onChange={(e) => order.setValue("emailHp", e.target.value)}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field
                      id="password"
                      label="Password"
                      hint="Dipakai buat pengerjaan joki saja, nggak dibagikan ke pihak lain."
                      error={errors.password}
                    >
                      <div className="relative">
                        <Input
                          id="password"
                          className="field pr-24"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="Password akun kamu…"
                          aria-invalid={errors.password ? "true" : undefined}
                          aria-describedby="hint-password err-password"
                          value={values.password}
                          onChange={(e) => order.setValue("password", e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={
                            showPassword ? "Sembunyikan password akun" : "Lihat password akun"
                          }
                          className="absolute right-1 top-1/2 flex h-8 -translate-y-1/2 items-center rounded-md px-2.5 text-xs font-semibold text-ink-mute transition-colors hover:bg-muted hover:text-ink"
                        >
                          {showPassword ? "Sembunyikan" : "Lihat"}
                        </button>
                      </div>
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Field
                      id="nickname"
                      label="User ID & Nick Name"
                      hint="Nickname in-game buat admin biar bisa cek akun kamu."
                      error={errors.nickname}
                    >
                      <Input
                        id="nickname"
                        className="field"
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="Contoh PlayerOne…"
                        aria-invalid={errors.nickname ? "true" : undefined}
                        aria-describedby="hint-nickname err-nickname"
                        value={values.nickname}
                        onChange={(e) => order.setValue("nickname", e.target.value)}
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Field
                      id="catatan"
                      label="Catatan Untuk Penjoki (Request Worker Disini)"
                      hint="Contoh: pakai hero Granger, spell Flicker dan Execute…"
                      error={errors.catatan}
                    >
                      <Textarea
                        id="catatan"
                        className="field resize-y"
                        rows={3}
                        placeholder="Contoh: pakai hero Granger, spell Flicker dan Execute…"
                        aria-invalid={errors.catatan ? "true" : undefined}
                        aria-describedby="hint-catatan err-catatan"
                        value={values.catatan}
                        onChange={(e) => order.setValue("catatan", e.target.value)}
                      />
                    </Field>
                  </div>
                </div>
              </Panel>

              {/* ============ 2. PILIH NOMINAL ============ */}
              <Panel
                n={2}
                title="Pilih Nominal"
                desc="Tentukan rank target yang mau dikejar, dari GM sampai Mythic Glory."
              >
                <div
                  id="rank-group"
                  role="group"
                  aria-labelledby="rank-label"
                  aria-describedby="err-rank"
                  aria-invalid={errors.rank ? "true" : undefined}
                >
                  <p className="field-label" id="rank-label">
                    Rank target
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {PACKAGES.map((pkg) => (
                      <label
                        key={pkg.id}
                        className={`choice choice--rank${
                          order.pkgId === pkg.id ? " is-selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="rank"
                          value={pkg.id}
                          className="sr-only"
                          checked={order.pkgId === pkg.id}
                          onChange={() => order.selectPackage(pkg.id)}
                        />
                        <span className="choice__emblem" aria-hidden="true">
                          <RankEmblem
                            id={pkg.id}
                            className={
                              pkg.id === "grading"
                                ? "h-7 w-7 text-ink-soft"
                                : "h-8 w-auto"
                            }
                          />
                        </span>
                        <span className="choice__mark" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="choice__title block">{pkg.label}</span>
                          <span className="choice__meta block">
                            {pkg.id === "grading" ? "10 match, harga paket" : pkg.tier}
                          </span>
                        </span>
                        <span className="choice__price">
                          {idr.format(pkg.unit)}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="field-error" id="err-rank" hidden={!errors.rank}>
                    <Icon name="alert" className="h-4 w-4 flex-none" />
                    <span>{errors.rank}</span>
                  </p>
                </div>
              </Panel>

              {/* ============ 3. JUMLAH PEMBELIAN ============ */}
              <Panel
                n={3}
                title="Masukkan Jumlah Pembelian"
                desc="Atur berapa bintang yang mau dinaikkan. Bonusnya dihitung otomatis."
              >
                <label className="field-label" htmlFor="stars">
                  Jumlah bintang
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-11 w-11"
                    aria-label="Kurangi jumlah bintang satu"
                    disabled={!order.pkg.perStar}
                    onClick={() => order.setStars(order.stars - 1)}
                  >
                    <Icon name="minus" className="h-4 w-4" />
                  </Button>
                  <Input
                    id="stars"
                    className="field num !w-24 !text-center !text-lg !font-bold"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={100}
                    step={1}
                    disabled={!order.pkg.perStar}
                    value={order.stars}
                    aria-invalid={errors.stars ? "true" : undefined}
                    aria-describedby="hint-stars err-stars"
                    onChange={(e) => order.setStars(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-11 w-11"
                    aria-label="Tambah jumlah bintang satu"
                    disabled={!order.pkg.perStar}
                    onClick={() => order.setStars(order.stars + 1)}
                  >
                    <Icon name="plus" className="h-4 w-4" />
                  </Button>
                  <div className="flex flex-wrap gap-2">
                    {[5, 10, 20].map((n) => (
                      <button
                        key={n}
                        type="button"
                        disabled={!order.pkg.perStar}
                        onClick={() => order.setStars(n)}
                        className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-ink-faint hover:text-ink disabled:opacity-45"
                      >
                        {n} bintang
                      </button>
                    ))}
                  </div>
                </div>
                <p className="field-hint" id="hint-stars">
                  Minimal 1, maksimal 100 bintang per order.
                </p>
                <p className="field-error" id="err-stars" hidden={!errors.stars}>
                  <Icon name="alert" className="h-4 w-4 flex-none" />
                  <span>{errors.stars}</span>
                </p>

                <div className="mt-5 rounded-xl border border-border bg-card/70 p-4">
                  <p className="eyebrow">Bintang yang akan dikumpulkan</p>
                  <StarMeter
                    className="mt-2.5"
                    qty={t.qty}
                    total={t.totalStars}
                    bonusKey={order.bonusKey}
                  />
                  <p className="mt-2.5 text-xs leading-relaxed text-ink-mute">
                    {t.bonusStars > 0
                      ? `Bonus ${plain.format(t.bonusStars)} bintang gratis sudah nyala. Total ${plain.format(t.totalStars)} bintang.`
                      : `Order ${BONUS_THRESHOLD} bintang atau lebih, dapat bonus ${BONUS_STARS} bintang gratis.`}
                  </p>
                </div>

                {order.pkg.id === "grading" ? (
                  <p className="mt-4 rounded-lg border border-lemon/40 bg-lemon/10 px-4 py-3 text-sm leading-relaxed text-lemon">
                    Paket Full Grading sudah include 10 match, jadi jumlah bintang nggak
                    bisa diubah.
                  </p>
                ) : null}
              </Panel>

              {/* ============ 4. KODE PROMO ============ */}
              <Panel
                n={4}
                title="Kode Promo"
                desc="Cek promo yang sedang jalan, lalu pasang kode voucher kalau ada."
              >
                <div className="flex items-start gap-3.5 rounded-lg border border-lemon/40 bg-card p-4">
                  <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-md bg-lemon text-[#15130b]">
                    <Icon name="sparkles" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-ink">
                      Order {BONUS_THRESHOLD} bintang dapat bonus {BONUS_STARS} bintang
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-mute">
                      Bonusnya nyalain sendiri begitu total bintang minimal {BONUS_THRESHOLD}.
                      Nggak ada kode tambahan yang perlu dipakai.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="field-label" htmlFor="voucher">
                    Kode voucher promo
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="voucher"
                      className="field uppercase sm:flex-1"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="Masukkan kode, contoh DSSTORE…"
                      aria-invalid={errors.voucher ? "true" : undefined}
                      aria-describedby="hint-voucher err-voucher"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          applyVoucher(voucherInput);
                        }
                      }}
                    />
                    <Button type="button" onClick={() => applyVoucher(voucherInput)}>
                      Gunakan
                    </Button>
                  </div>
                  <p className="field-hint" id="hint-voucher">
                    Kode aktif:{" "}
                    <span className="font-semibold text-ink">DSSTORE</span> — potongan 10%
                    dari subtotal.
                  </p>
                  <p className="field-error" id="err-voucher" hidden={!errors.voucher}>
                    <Icon name="alert" className="h-4 w-4 flex-none" />
                    <span>{errors.voucher}</span>
                  </p>

                  {order.voucher ? (
                    <p className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
                      <Icon name="check" className="h-4 w-4 flex-none" />
                      <span>
                        Kode <strong>DSSTORE</strong> terpasang. Potongan 10% sudah dipotong
                        dari subtotal.
                      </span>
                    </p>
                  ) : null}

                  <div className="mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPromoOpen((v) => !v)}
                      aria-expanded={promoOpen}
                    >
                      Pakai Promo Yang Tersedia
                      <Icon
                        name="chevronDown"
                        className={`h-4 w-4 transition-transform duration-200 ${
                          promoOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                    {promoOpen ? (
                      <ul className="mt-3 grid gap-2">
                        {Object.values(VOUCHERS).map((v) => (
                          <li key={v.code}>
                            <button
                              type="button"
                              onClick={() => applyVoucher(v.code)}
                              className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:border-ink-faint"
                            >
                              <span className="min-w-0">
                                <span className="block text-sm font-bold uppercase tracking-wide text-ink">
                                  {v.code}
                                </span>
                                <span className="block text-xs text-ink-mute">
                                  Potongan {v.percent}% dari subtotal
                                </span>
                              </span>
                              <span className="chip chip-lemon flex-none">Pakai</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </Panel>

              {/* ============ 5. PEMBAYARAN ============ */}
              <Panel
                n={5}
                title="Pilih Pembayaran"
                desc="Pilih yang paling gampang buat kamu."
              >
                <div
                  id="payment-group"
                  role="group"
                  aria-labelledby="payment-label"
                  aria-describedby="err-payment"
                  aria-invalid={errors.payment ? "true" : undefined}
                >
                  <p className="field-label" id="payment-label">
                    Bayar lewat
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {PAYMENT_METHODS.map((m) => (
                      <label
                        key={m.value}
                        className={`choice${
                          order.payment === m.value ? " is-selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={m.value}
                          className="sr-only"
                          checked={order.payment === m.value}
                          onChange={() => order.setPayment(m.value)}
                        />
                        <span className="choice__mark" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="choice__title block">{m.label}</span>
                          <span className="choice__meta block">{m.meta}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="field-error" id="err-payment" hidden={!errors.payment}>
                    <Icon name="alert" className="h-4 w-4 flex-none" />
                    <span>{errors.payment}</span>
                  </p>
                </div>

                <p className="mt-6 rounded-lg border border-border bg-card/60 px-4 py-3 text-sm leading-relaxed text-ink-mute">
                  Nomor QRIS dan rekening dikirim admin lewat WhatsApp setelah pesanan kamu
                  dikonfirmasi.
                </p>
              </Panel>

              {/* ============ 6. DETAIL KONTAK ============ */}
              <Panel
                n={6}
                title="Detail Kontak"
                desc="Nomor ini dipakai admin untuk kirim update progres joki ke kamu."
              >
                <div className="grid gap-5">
                  <Field
                    id="waPembeli"
                    label="No. WhatsApp"
                    hint="Tulis tanpa angka 0 di depan. Contoh: 8960xxxx"
                    error={errors.waPembeli}
                  >
                    <Input
                      id="waPembeli"
                      className="field"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="Contoh 081234567890…"
                      aria-invalid={errors.waPembeli ? "true" : undefined}
                      aria-describedby="hint-waPembeli err-waPembeli"
                      value={values.waPembeli}
                      onChange={(e) => order.setValue("waPembeli", e.target.value)}
                    />
                  </Field>

                  <div className="rounded-xl border border-border bg-card/70 p-4">
                    <h4 className="text-sm font-bold text-ink">Pratinjau pesan WhatsApp</h4>
                    <p className="mt-1 text-xs leading-relaxed text-ink-mute">
                      Inilah yang bakal terkirim ke admin. Data akun ikut disertakan biar
                      langsung diproses.
                    </p>
                    <pre className="num mt-3 max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-border bg-background p-3 text-xs leading-relaxed text-ink-soft no-scrollbar">
                      {order.message}
                    </pre>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="agree"
                      name="agree"
                      className="mt-1 h-4 w-4 flex-none accent-[#fde126]"
                      aria-invalid={errors.agree ? "true" : undefined}
                      aria-describedby="err-agree"
                      checked={values.agree}
                      onChange={(e) => order.setValue("agree", e.target.checked)}
                    />
                    <label
                      htmlFor="agree"
                      className="cursor-pointer text-sm leading-relaxed text-ink-soft"
                    >
                      Data akun di atas sudah benar, dan saya setuju ketentuan DS STORE: akun
                      diproses sesuai instruksi lalu dikembalikan utuh.
                    </label>
                  </div>
                  <p className="field-error" id="err-agree" hidden={!errors.agree}>
                    <Icon name="alert" className="h-4 w-4 flex-none" />
                    <span>{errors.agree}</span>
                  </p>
                </div>
              </Panel>
            </div>

            {/* Navigasi formulir */}
            <div className="mt-4 flex flex-col-reverse gap-3 rounded-xl border border-border bg-card/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <Button
                type="button"
                variant="outline"
                onClick={goPrev}
                disabled={order.step <= 1}
                className="w-full sm:w-auto"
              >
                <Icon name="chevronLeft" className="h-4 w-4" />
                Kembali
              </Button>
              <div className="flex flex-col gap-3 sm:flex-row">
                {order.step < TOTAL_STEPS ? (
                  <Button type="button" onClick={goNext} className="w-full sm:w-auto">
                    Lanjut
                    <Icon name="chevronRight" className="h-4 w-4" />
                  </Button>
                ) : null}
                <Button asChild className="w-full sm:w-auto">
                  <a
                    href={order.checkoutHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={sendOrder}
                  >
                    <Icon name="send" className="h-4 w-4" />
                    Kirim pesanan
                  </a>
                </Button>
              </div>
            </div>
          </form>

          {/* ---------- SIDEBAR ---------- */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-[7.5rem]">
              <button
                type="button"
                className="mb-4 flex w-full items-center gap-4 rounded-xl border border-border bg-card/70 p-4 text-left shadow-card transition-transform duration-150 hover:-translate-y-0.5"
                onClick={() =>
                  window.open(
                    "https://wa.me/6281807283181",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-lemon text-[#15130b]">
                  <Icon name="headset" className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-base font-bold text-ink">
                    Butuh Bantuan?
                  </span>
                  <span className="block text-sm leading-relaxed text-ink-mute">
                    Kamu bisa hubungi admin disini.
                  </span>
                </span>
              </button>

              <OrderSummary />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
