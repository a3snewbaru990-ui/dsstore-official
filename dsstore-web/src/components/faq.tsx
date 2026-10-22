import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/section-heading";
import { FAQS } from "@/lib/data";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-12 lg:py-16">
      <div className="shell">
        <SectionHeading
          title="Pertanyaan yang sering ditanya"
          desc="Kalau masih ada yang mengganjal, langsung chat admin ya."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`} className="px-4 sm:px-5">
                <AccordionTrigger className="text-base font-semibold text-ink hover:text-ink-soft">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-ink-mute">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="rounded-xl border border-border bg-card/60 p-5 shadow-card">
            <p className="text-base font-bold uppercase tracking-wide text-ink">
              Ada pertanyaan lain?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-mute">
              Admin-fast response Jam 08.00 sampai 23.00 WIB. Di luar jam itu, chat tetap
              masuk dan dibalas pagi berikutnya.
            </p>
            <a
              href="#pesan"
              className="btn btn-lemon mt-4 w-full"
            >
              Isi formulir pemesanan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
