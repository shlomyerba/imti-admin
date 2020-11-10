<template>
  <div class="home">
    <h1>Login</h1>
    <form class="login_form" @submit.prevent="login">
      <div class="login_container">
        <label>User Name</label>
        <input
          type="text"
          placeholder="Enter UserName"
          v-model="state.username"
        />
        <label>password</label>
        <input
          type="password"
          placeholder="Enter Password"
          v-model="state.password"
          required
        />
        <button>Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  name: "Login",
  setup() {
    const state = reactive({
      username: "",
      password: "",
    });

    async function login() {
      console.log(state.username);
      try {
        let response = await axios.get(
          `http://localhost:8080/admin/login?password=X%2376saNR!tA`
        );
        if (response.data) {
          // VueCookies.set("keyName", response.data, "1d");
          console.log(response.data);

          // this.$router.replace(`/Home/`);
        } else {
          alert("User or Password incorrect");
          return;
        }
      } catch (err) {
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