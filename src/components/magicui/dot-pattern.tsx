import { cn } from "@/lib/utils"

interface DotPatternProps {
  className?: string
  glow?: boolean
}

export function DotPattern({ className, glow = false }: DotPatternProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:28px_28px] opacity-30 animate-dot-drift" />
      {glow ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_60%)] opacity-60 animate-dot-glow" />
      ) : null}
    </div>
  )
}
