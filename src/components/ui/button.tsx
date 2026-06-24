import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  ariaLabel,
}: ButtonProps) {
  const styles = cn(
    "inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
    variant === "primary" &&
      "bg-gold-500 text-pitch-950 hover:bg-gold-400 active:bg-gold-600",
    variant === "secondary" &&
      "border border-white/20 bg-white/10 text-white hover:bg-white/20",
    variant === "ghost" &&
      "text-pitch-100 hover:bg-white/10 hover:text-white",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={styles} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={styles} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
