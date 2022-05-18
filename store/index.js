export const state = () => ({
  loading: false
})
export const actions = {
  async getPeople () {
    await this.$api.get('/people')
  }
}
export const mutations = {
  SET_LOADING (state, payload) {
    state.loading = payload
  }
}
