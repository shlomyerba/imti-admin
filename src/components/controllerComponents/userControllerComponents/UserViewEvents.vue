<template>
  <div class="user-view-events">
    <form class="user-view-events_form" @submit.prevent="viewUserEvents">
      <div class="user-view-events_container">
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
  <div v-if="state.events.length">
    <table class="event_info">
      <tr>
        <th>Evevt</th>
        <th>Date</th>
      </tr>
      <tr v-for="(event, index) in state.events" :key="index">
        <td>{{ event.title }}</td>
        <td>{{ findDate(event.timestamp) }}</td>
      </tr>
    </table>
  </div>
</template>


<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";

export default {
  name: "ViewUserEvents",
  setup() {
    const state = reactive({
      selectedUser: null,
      users: [],
      events: [],
    });

    async function viewUserEvents() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/user/view/events?userId=${state.selectedUser}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.events = response.data;
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    function findDate(timestamp) {
      let date = new Date(timestamp);
      console.log("date", date);
      let day = date.getDay();
      if (date.getDay() < 10) {
        day = `0${date.getDay()}`;
      }
      let month = date.getMonth() + 1;
      if (date.getMonth() + 1 < 10) {
        month = `0${date.getMonth() + 1}`;
      }
      return `${day}-${month}-${date.getFullYear()}`;
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
      viewUserEvents,
      findDate,
    };
  },
};
</script>

  
<style lang="scss">
.user-view-events_container {
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
