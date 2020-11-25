<template>
  <div class="user-view-activity">
    <form class="user-view-activity_form">
      <div class="user-view-activity_container">
        <label>Users *</label><br />
        <select
          id="ChooseUser"
          v-model="state.selectedUser"
          @change="viewUserActivity"
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
      </div>
    </form>
  </div>
  <div v-if="state.info.length">
    <ActivityTable v-bind:info="state.info" />
  </div>
</template>


<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import ActivityTable from "../../commonHtml/ActivityTable";

export default {
  name: "UserViewActivity",
  components: { ActivityTable },
  setup() {
    const state = reactive({
      selectedUser: null,
      users: [],
      info: [],
    });

    async function viewUserActivity() {
      state.info = "";
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/user/view/activity?userId=${state.selectedUser}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.info = response.data;
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
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid blueviolet;
  text-align: center;
  padding: 8px;
}
th {
  font-size: 20px;
}
tr:nth-child(even) {
  background-color: blueviolet;
  color: white;
}
</style>
