const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  setAdmin (state, payload) {
    state.isAdmin = payload
  }
}

export default mutations
