import Vuex from 'vuex'
import getters from './getters'

const initialState = () => {
  return { user: null, error: null }
}

export default new Vuex.Store({

  state: initialState,
  getters: getters
  
})