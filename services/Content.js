const config = require('@/config')
import { EventBus } from '@/event-bus.js'

const getContent = async (section, slug) =>
  await import(`@/static/api/${section}/${slug}.json`).then(m => m.default || m)

export { getContent }
