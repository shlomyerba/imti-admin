<template>
  <div class="user-view-events">
    <form class="user-view-events_form">
      <div class="user-view-events_container">
        <label>Users *</label><br />
        <select
          id="ChooseUser"
          v-model="state.selectedUser"
          @change="viewUserEvents"
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
  <div v-if="state.info">
    <EventTable v-bind:info="state.info" />
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { getDateFormat } from "../../../assets/getDateFormat";
import { getAllUsers, generalGetRequest } from "../../../assets/apiRequest";
import EventTable from "../../commonHtml/EventTable";

export default {
  name: "ViewUserEvents",
  components: { EventTable },
  setup() {
    const state = reactive({
      selectedUser: null,
      users: [],
      info: "",
      getDateFormat: getDateFormat,
    });

    async function viewUserEvents() {
      state.info = "";
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/user/view/events?userId=${state.selectedUser}&uuid=${token}`;
      state.info = await generalGetRequest(url);
    }

    onMounted(async () => {
      state.users = await getAllUsers();
    });

    return {
      state,
      viewUserEvents,
    };
  },
};
</script>

  
<style lang="scss">
.user-view-events_container {
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
