import { WA_LINK } from "@/lib/data";

export function FloatingWhatsapp() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat admin DS Store di WhatsApp"
      className="fixed bottom-[5.5rem] right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,.8)] transition-transform duration-150 hover:scale-105 lg:bottom-6 lg:right-6"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.45-.72-2.91-1.15-4.74-4.17-4.88-4.36-.14-.2-1.17-1.56-1.17-2.97s.74-2.1 1-2.4c.26-.29.57-.36.76-.36l.55.01c.18.01.42-.07.65.5.24.58.8 2.01.87 2.15.07.15.12.32.02.51-.09.2-.14.32-.28.49-.14.17-.3.38-.42.51-.14.14-.29.3-.12.58.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.28 2.3 1.42.29.14.45.12.62-.07.17-.2.72-.84.91-1.13.19-.29.38-.24.64-.14.26.09 1.66.78 1.94.93.29.14.48.22.55.34.07.12.07.68-.17 1.35Z" />
      </svg>
    </a>
  );
}
