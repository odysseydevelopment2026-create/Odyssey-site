'use client'

import { BlurFade } from '@/components/magicui/blur-fade'

type SectionHeadingProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

const alignClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center',
}

const SectionHeading = ({ title, subtitle, align = 'left' }: SectionHeadingProps) => {
  return (
    <div className={`flex flex-col gap-3 ${alignClasses[align]}`}>
      <BlurFade inView duration={0.6} blur="10px" offset={12}>
        <h2 className="font-arsenal text-2xl sm:text-3xl lg:text-4xl tracking-wide">
          {title}
        </h2>
      </BlurFade>
      {subtitle ? (
        <p className="max-w-2xl text-sm sm:text-base text-white/70">{subtitle}</p>
      ) : null}
    </div>
  )
}

export default SectionHeading
