import { images } from "@/lib/assets";

export function RankEmblem({
  id,
  className = "h-9 w-auto",
}: {
  id: string;
  className?: string;
}) {
  if (id === "grading") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        <path d="M12 3l7 3v5.2c0 4.4-3 8.2-7 9.8-4-1.6-7-5.4-7-9.8V6l7-3z" />
        <path d="M12 8.6l1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6-3 1.6.6-3.4-2.5-2.4 3.4-.5L12 8.6z" />
      </svg>
    );
  }

  const src = images.rank[id as keyof typeof images.rank];
  if (!src) return null;

  return (
    <img
      src={src}
      width={111}
      height={128}
      alt=""
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
