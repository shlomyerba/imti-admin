<template>
  <div class="report-mk-event">
    <div class="report-mk-event_container">
      <label>Choose report by *</label><br />
      <select v-model="state.selectedBy" @change="findNext">
        <option
          :value="option.id"
          v-for="(option, index) in state.reportMkEventOptions"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <select
        v-model="state.selectedEvents"
        @change="chosenEvent"
        v-if="state.isEvent"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.events"
          :key="index"
        >
          {{ option.title }}
        </option>
      </select>

      <select v-model="state.selectedVote" @change="chosen" v-if="state.isVote">
        <option
          :value="option.id"
          v-for="(option, index) in state.votes"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <select
        v-model="state.selectedMk"
        @change="chosen"
        v-else-if="state.isByMk"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.mks"
          :key="index"
        >
          {{ `${option.first} ${option.last}` }}
        </option>
      </select>

      <select
        v-model="state.selectedMkByEvent"
        @change="chosen"
        v-else-if="state.isSpecificMKEventInfo"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.mksByEvent"
          :key="index"
        >
          {{ `${option.mk.first} ${option.mk.last}` }}
        </option>
      </select>

      <button @click="viewAllReport" v-if="state.isChoose">view</button>
    </div>
  </div>

  <div v-if="state.info">
    <table class="user_info">
      <tr>
        <th>Id</th>
        <th>Mk</th>
        <th>Event</th>
        <th width="200">Description</th>
        <th>Vote</th>
      </tr>
      <tr v-for="(event, index) in state.info" :key="index">
        <td>{{ event.id }}</td>
        <td>{{ `${event.mk.first} ${event.mk.last}` }}</td>
        <td>{{ event.event.title }}</td>
        <td>{{ event.event.description }}</td>
        <td>{{ state.getHebrewVote(event.vote) }}</td>
      </tr>
    </table>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../assets/url";
import { reportMkEventOptions } from "../../assets/reportsOptions";
import { votes } from "../../assets/staticOptions";
import { getHebrewVote } from "../../assets/getHebrewOptions";
import {
  getAllEvents,
  getAllMks,
  generalGetRequest,
} from "../../assets/apiRequest";

export default {
  name: "ReportMkEvent",
  setup() {
    const state = reactive({
      isChoose: false,
      isEvent: false,
      isVote: false,
      isByMk: false,
      isSpecificMKEventInfo: false,
      selectedBy: null,
      reportMkEventOptions: reportMkEventOptions,
      getHebrewVote: getHebrewVote,
      info: "",
      selectedEvents: null,
      events: [],
      selectedVote: null,
      votes: votes,
      selectedMk: null,
      mks: [],
      selectedMkByEvent: null,
      mksByEvent: [],
    });

    function findNext() {
      console.log(state.selectedBy);
      state.selectedMk = false;
      state.selectedMkByEvent = false;
      state.selectedEvents = false;
      state.selectedVote = false;
      closeAll();
      if (
        state.selectedBy === "byEvent" ||
        state.selectedBy === "byEventAndVote" ||
        state.selectedBy === "specificMkEventInfo"
      ) {
        state.isEvent = true;
      } else if (state.selectedBy === "byMk") {
        state.isByMk = true;
      }
    }

    function chosen() {
      state.isChoose = true;
    }

    async function chosenEvent() {
      if (state.selectedBy === "byEvent") {
        state.isChoose = true;
      } else if (state.selectedBy === "byEventAndVote") {
        state.isVote = true;
      } else if (state.selectedBy === "specificMkEventInfo") {
        await updateMksListByEvent();
        state.isSpecificMKEventInfo = true;
      }
    }

    async function viewAllReport() {
      state.info = "";
      let token = await VueCookies.get("token");
      console.log("viewAllReport");
      let url = `${baseUrl}/admin/report/mk-event`;
      if (state.isEvent && state.isVote) {
        url += `/by/event/and/vote?eventId=${state.selectedEvents}&vote=${state.selectedVote}&`;
      } else if (state.isEvent && state.isSpecificMKEventInfo) {
        url += `/info?mkeId=${state.selectedMkByEvent}&`;
      } else if (state.isEvent) {
        url += `/by/event?eventId=${state.selectedEvents}&`;
      } else if (state.isByMk) {
        url += `/by/mk?mkId=${state.selectedMk}&`;
      }
      url += `uuid=${token}`;
      let data = await generalGetRequest(url);
      if (state.isSpecificMKEventInfo) {
        state.info = [data];
      } else {
        state.info = data;
      }
    }

    function closeAll() {
      state.isChoose = false;
      state.isEvent = false;
      state.isVote = false;
      state.isByMk = false;
      state.isSpecificMKEventInfo = false;
    }

    async function updateEventsList() {
      state.events = await getAllEvents();
    }

    async function updateMksListByEvent() {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk-event/by/event?eventId=${state.selectedEvents}&imageIncluded=false&uuid=${token}`;
      state.mksByEvent = await generalGetRequest(url);
    }

    async function updateMksList() {
      state.mks = await getAllMks();
    }
    onMounted(async () => {
      await updateEventsList();
      await updateMksList();
    });

    return {
      state,
      findNext,
      viewAllReport,
      closeAll,
      updateEventsList,
      updateMksList,
      chosen,
      chosenEvent,
      updateMksListByEvent,
    };
  },
};
</script>

<style lang="scss" scoped>
.report-mk-event_container {
  padding: 16px;
  font-weight: bold;

  input,
  select {
    width: 25%;
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
    width: 15%;
    font-weight: bold;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>