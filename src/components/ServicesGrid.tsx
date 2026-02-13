import { TextAnimate } from '@/components/magicui/text-animate'
import { MagicCard } from '@/components/magicui/magic-card'
import { siteData } from '@/data'

const ServicesGrid = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {siteData.services.items.map((service) => (
        <MagicCard
          key={service.id}
          className="rounded-2xl bg-white/5 p-5 backdrop-blur-md transition duration-500 ease-smooth hover:scale-[1.02]"
        >
          <div className="flex items-center gap-3">
            {service.id === 'service-strategy' ? (
              <img src="/chess-piece.png" alt="" className="h-6 w-6" />
            ) : service.id === 'service-ux' ? (
              <img src="/web-design.png" alt="" className="h-6 w-6" />
            ) : service.id === 'service-design' ? (
              <img src="/brush.png" alt="" className="h-6 w-6" />
            ) : service.id === 'service-motion' ? (
              <img src="/animation.png" alt="" className="h-6 w-6" />
            ) : service.id === 'service-dev' ? (
              <img src="/development.png" alt="" className="h-6 w-6" />
            ) : (
              <svg
                viewBox={service.icon.viewBox}
                className="h-6 w-6 text-white"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={service.icon.path} />
              </svg>
            )}
            <h3 className="font-heading text-lg">
              <TextAnimate animation="blurInUp" by="character" once>
                {service.title}
              </TextAnimate>
            </h3>
          </div>
          <p className="mt-4 text-sm text-white/70">
            <TextAnimate animation="blurInUp" by="word" once>
              {service.description}
            </TextAnimate>
          </p>
        </MagicCard>
      ))}
    </div>
  )
}

export default ServicesGrid
