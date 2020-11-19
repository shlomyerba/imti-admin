<template>
  <nav>
    <router-link to="/">
      <div class="navigation_logo">Imti</div>
    </router-link>
    <button class="navigation_user" @click="exit">Exit</button>
  </nav>
  <router-view />
</template>


<script>
import VueCookies from "vue-cookies";

export default {
  setup() {

    async function exit() {
      VueCookies.set("token", null);
      console.log("VueCookies.set" + VueCookies.get("token"));
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

    button {
      background: none !important;
      border: none;
      padding: 0 !important;
      color: white;
      cursor: pointer;
      font-weight: bold;
      font-size: 24px;
    }
  }
}

</style>
