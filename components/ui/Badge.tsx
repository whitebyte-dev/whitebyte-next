import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "accent" | "muted"
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        variant === "default" && "border-border text-text-secondary bg-surface",
        variant === "accent" && "border-accent/30 text-accent bg-accent-glow",
        variant === "muted" && "border-border text-text-muted bg-surface",
        className
      )}
    >
      {children}
    </span>
  )
}
