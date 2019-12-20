export const state = () => ({
  pages: [],
  funding: [],
  news: []
})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {}
}

export const getters = {
  // funding: (state, getters) => {
  //   return state.funding
  // },
  // pages: (state, getters) => {
  //   return state.pages
  // },
  // news: (state, getters) => {
  //   return state.news
  // },
  // current: state => {
  //   const today = new Date()
  //   // const target = new Date(
  //   //   today.getTime() + Math.abs(today.getTimezoneOffset() * 60000)
  //   // )
  //   const target = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  //   let current = []
  //   state.funding.forEach(x => {
  //     let expiration = new Date(x.expires)
  //     if (expiration > target) current.push(x)
  //   })
  //   return current
  // },
  // expired: state => {
  //   const today = new Date()
  //   // const target = new Date(
  //   //   today.getTime() + Math.abs(today.getTimezoneOffset() * 60000)
  //   // )
  //   const target = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  //   let expired = []
  //   state.funding.forEach(x => {
  //     if (new Date(x.expires) < target) expired.push(x)
  //   })
  //   return expired
  // }
}
