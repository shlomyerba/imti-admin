<template>
  <div class="update-email">
    <form class="update-email_form" @submit.prevent="updateEmail">
      <div class="update-email_container">
        <label>Mks *</label>
        <select
          id="chooseMk"
          v-model="state.selectedMk"
          @change="findCurrentEmail"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.Mks"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>
        <label>Email *</label>
        <input
          type="email"
          placeholder="Enter Email"
          v-model="state.email"
          required
        />
        <button>update</button>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";

export default {
  name: "UpdateEmail",
  setup() {
    const state = reactive({
      selectedMk: null,
      Mks: [],
      email: "",
    });

    async function findCurrentEmail() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk/info?imageIncluded=false&mkId=${state.selectedMk}&uuid=${token}`;
      console.log(url);
      try {
        let response = await axios.get(url);
        state.email = response.data.email;
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    async function updateEmail() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/mk/update/email?email=${state.email}&mkId=${state.selectedMk}&uuid=${token}`;
      console.log(url);
      try {
        let response = await axios.get(url);
        state.selectedMk = "";
        state.email = "";
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    onMounted(async () => {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk/all?imageIncluded=false&uuid=${token}`;
      console.log(url);
      try {
        let response = await axios.get(url);
        console.log(response);
        if (response.data) {
          state.Mks = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
    });

    return {
      state,
      updateEmail,
      findCurrentEmail,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.update-email_container {
  padding: 16px;
  font-weight: bold;

  input,
  select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  option {
    font-size: 15px;
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
</style>
