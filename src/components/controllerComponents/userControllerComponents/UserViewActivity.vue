<template>
  <div class="user-view-activity">
    <form class="user-view-activity_form">
      <div class="user-view-activity_container">
        <label>בחר משתמש *</label><br />
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
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import ActivityTable from "../../commonHtml/ActivityTable";
import { getAllUsers, generalGetRequest } from "../../../assets/apiRequest";

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
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/user/view/activity?userId=${state.selectedUser}&uuid=${token}`;
      state.info = await generalGetRequest(url);
    }

    onMounted(async () => {
      state.users = await getAllUsers();
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
  // font-family: arial, sans-serif;
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
