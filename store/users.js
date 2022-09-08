export const state = () => ({
  users: {}
})

export const actions = {
  async getUsers(ctx) {
    const {data} = (await this.$axios.get('/users?limit=40')).data
    ctx.commit('updatedUsers', data)
    return data
  }
}

export const mutations = {
  updatedUsers(state, users) {
    state.users = {...users}
  }
}
