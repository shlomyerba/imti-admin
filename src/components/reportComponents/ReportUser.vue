<template>
  <div class="report-user">
    <div class="report-user_container">
      <label>Choose report by *</label><br />
      <select v-model="state.selectedBy" @change="findNext">
        <option
          :value="option.id"
          v-for="(option, index) in state.reportUserOptions"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <select
        v-model="state.selectedEvents"
        @change="chosen"
        v-if="state.isByEvent"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.events"
          :key="index"
        >
          {{ option.title }}
        </option>
      </select>

      <select
        v-model="state.selectedUsers"
        @change="chosen"
        v-if="state.isAllUsers"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.users"
          :key="index"
        >
          {{ `${option.first} ${option.last}` }}
        </option>
      </select>

      <button @click="viewAllReport" v-if="state.isChoose">view</button>
    </div>
  </div>

  <div
    v-if="
      state.info && (state.isAll || state.isByEvent || state.isSpecificUserInfo)
    "
  >
    <table class="user_info">
      <tr>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Membership</th>
        <th>Password</th>
        <th>Phone</th>
      </tr>
      <tr v-for="(event, index) in state.info" :key="index">
        <td>{{ event.id }}</td>
        <td>{{ event.first }}</td>
        <td>{{ event.last }}</td>
        <td>{{ event.email }}</td>
        <td>{{ event.membership }}</td>
        <td>{{ event.password }}</td>
        <td>{{ event.phone }}</td>
      </tr>
    </table>
  </div>

  <div v-if="state.info && state.isAllEvents">
    <table class="user_info">
      <tr>
        <th>Title</th>
        <th width="200">Description</th>
        <th>Importance</th>
        <th>Mk Founder</th>
        <th width="200">Msg To MKs</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
      </tr>
      <tr v-for="(event, index) in state.info" :key="index">
        <td>{{ event.title }}</td>
        <td>{{ event.description }}</td>
        <td>{{ state.getHebrewImportances(event.importance) }}</td>
        <td>{{ `${event.founder.first} ${event.founder.last}` }}</td>
        <td>{{ event.msgToMKs }}</td>
        <td>{{ state.getDateFormat(new Date(event.timestamp)) }}</td>
        <td>{{ state.getHourAndMinuteFormat(new Date(event.timestamp)) }}</td>
        <td>{{ state.getHebrewStatus(event.status) }}</td>
      </tr>
    </table>
  </div>

  <div v-if="state.info && state.isUserActivity">
    <table class="user_info">
      <tr>
        <th>Evevt</th>
        <th>Mk</th>
      </tr>
      <tr v-for="(event, index) in state.info" :key="index">
        <td>{{ event.event.title }}</td>
        <td>{{ `${event.mk.first} ${event.mk.last}` }}</td>
      </tr>
    </table>
  </div>
</template>


<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../assets/url";
import { reportUserOptions } from "../../assets/reportsOptions";
import { getDateFormat } from "../../assets/getDateFormat";
import { getHourAndMinuteFormat } from "../../assets/getHourAndMinuteFormat";
import {
  getHebrewImportances,
  getHebrewStatus,
} from "../../assets/getHebrewOptions";

export default {
  name: "ReportUser",
  setup() {
    const state = reactive({
      isChoose: false,
      isAll: false,
      isByEvent: false,
      isAllUsers: false,
      isAllEvents: false,
      isUserActivity: false,
      isSpecificUserInfo: false,
      selectedBy: null,
      reportUserOptions: reportUserOptions,
      getDateFormat: getDateFormat,
      getHourAndMinuteFormat: getHourAndMinuteFormat,
      getHebrewImportances: getHebrewImportances,
      getHebrewStatus: getHebrewStatus,
      info: "",
      selectedUsers: null,
      users: [],
      selectedEvents: null,
      events: [],
    });

    function findNext() {
      console.log(state.selectedBy);
      state.info = "";
      closeAll();
      state.selectedUsers = null;
      state.selectedEvents = null;
      if (state.selectedBy === "all") {
        state.isAll = true;
        state.isChoose = true;
      } else if (state.selectedBy === "byEvent") {
        state.isByEvent = true;
      } else if (
        state.selectedBy === "allEvents" ||
        state.selectedBy === "userActivity" ||
        state.selectedBy === "specificUserInfo"
      ) {
        state.isAllUsers = true;
      }
    }

    function chosen() {
      if (state.selectedBy === "allEvents") {
        state.isAllEvents = true;
      } else if (state.selectedBy === "userActivity") {
        state.isUserActivity = true;
      } else if (state.selectedBy === "specificUserInfo") {
        state.isSpecificUserInfo = true;
      }
      state.isChoose = true;
    }

    async function viewAllReport() {
      state.info = "";
      let token = await VueCookies.get("token");
      console.log("viewAllReport");
      let url = `${baseUrl}/admin/report/user`;
      if (state.isAll) {
        url += "/all?";
      } else if (state.isByEvent) {
        url += `/by/event?eventId=${state.selectedEvents}&`;
      } else if (state.isAllUsers && state.isAllEvents) {
        url += `/events?userId=${state.selectedUsers}&`;
      } else if (state.isAllUsers && state.isUserActivity) {
        url += `/activity?userId=${state.selectedUsers}&`;
      } else if (state.isAllUsers && state.isSpecificUserInfo) {
        url += `/info?userId=${state.selectedUsers}&`;
      }
      url += `uuid=${token}`;
      console.log(url);
      try {
        let response = await axios.get(url);
        state.info = response.data;
        if (state.isSpecificUserInfo) {
          state.info = [response.data];
        }
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    function closeAll() {
      state.isChoose = false;
      state.isAll = false;
      state.isByEvent = false;
      state.isAllUsers = false;
      state.isAllEvents = false;
      state.isUserActivity = false;
      state.isSpecificUserInfo = false;
    }

    async function getAllEvents() {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/event/all?uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          console.log(response.data);
          state.events = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
    }
    async function getAllUsers() {
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
      await getAllEvents();
      await getAllUsers();
    });

    return {
      state,
      findNext,
      viewAllReport,
      closeAll,
      getAllEvents,
      getAllUsers,
      chosen,
    };
  },
};
</script>

<style lang="scss" scoped>
.report-user_container {
  padding: 16px;
  font-weight: bold;

  input,
  select {
    width: 30%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-left: 3%;
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
    width: 20%;
    font-weight: bold;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>