export function buildTelegramLink(href: string, message: string) {
  const raw = (href ?? '').trim()

  if (!raw) return 'https://t.me/'

  const normalized = raw.startsWith('@') ? `https://t.me/${raw.slice(1)}` : raw
  const url = new URL(normalized)

  if (message && message.trim()) {
    url.searchParams.set('text', message.trim())
  }

  return url.toString()
}
