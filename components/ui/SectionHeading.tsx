import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  badge?: string
  title: string
  titleAccent?: string
  subtitle?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({
  badge,
  title,
  titleAccent,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-16", align === "center" && "text-center", className)}>
      {badge && (
        <div className="mb-6">
          <span className="badge-shimmer-outer inline-flex">
            <span className="inline-flex items-center rounded-full bg-background px-5 py-2 text-xs font-medium tracking-wide text-text-secondary">
              {badge}
            </span>
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl md:text-5xl">
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="font-[family-name:var(--font-serif-accent)] italic font-normal text-text-secondary">
              {titleAccent}
            </span>
          </>
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-text-secondary",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
