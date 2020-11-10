export const TokenModule={
    namespaced:true,


    state: {
        token: null
      },
    
      //Mutations are functions that effect the STAFF
      mutations: {
        SET_TOKEN(state, token) {
          state.token = token
    
        }
      },
    
      //Actions are functions that you call throughout your applications that call mutations
      actions: {
        setToken({ commit }, token) {
          commit('SET_TOKEN', token);
        }
      },
      modules: {
      }
}