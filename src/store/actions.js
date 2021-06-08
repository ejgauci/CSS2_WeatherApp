import firebase from 'firebase/app'

const actions = {
  authAction ({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setUser', user)
      } else {
        commit('setUser', null)
      }
    })
  },
  signUpAction ({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit('setUser', response.user)
        var user = firebase.auth().currentUser
        user.updateProfile({
          displayName: payload.name + ' ' + payload.surname
        })
        firebase.database().ref('users/' + user.uid).set({
          userDetails: {
            name: payload.name,
            surname: payload.surname,
            mobileNumber: payload.mobileNumber,
            email: payload.email,
            isAdmin: false
          }

        })
      })
      .catch(error => {
        commit('setError', error.message)
      })
  },
  signInAction ({ commit }, payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit('setUser', response.user)
      })
      .catch(error => {
        commit('setError', error.message)
      })
  },
  signOutAction ({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('setUser', null)
      })
      .catch(error => {
        commit('setError', error.message)
      })
  },
  setAdminStatus ({ commit }, payload) {
    commit('setAdmin', payload.isAdmin)
  }

}

export default actions
