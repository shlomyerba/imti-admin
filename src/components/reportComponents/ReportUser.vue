<template>
  <div class="report-user">
    <div class="report-user_container">
      <label>בחר דוח לפי *</label><br />
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

      <button @click="viewAllReport" v-if="state.isChoose">הצג</button>
    </div>
  </div>

  <div
    v-if="
      state.info && (state.isAll || state.isByEvent || state.isSpecificUserInfo)
    "
  >
    <UserTable v-bind:info="state.info" />
  </div>

  <div v-if="state.info && state.isAllEvents">
    <EventTable v-bind:info="state.info" />
  </div>

  <div v-if="state.info && state.isUserActivity">
    <ActivityTable v-bind:info="state.info" />
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../assets/url";
import { reportUserOptions } from "../../assets/reportsOptions";
import ActivityTable from "../commonHtml/ActivityTable";
import EventTable from "../commonHtml/EventTable";
import UserTable from "../commonHtml/UserTable";
import {
  getAllEvents,
  getAllUsers,
  generalGetRequest,
} from "../../assets/apiRequest";

export default {
  name: "ReportUser",
  components: { ActivityTable, EventTable, UserTable },
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
      let token = await VueCookies.get("adminToken");
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
      let data = await generalGetRequest(url);
      if (state.isSpecificUserInfo) {
        state.info = [data];
      } else {
        state.info = data;
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

    async function updateEventsList() {
      state.events = await getAllEvents();
    }
    async function updateUserList() {
      state.users = await getAllUsers();
    }
    onMounted(async () => {
      await updateEventsList();
      await updateUserList();
    });

    return {
      state,
      findNext,
      viewAllReport,
      closeAll,
      updateEventsList,
      updateUserList,
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