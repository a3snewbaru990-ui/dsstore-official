import { useCallback, useEffect, useRef, useState } from "react";
import { BANNERS } from "@/lib/data";

const DELAY = 4200;

export function BannerCarousel() {
  const slides = BANNERS;
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState(1);

  const timer = useRef<number | null>(null);
  const resetTimer = useRef<number | null>(null);
  const hovering = useRef(false);
  const focused = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const show = useCallback(
    (target: number, direction: number) => {
      const next = ((target % slides.length) + slides.length) % slides.length;
      setIndex((current) => {
        if (next === current) return current;
        setPrev(current);
        setDir(direction);
        if (resetTimer.current) window.clearTimeout(resetTimer.current);
        resetTimer.current = window.setTimeout(() => setPrev(null), 800);
        return next;
      });
    },
    [slides.length],
  );

  const stop = useCallback(() => {
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || hovering.current || focused.current || document.hidden) return;
    timer.current = window.setInterval(() => {
      setIndex((current) => {
        const next = (current + 1) % slides.length;
        setPrev(current);
        setDir(1);
        if (resetTimer.current) window.clearTimeout(resetTimer.current);
        resetTimer.current = window.setTimeout(() => setPrev(null), 800);
        return next;
      });
    }, DELAY);
  }, [slides.length, stop]);

  useEffect(() => {
    start();
    return () => {
      stop();
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, [start, stop]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onReduce = () => start();
    mq.addEventListener?.("change", onReduce);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      mq.removeEventListener?.("change", onReduce);
    };
  }, [start, stop]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(index - 1, -1);
      start();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      show(index + 1, 1);
      start();
    }
  };

  const touchX = useRef<number | null>(null);
  const onTouchStart = (event: React.TouchEvent) => {
    touchX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = event.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    touchX.current = null;
    start();
  };

  const current = slides[index];

  return (
    <div id="banner-carousel">
      <div
        id="banner"
        ref={rootRef}
        className="banner"
        role="region"
        aria-roledescription="carousel"
        aria-label="Promo banner DS STORE"
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => {
          hovering.current = true;
          stop();
        }}
        onMouseLeave={() => {
          hovering.current = false;
          start();
        }}
        onFocusCapture={() => {
          focused.current = true;
          stop();
        }}
        onBlurCapture={(event) => {
          if (event.relatedTarget && rootRef.current?.contains(event.relatedTarget)) return;
          focused.current = false;
          start();
        }}
      >
        <div className="banner__stage">
          {slides.map((slide, i) => {
            const state =
              i === index
                ? "is-active"
                : i === prev
                  ? dir > 0
                    ? "is-out-left"
                    : "is-out-right"
                  : "";
            return (
              <div
                key={slide.id}
                className={`banner__slide ${state}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} dari ${slides.length}`}
                aria-hidden={i === index ? "false" : "true"}
              >
                <div
                  className="banner__backdrop"
                  style={{ backgroundImage: `url('${slide.src}')` }}
                  aria-hidden="true"
                />
                <div className="banner__media">
                  <img
                    className="banner__img"
                    src={slide.src}
                    srcSet={slide.srcSet}
                    sizes="(max-width: 767px) 92vw, 760px"
                    width="1920"
                    height="1072"
                    alt={slide.alt}
                    fetchPriority={i === 0 ? "high" : undefined}
                    loading={i === 0 ? undefined : "lazy"}
                    decoding="async"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="banner__vignette" aria-hidden="true" />

        <button
          type="button"
          className="banner__nav banner__nav--prev"
          onClick={() => {
            show(index - 1, -1);
            start();
          }}
          aria-label="Tampilkan banner sebelumnya"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          className="banner__nav banner__nav--next"
          onClick={() => {
            show(index + 1, 1);
            start();
          }}
          aria-label="Tampilkan banner berikutnya"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="banner__bar">
        <div className="min-w-0">
          <p className="banner__eyebrow">{current.eyebrow}</p>
          <p className="banner__title">{current.title}</p>
        </div>
        <div className="banner__dots" role="group" aria-label="Pilih banner promo">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`banner__dot${i === index ? " is-active" : ""}`}
              onClick={() => {
                if (i !== index) show(i, i > index ? 1 : -1);
                start();
              }}
              aria-label={`Tampilkan banner ${i + 1}, ${slide.title}`}
              aria-current={i === index ? "true" : undefined}
            >
              <span className="sr-only">{slide.title}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {current.title}. Slide {index + 1} dari {slides.length}.
      </p>
    </div>
  );
}
