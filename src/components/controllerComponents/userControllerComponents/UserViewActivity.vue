<template>
  <div class="user-view-activity">
    <form class="user-view-activity_form" @submit.prevent="viewUserActivity">
      <div class="user-view-activity_container">
        <label>Users *</label><br />
        <select id="ChooseUser" v-model="state.selectedUser" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.users"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>
        <button>view</button>
      </div>
    </form>
  </div>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>


<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";

export default {
  name: "UserViewActivity",
  setup() {
  
    const state = reactive({
      selectedUser: null,
      users: [],
      // items: [
      //   { id: 1, name: "shlomy" },
      //   { id: 2, name: "shlomo" },
      // ],
    });

    async function viewUserActivity() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/user/view/activity?userId=${state.selectedUser}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    onMounted(async () => {
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
    });

    return {
      state,
      viewUserActivity,
    };
  },
};
</script>

  
<style lang="scss">
.user-view-activity_container {
  padding: 16px;
  font-weight: bold;

  select {
    width: 45%;
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
    width: 45%;
    font-weight: bold;
    margin-left: 5%;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
