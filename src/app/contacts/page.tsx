import type { Metadata } from 'next'
import ContactsChat from '@/components/ContactsChat'
import EmailCopyButton from '@/components/EmailCopyButton'
import SectionHeading from '@/components/SectionHeading'
import { TextAnimate } from '@/components/magicui/text-animate'
import { siteData } from '@/data'

export const metadata: Metadata = {
  title: siteData.pages.contacts.title,
  description: siteData.pages.contacts.description,
}

export default function ContactsPage() {
  const emailItem = siteData.contacts.items.find((item) => item.id === 'email')
  const emailValue = emailItem?.value ?? 'odysseydevelopment2026@gmail.com'

  return (
    <section id="contacts" className="section-target bg-black px-6 py-16 sm:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-8 text-center">
          <SectionHeading title={siteData.contactsPage.heading} align="center" />
          <p className="text-sm text-white/70">
            <TextAnimate animation="blurInUp" by="word" once>
              {siteData.contactsPage.instruction}
            </TextAnimate>
          </p>
          <div className="flex w-full max-w-[240px] flex-col items-center gap-4">
            {siteData.contactsPage.buttons.map((button) => (
              button.id === 'email' ? (
                <EmailCopyButton
                  key={button.id}
                  email={emailValue}
                  className="glass-soft flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-center text-sm uppercase tracking-[0.2em] font-manrope transition duration-500 ease-smooth hover:scale-[1.02]"
                >
                  {button.label}
                </EmailCopyButton>
              ) : (
                <a
                  key={button.id}
                  href={button.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-soft flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-center text-sm uppercase tracking-[0.2em] font-manrope transition duration-500 ease-smooth hover:scale-[1.02]"
                >
                  {button.label}
                </a>
              )
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <ContactsChat />
        </div>
      </div>
    </section>
  )
}
