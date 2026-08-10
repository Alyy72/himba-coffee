"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type WhatsAppOrderButtonProps = {
  href: string;
  className?: string;
};

export function WhatsAppOrderButton({
  href,
  className,
}: WhatsAppOrderButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex h-16 w-full items-center justify-center gap-3 overflow-hidden bg-[#F2F2F2] text-[#0A0A0A] transition-[transform,background-color] duration-300 hover:bg-white active:scale-[0.985]",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-[#25D366] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
      />
      <MessageCircle
        className="relative z-10 h-5 w-5 transition-colors duration-300 group-hover:text-white"
        strokeWidth={1.75}
      />
      <span className="relative z-10 text-sm font-semibold tracking-[0.22em] uppercase transition-colors duration-300 group-hover:text-white">
        Order via WhatsApp
      </span>
    </a>
  );
}
