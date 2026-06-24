import { cn } from "@/lib/utils/cn";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        variant === "default" && "bg-pitch-100 text-pitch-800",
        variant === "accent" && "bg-gold-500 text-pitch-950",
        className,
      )}
    >
      {children}
    </span>
  );
}
