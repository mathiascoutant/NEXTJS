import { refreshSponsoredProducts } from "@/app/actions/sponsored";

export function RefreshSponsoredButton() {
  return (
    <form action={refreshSponsoredProducts}>
      <button
        type="submit"
        className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-pitch-100 transition-colors hover:border-gold-500/50 hover:text-white"
      >
        Actualiser
      </button>
    </form>
  );
}
