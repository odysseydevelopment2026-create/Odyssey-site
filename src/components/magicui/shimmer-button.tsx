import React, { ComponentPropsWithoutRef, CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface ShimmerButtonProps
  extends ComponentPropsWithoutRef<"button">,
    ComponentPropsWithoutRef<"a"> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  shimmer?: boolean
  className?: string
  children?: React.ReactNode
  as?: "button" | "a"
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      shimmer = true,
      className,
      children,
      as = "button",
      ...props
    },
    ref
  ) => {
    const Comp = as

    return (
      <Comp
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)]",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className
        )}
        ref={ref as never}
        {...props}
      >
        {shimmer ? (
          <div
            className={cn(
              "-z-30 blur-[2px]",
              "[container-type:size] absolute inset-0 overflow-visible"
            )}
          >
            <div className="animate-shimmer-slide absolute inset-0 [aspect-ratio:1] h-[100cqh] [border-radius:0] [mask:none]">
              <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
            </div>
          </div>
        ) : null}
        {children}

        <div
          className={cn(
            "absolute inset-0 size-full",
            "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
            "transform-gpu transition-all duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
          )}
        />

        <div
          className={cn(
            "absolute [inset:var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)]"
          )}
        />
      </Comp>
    )
  }
)

ShimmerButton.displayName = "ShimmerButton"
