//state
export const state = () => ({
  user: {}
})

//mutations
export const mutation = {
  addUser(state, user){
    state.user.push(user)
  }
}

//actions

