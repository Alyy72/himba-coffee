"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/store", label: "Store" },
  { href: "/customize", label: "Customize" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/8 bg-[#0A0A0A]/65 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[4.25rem] md:px-10">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.4em] text-[#F2F2F2] uppercase transition-opacity hover:opacity-80"
          >
            Himba
          </Link>

          <ul className="flex items-center gap-1 sm:gap-2 md:gap-1">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-2.5 py-2 text-[10px] tracking-[0.18em] uppercase transition-colors sm:px-3 sm:text-[11px] md:tracking-[0.22em]",
                      active
                        ? "text-white"
                        : "text-white/45 hover:text-white/80",
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2.5 -bottom-px h-px bg-white/70 sm:inset-x-3"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
