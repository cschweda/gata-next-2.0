const config = require('@/config')
import { EventBus } from '@/event-bus.js'

const getContent = async (section, slug) =>
  await import(`@/static/api/${section}/${slug}.json`).then(m => m.default || m)

const getAllFunding = async () =>
  await import(`@/static/api/meta/funding.json`).then(m => m.default || m)

const getAllNews = async () =>
  await import(`@/static/api/meta/news.json`).then(m => m.default || m)

export { getContent, getAllFunding, getAllNews }
