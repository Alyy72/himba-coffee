"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/store", label: "Store" },
  { href: "/customize", label: "Customize" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4 md:px-6"
      >
        <motion.nav
          layout
          className={cn(
            "pointer-events-auto relative flex w-full max-w-3xl items-center gap-2 rounded-full border px-2 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-[background-color,border-color,box-shadow] duration-500 sm:px-2.5 sm:py-2",
            scrolled
              ? "border-white/18 bg-[#0A0A0A]/78 shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
              : "border-white/14 bg-white/[0.08]",
          )}
          aria-label="Primary"
        >
          {/* Soft inner rim — floating glass edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
          />

          <Link
            href="/"
            className="relative z-10 shrink-0 rounded-full px-3.5 py-2 text-[11px] font-semibold tracking-[0.32em] text-[#F2F2F2] uppercase transition-opacity hover:opacity-80 sm:px-4 sm:tracking-[0.36em]"
          >
            Himba
          </Link>

          <ul className="relative z-10 ml-auto hidden items-center gap-0.5 md:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "relative z-10 block rounded-full px-3.5 py-2 text-[10px] tracking-[0.18em] uppercase transition-colors duration-300 sm:px-4 sm:text-[11px]",
                      active
                        ? "text-[#0A0A0A]"
                        : "text-white/55 hover:text-white",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="floating-nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-[#F2F2F2] shadow-[0_4px_20px_rgba(255,255,255,0.18)]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="relative z-10 ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/80 transition-colors hover:border-white/25 hover:text-white md:hidden"
            aria-expanded={open}
            aria-controls="floating-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="floating-mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <button
              type="button"
              aria-label="Dismiss menu"
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -16, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-3 top-[4.25rem] overflow-hidden rounded-[1.75rem] border border-white/14 bg-[#0A0A0A]/88 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:inset-x-5"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-3.5 text-[12px] tracking-[0.2em] uppercase transition-colors",
                          active
                            ? "bg-[#F2F2F2] text-[#0A0A0A]"
                            : "text-white/65 hover:bg-white/[0.06] hover:text-white",
                        )}
                      >
                        {link.label}
                        <span
                          aria-hidden
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            active ? "bg-[#0A0A0A]" : "bg-white/25",
                          )}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
