export const state = () => ({
  user: {},
})

export const actions = {
  async getUser(ctx) {
    const {data} = await this.$axios.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    ctx.commit('updatedUser', data)
    return data
  }
}

export const mutations = {
  updatedUser(state, user) {
    state.user = {...user}
  }
}

