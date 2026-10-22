export function SectionHeading({
  title,
  desc,
  id,
}: {
  title: string;
  desc?: string;
  id?: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] md:items-end">
      <h2 id={id} className="sec-title">
        {title}
      </h2>
      {desc ? (
        <p className="measure-sm text-base leading-relaxed text-ink-soft">{desc}</p>
      ) : null}
    </div>
  );
}
