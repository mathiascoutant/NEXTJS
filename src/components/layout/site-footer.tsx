export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-pitch-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-pitch-300">
            &copy; {new Date().getFullYear()} My Supa Store — Boutique de football
          </p>
          <p className="text-xs text-pitch-400">
            Formation Next.js Jour 1
          </p>
        </div>
      </div>
    </footer>
  );
}
