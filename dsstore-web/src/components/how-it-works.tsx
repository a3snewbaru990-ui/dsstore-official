import { SectionHeading } from "@/components/section-heading";
import { HOW_IT_WORKS } from "@/lib/data";

export function HowItWorks() {
  return (
    <section id="cara" className="scroll-mt-24 py-12 lg:py-16">
      <div className="shell">
        <SectionHeading
          title="Cara pesan, lima langkah"
          desc="Dari mengisi formulir sampai rank naik, semua progresnya dikabarkan lewat WhatsApp."
        />

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HOW_IT_WORKS.map((item, index) => (
            <li
              key={item.title}
              className="relative flex flex-col rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <span className="num flex h-9 w-9 items-center justify-center rounded-lg bg-lemon text-sm font-bold text-[#15130b]">
                {index + 1}
              </span>
              <h3 className="mt-3.5 text-base font-bold uppercase tracking-wide text-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-mute">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
