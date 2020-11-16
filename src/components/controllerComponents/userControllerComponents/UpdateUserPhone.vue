<template>
  <div class="update-phone">
    <form class="update-phone_form" @submit.prevent="updatePhone">
      <div class="update-phone_container">
        <label>Users *</label>
        <select
          id="chooseMk"
          v-model="state.selectedUser"
          @change="findCurrentPhone"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.users"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>
        <label>Phone *</label>
        <input
          type="phone"
          placeholder="Enter Phone"
          v-model="state.phone"
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
  name: "UpdatePhone",
  setup() {
    const state = reactive({
      selectedUser: null,
      users: [],
      phone: "",
    });

    async function findCurrentPhone() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/user/info?userId=${state.selectedUser}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.phone = response.data.phone;
      } catch (e) {
        console.log("e", e);
      }
    }

    async function updatePhone() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/user/update/phone?phone=${state.phone}&userId=${state.selectedUser}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.selectedUser = "";
        state.phone = "";
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    onMounted(async () => {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/user/all?uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          state.users = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
    });

    return {
      state,
      updatePhone,
      findCurrentPhone,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.update-phone_container {
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
