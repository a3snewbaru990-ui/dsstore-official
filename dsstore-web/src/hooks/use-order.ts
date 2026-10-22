import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BONUS_STARS,
  BONUS_THRESHOLD,
  IG_HANDLE,
  PACKAGES,
  VOUCHERS,
  WA_NUMBER,
  type Pkg,
} from "@/lib/data";
import { idr, plain } from "@/lib/format";

export type FieldKey =
  | "userId"
  | "zoneId"
  | "loginVia"
  | "emailHp"
  | "password"
  | "nickname"
  | "catatan"
  | "waPembeli";

export type Values = Record<FieldKey, string> & { agree: boolean };

export type ErrorKey = FieldKey | "rank" | "payment" | "stars" | "voucher" | "agree";

export type Errors = Partial<Record<ErrorKey, string>>;

export type Totals = {
  pkg: Pkg;
  qty: number;
  unit: number;
  subtotal: number;
  bonusStars: number;
  totalStars: number;
  discount: number;
  voucherLabel: string;
  total: number;
};

export const TOTAL_STEPS = 6;

/**
 * Which error keys belong to which step. Used to clear a step's stale errors
 * before applying a fresh validation pass.
 */
const STEP_ERROR_KEYS: Record<number, ErrorKey[]> = {
  1: ["userId", "zoneId", "loginVia", "emailHp", "password"],
  2: ["rank"],
  3: ["stars"],
  4: ["voucher"],
  5: ["payment"],
  6: ["waPembeli", "agree"],
};

const EMPTY_VALUES: Values = {
  userId: "",
  zoneId: "",
  loginVia: "",
  emailHp: "",
  password: "",
  nickname: "",
  catatan: "",
  waPembeli: "",
  agree: false,
};

/** Placeholder so consumers always get a Pkg object before the user chooses. */
const NO_PKG: Pkg = {
  id: "",
  label: "Belum dipilih",
  short: "—",
  tier: "",
  unit: 0,
  perStar: true,
  note: "",
};

export function useOrder() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Values>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [pkgId, setPkgId] = useState("");
  const [stars, setStarsState] = useState(10);
  const [voucher, setVoucher] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [bonusKey, setBonusKey] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const bonusWasOn = useRef(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const pkg = useMemo(
    () => PACKAGES.find((p) => p.id === pkgId) ?? NO_PKG,
    [pkgId],
  );
  const hasPkg = pkgId !== "";

  const setValue = useCallback((key: keyof Values, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }) as Values);
    setErrors((prev) => {
      if (!prev[key as ErrorKey]) return prev;
      const next = { ...prev };
      delete next[key as ErrorKey];
      return next;
    });
  }, []);

  const clearError = useCallback((key: ErrorKey) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  /* ------------------------------------------------------------------ */
  /* Perhitungan                                                        */
  /* ------------------------------------------------------------------ */
  const totals: Totals = useMemo(() => {
    const qty = !hasPkg ? 0 : pkg.perStar ? stars : (pkg.stars ?? 0);
    const subtotal = !hasPkg ? 0 : pkg.perStar ? pkg.unit * qty : pkg.unit;
    const bonusStars =
      hasPkg && pkg.perStar && stars >= BONUS_THRESHOLD ? BONUS_STARS : 0;

    let discount = 0;
    let voucherLabel = "";
    if (hasPkg && voucher && VOUCHERS[voucher]) {
      discount = Math.round(subtotal * (VOUCHERS[voucher].percent / 100));
      voucherLabel = VOUCHERS[voucher].code;
    }

    return {
      pkg,
      qty,
      unit: pkg.unit,
      subtotal,
      bonusStars,
      totalStars: qty + bonusStars,
      discount,
      voucherLabel,
      total: subtotal - discount,
    };
  }, [pkg, hasPkg, stars, voucher]);

  useEffect(() => {
    const on = totals.bonusStars > 0;
    if (on && !bonusWasOn.current) setBonusKey((k) => k + 1);
    bonusWasOn.current = on;
  }, [totals.bonusStars]);

  /* ------------------------------------------------------------------ */
  /* Pesan WhatsApp                                                      */
  /* ------------------------------------------------------------------ */
  const message = useMemo(() => {
    const lines: string[] = [];
    lines.push("*DS STORE - PROMO JOKI AKUN SEASON 42*");
    lines.push("Halo Admin DS STORE, saya ingin memesan joki rank:");
    lines.push("");
    lines.push("*DATA AKUN*");
    lines.push(`User ID    : ${values.userId || "-"}`);
    lines.push(`Zone ID    : ${values.zoneId || "-"}`);
    lines.push(`Login via  : ${values.loginVia || "-"}`);
    lines.push(`Email / HP : ${values.emailHp || "-"}`);
    lines.push(`Password   : ${values.password || "-"}`);
    lines.push(`Nickname   : ${values.nickname || "-"}`);
    lines.push(`Catatan    : ${values.catatan || "-"}`);
    lines.push("");
    lines.push("*PAKET PESANAN*");
    lines.push(
      `Rank       : ${
        hasPkg
          ? `${pkg.label}${pkg.tier && pkg.tier !== pkg.label ? ` (${pkg.tier})` : ""}`
          : "-"
      }`,
    );
    lines.push(
      `Harga      : ${
        hasPkg
          ? `${idr.format(pkg.unit)}${pkg.perStar ? " / bintang" : " / paket"}`
          : "-"
      }`,
    );
    lines.push(
      `Jumlah     : ${
        hasPkg
          ? `${plain.format(totals.qty)}${pkg.perStar ? " bintang" : " match"}`
          : "-"
      }`,
    );
    if (totals.bonusStars > 0) {
      lines.push(
        `Bonus      : +${plain.format(totals.bonusStars)} bintang gratis (total ${plain.format(totals.totalStars)} bintang)`,
      );
    }
    lines.push(`Subtotal   : ${idr.format(totals.subtotal)}`);
    if (totals.discount > 0) {
      lines.push(`Diskon     : -${idr.format(totals.discount)} (kode ${totals.voucherLabel})`);
    }
    lines.push(`*TOTAL     : ${idr.format(totals.total)}*`);
    lines.push("");
    lines.push("*PEMBAYARAN*");
    lines.push(`Metode     : ${payment || "-"}`);
    lines.push("");
    lines.push("*KONTAK PEMBELI*");
    lines.push(`WhatsApp   : ${values.waPembeli || "-"}`);
    lines.push(`Instagram  : ${IG_HANDLE}`);
    lines.push("");
    lines.push("Mohon dikonfirmasi. Terima kasih!");
    return lines.join("\n");
  }, [values, pkg, hasPkg, totals, payment]);

  const checkoutHref = useMemo(
    () => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,
    [message],
  );

  /* ------------------------------------------------------------------ */
  /* Validasi                                                            */
  /* ------------------------------------------------------------------ */
  const validateStep = useCallback(
    (target: number): boolean => {
      const next: Errors = {};

      if (target === 1) {
        const uid = values.userId.trim();
        if (!uid) next.userId = "User ID wajib diisi.";
        else if (!/^\d{4,20}$/.test(uid))
          next.userId = "User ID hanya boleh angka, minimal 4 digit.";

        const zid = values.zoneId.trim();
        if (!zid) next.zoneId = "Zone ID wajib diisi.";
        else if (!/^\d{1,6}$/.test(zid)) next.zoneId = "Zone ID hanya boleh angka.";

        if (!values.loginVia) next.loginVia = "Pilih salah satu cara login.";
        if (!values.emailHp.trim()) next.emailHp = "Email atau nomor HP akun wajib diisi.";
        if (!values.password)
          next.password = "Password akun wajib diisi supaya admin bisa memproses pesanan.";
      }

      if (target === 2) {
        if (!pkgId) next.rank = "Pilih rank target terlebih dahulu.";
      }

      if (target === 3) {
        if (hasPkg && pkg.perStar) {
          if (!Number.isFinite(stars) || stars < 1)
            next.stars = "Jumlah bintang minimal 1.";
          else if (stars > 100) next.stars = "Jumlah bintang maksimal 100 per pesanan.";
        }
      }

      if (target === 5) {
        if (!payment) next.payment = "Pilih salah satu metode pembayaran.";
      }

      if (target === 6) {
        const wa = values.waPembeli.replace(/[\s-]/g, "");
        if (!wa) next.waPembeli = "Nomor WhatsApp pembeli wajib diisi.";
        else if (!/^(\+62|62|0)\d{8,14}$/.test(wa))
          next.waPembeli = "Format nomor belum tepat. Gunakan 08xx atau +62xx.";
        if (!values.agree)
          next.agree = "Centang pernyataan ini sebelum mengirim pesanan.";
      }

      // Clear this step's stale errors, then apply the fresh results. The old
      // version merged `next` into `prev` and immediately deleted those same
      // keys, so navigation was blocked without ever explaining why.
      setErrors((prev) => {
        const merged = { ...prev };
        (STEP_ERROR_KEYS[target] ?? []).forEach((k) => delete merged[k]);
        return { ...merged, ...next };
      });

      return Object.keys(next).length === 0;
    },
    [values, pkgId, pkg, hasPkg, stars, payment],
  );

  const validateAll = useCallback((): number | null => {
    for (let s = 1; s <= TOTAL_STEPS; s += 1) {
      if (!validateStep(s)) return s;
    }
    return null;
  }, [validateStep]);

  const focusFirstError = useCallback(() => {
    const root = formRef.current ?? document.getElementById("order-form");
    if (!root) return;
    const bad = root.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (!bad) return;
    const focusable = bad.matches("input,select,textarea,button,a[href]")
      ? bad
      : bad.querySelector<HTMLElement>(
          "input:not([disabled]),select:not([disabled]),textarea,button,a[href]",
        );
    if (!focusable) return;
    focusable.focus({ preventScroll: true });
    focusable.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  /* ------------------------------------------------------------------ */
  /* Navigasi bagian                                                     */
  /* ------------------------------------------------------------------ */
  const syncUrl = useCallback((target: number) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("step", String(target));
      window.history.replaceState(null, "", url.toString());
    } catch {
      /* abaikan bila URL tidak bisa diubah */
    }
  }, []);

  const scrollToStep = useCallback(
    (target: number, opts?: { focus?: boolean }) => {
      const next = Math.min(TOTAL_STEPS, Math.max(1, target));
      setStep(next);
      syncUrl(next);

      const node = document.querySelector<HTMLElement>(`[data-section="${next}"]`);
      if (node) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const top = node.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      }
      if (opts?.focus) {
        window.requestAnimationFrame(() => {
          const heading = document.querySelector<HTMLElement>(
            `[data-section="${next}"] h3`,
          );
          if (!heading) return;
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
        });
      }
    },
    [syncUrl],
  );

  const setActiveStep = useCallback((target: number) => {
    setStep(Math.min(TOTAL_STEPS, Math.max(1, target)));
  }, []);

  const setStars = useCallback(
    (next: number | string) => {
      if (!pkg.perStar) return;
      let value = parseInt(String(next), 10);
      if (!Number.isFinite(value)) value = 1;
      value = Math.min(100, Math.max(1, value));
      setStarsState(value);
      clearError("stars");
    },
    [pkg.perStar, clearError],
  );

  const selectPackage = useCallback(
    (id: string) => {
      const found = PACKAGES.find((p) => p.id === id);
      if (!found) return;
      setPkgId(id);
      if (!found.perStar) setStarsState(found.stars ?? 0);
      clearError("rank");
    },
    [clearError],
  );

  const applyVoucherCode = useCallback(
    (raw: string): { ok: boolean; message: string } => {
      const code = raw.trim().toUpperCase();
      if (!code) {
        setVoucher(null);
        return { ok: false, message: "Ketik kode voucher terlebih dahulu, contoh DSSTORE." };
      }
      if (VOUCHERS[code]) {
        setVoucher(code);
        clearError("voucher");
        return {
          ok: true,
          message: `Kode ${code} terpasang, potongan 10% sudah dipotong.`,
        };
      }
      setVoucher(null);
      return {
        ok: false,
        message: `Kode "${code}" belum dikenali. Tanyakan ke admin untuk kode terbaru.`,
      };
    },
    [clearError],
  );

  const setPaymentMethod = useCallback(
    (p: string) => {
      setPayment(p);
      clearError("payment");
    },
    [clearError],
  );

  /* ------------------------------------------------------------------ */
  /* Pengumuman untuk pembaca layar                                      */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    setAnnouncement(
      hasPkg
        ? `Total ${plain.format(totals.totalStars)} bintang. Total bayar ${idr.format(totals.total)}.`
        : "Belum ada paket dipilih.",
    );
  }, [hasPkg, totals.totalStars, totals.total]);

  /* ------------------------------------------------------------------ */
  /* Bagian awal dari query string                                        */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    try {
      const params = new URL(window.location.href).searchParams;
      const s = parseInt(params.get("step") ?? "", 10);
      if (Number.isFinite(s) && s >= 1 && s <= TOTAL_STEPS) setStep(s);
    } catch {
      /* abaikan */
    }
  }, []);

  return {
    step,
    values,
    errors,
    pkg,
    pkgId,
    hasPkg,
    stars,
    voucher,
    payment,
    totals,
    message,
    checkoutHref,
    bonusKey,
    announcement,
    setValue,
    clearError,
    setStars,
    selectPackage,
    setPayment: setPaymentMethod,
    applyVoucherCode,
    scrollToStep,
    setActiveStep,
    validateStep,
    validateAll,
    focusFirstError,
    formRef,
  };
}
