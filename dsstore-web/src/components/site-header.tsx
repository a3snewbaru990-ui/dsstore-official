import { useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { images } from "@/lib/assets";
import { NAV_LINKS, WA_LINK } from "@/lib/data";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-deep/95 backdrop-blur-xl">
      <div className="shell flex items-center gap-3 py-2.5">
        <a href="#beranda" className="flex min-w-0 items-center gap-2.5">
          <span className="relative flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={images.dsLogo}
              width={40}
              height={40}
              alt=""
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-bold uppercase leading-tight tracking-wide text-ink">
              DS Store
            </span>
            <span className="block truncate text-[11px] font-medium leading-tight text-ink-mute">
              Joki Rank MLBB
            </span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Navigasi utama">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-mute transition-colors duration-150 hover:bg-slateink hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button asChild size="lg" className="hidden lg:inline-flex">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
            Chat admin
          </a>
        </Button>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-10 w-10 lg:hidden"
              aria-label="Buka menu navigasi"
            >
              <Icon name="menu" className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm border-border bg-background">
            <SheetHeader>
              <SheetTitle className="text-left text-base font-bold uppercase tracking-wide text-ink">
                DS Store
              </SheetTitle>
              <SheetDescription className="text-left text-xs text-ink-mute">
                Joki rank Mobile Legends Season 42.
              </SheetDescription>
            </SheetHeader>
            <nav className="mt-2 flex flex-col gap-1" aria-label="Navigasi seluler">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-slateink hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <Button asChild size="lg" className="mt-5 w-full">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                Chat admin WhatsApp
              </a>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
