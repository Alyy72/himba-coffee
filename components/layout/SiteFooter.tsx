export function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0a0a0f] px-4 py-6 text-sm text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-gray-400 sm:text-sm">
          © 2026 Himba Coffee. All rights reserved.
        </p>
        <p className="flex items-center gap-1.5 text-xs font-medium sm:text-sm">
          <span>Created by</span>
          <a
            href="https://github.com/Alyy72"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold tracking-wide text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all hover:text-red-400 hover:underline"
          >
            AlyyConnect
          </a>
        </p>
      </div>
    </footer>
  );
}
