<template>
  <div class="remove-user">
    <form class="remove-user_form" @submit.prevent="removeUser">
      <div class="remove-user_container">
        <label>Parties *</label>
        <select id="ChooseUser" v-model="state.selectedUser" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.users"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>
        <button>remove</button>
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
  name: "RemoveParty",
  setup() {
    const state = reactive({
      selectedUser: null,
      users: [],
    });

    async function removeUser() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/user/remove?userId=${state.selectedUser}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.selectedUser = "";
        console.log("response", response);
        await updateUsers();
      } catch (e) {
        console.log("e", e);
      }
    }

    async function updateUsers() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/user/all?uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          state.users = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
    }

    onMounted(async () => {
      await updateUsers();
    });

    return {
      state,
      removeUser,
      updateUsers,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.remove-user_container {
  padding: 16px;
  font-weight: bold;

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
