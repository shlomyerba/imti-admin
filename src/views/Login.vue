<template>
  <div class="home">
    <form class="login_form" @submit.prevent="login">
      <div class="login_container">
        
        <label>הזן סיסמה</label>
        <input
          type="password"
          v-model="state.password"
          required
        />
        <button>הכנס</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import { baseUrl } from "../assets/url";

export default {
  name: "Login",
  setup() {
    const state = reactive({
      username: "",
      password: "",
      timeout: null,
      tempToken: "X%2376saNR!tA", //temp
    });

    async function login() {
      try {
        let response = await axios.get(
          `${baseUrl}/admin/login?password=${state.tempToken}`
        );
        if (response.data) {
          state.username = "";
          state.password = "";

          //saving cooky for 45 minutes:
          VueCookies.set("adminToken", response.data, 60 * 45);

          window.location = "/";
        } else {
          alert("User or Password incorrect");
          return;
        }
      } catch (err) {
        console.log(err);
        alert("Please try again");
        return;
      }
    }

    return {
      state,
      login,
    };
  },
};
</script>


<style lang="scss" scoped>
.login_form {
  border: 3px solid #f1f1f1;
  margin: 5% 35%;

  .login_container {
    padding: 16px;
    font-weight: bold;

    input {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    button {
      background-color: blueviolet;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      cursor: pointer;
      width: 100%;
      font-weight: bold;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>