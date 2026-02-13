import type { Metadata } from 'next'
import SectionHeading from '@/components/SectionHeading'
import ServicesExtraList from '@/components/ServicesExtraList'
import ServicesGrid from '@/components/ServicesGrid'
import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import { siteData } from '@/data'

export const metadata: Metadata = {
  title: siteData.pages.services.title,
  description: siteData.pages.services.description,
}

export default function ServicesPage() {
  return (
    <section id="services" className="section-target relative overflow-hidden bg-black px-6 py-16 sm:py-24">
      <DotPattern glow className={cn()} />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 px-6">
            <SectionHeading title={siteData.servicesPage.heading} />
            <p className="text-sm text-white/70">{siteData.servicesPage.description}</p>
          </div>
          <ServicesExtraList
            title={siteData.servicesPage.extraFrameTitle}
            items={siteData.extraServices.items}
          />
        </div>
        <div className="flex flex-col gap-6 lg:justify-end">
          {siteData.services.heading ? (
            <SectionHeading title={siteData.services.heading} />
          ) : null}
          <ServicesGrid />
        </div>
      </div>
    </section>
  )
}
