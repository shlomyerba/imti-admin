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
  <div v-if="state.events">
    <table class="event_info">
      <tr>
        <th>Evevt</th>
        <th>Date</th>
      </tr>
      <tr v-for="(event, index) in state.events" :key="index">
        <td>{{ event.title }}</td>
        <td>{{ state.getDateFormat(new Date(event.timestamp)) }}</td>
      </tr>
    </table>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { getDateFormat } from "../../../assets/getDateFormat";
import { getAllUsers, generalGetRequest } from "../../../assets/apiRequest";

export default {
  name: "ViewUserEvents",
  setup() {
    const state = reactive({
      selectedUser: null,
      users: [],
      events: "",
      getDateFormat: getDateFormat,
    });

    async function viewUserEvents() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/user/view/events?userId=${state.selectedUser}&uuid=${token}`;
      state.events = await generalGetRequest(url);
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
