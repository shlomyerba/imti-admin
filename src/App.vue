<template>
  <nav>
    <router-link to="/">
      <div class="navigation_logo">Imti</div>
    </router-link>
    <div class="navigation_user" @submit.prevent="exit">Exit</div>
  </nav>
  <div id="nav">
    <router-link to="/">Admin</router-link> |
    <router-link to="/Login">Login </router-link>
  </div>
  <router-view />
</template>


<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    async function exit() {
      await store.dispatch("Token/setToken", null);
      console.log("store.state.token" + store.state.Token.token);

      window.location = "/login";
    }

    return {
      exit,
    };
  },
};
</script>

  
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5%;
    background-color: blueviolet;
    color: white;
    font-weight: bold;
    font-size: 24px;
  }
}

// #nav {
//   padding: 30px;
// }

// #nav a {
//   font-weight: bold;
//   color: #2c3e50;
// }

// #nav a.router-link-exact-active {
//   color: #42b983;
// }
</style>
