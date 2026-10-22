import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GUARANTEES } from "@/lib/data";

export function Guarantees() {
  return (
    <section id="kenapa" className="scroll-mt-24 py-12 lg:py-16">
      <div className="shell">
        <SectionHeading
          title="Kenapa harus lewat DS Store"
          desc="Empat hal yang kamipegang di setiap order, apa pun rank targetnya."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {GUARANTEES.map((g) => (
            <Card
              key={g.title}
              className="border-border/70 bg-card/60 shadow-card backdrop-blur-[2px]"
            >
              <CardHeader className="space-y-0 p-5">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-lemon text-[#15130b]">
                  <Icon name={g.icon} className="h-6 w-6" strokeWidth={2} />
                </span>
                <CardTitle className="text-lg font-bold uppercase tracking-wide text-ink">
                  {g.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-ink-mute">
                  {g.body}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
