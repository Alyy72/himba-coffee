"use client";

import { ENGRAVING_MAX_LENGTH } from "@/lib/tumbler";
import { cn } from "@/lib/utils";

type EngravingInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function EngravingInput({
  value,
  onChange,
  className,
}: EngravingInputProps) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-3 block text-[11px] tracking-[0.22em] text-white/45 uppercase">
        Add your name (Free)
      </span>
      <div className="relative border-b border-white/15 transition-colors focus-within:border-white/55">
        <input
          type="text"
          value={value}
          maxLength={ENGRAVING_MAX_LENGTH}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your name"
          autoComplete="off"
          spellCheck={false}
          className="h-12 w-full bg-transparent pr-14 text-lg tracking-[0.08em] text-[#F2F2F2] placeholder:text-white/25 outline-none"
        />
        <span className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-[11px] tracking-wider text-white/30 tabular-nums">
          {value.length}/{ENGRAVING_MAX_LENGTH}
        </span>
      </div>
    </label>
  );
}
