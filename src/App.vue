<template>
  <nav>
    <router-link to="/">
      <div class="navigation_logo">IMTI</div>
    </router-link>
    <button class="navigation_user" @click="exit">התנתק</button>
  </nav>
  <router-view />
</template>


<script>
import VueCookies from "vue-cookies";

export default {
  setup() {

    async function exit() {
      VueCookies.set("adminToken", null);
      console.log("VueCookies.set" + VueCookies.get("adminToken"));
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
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
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
