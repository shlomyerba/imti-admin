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
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../assets/url";
import { reportMkEventOptions } from "../../assets/reportsOptions";
import { votes } from "../../assets/votes";
import { getHebrewVote } from "../../assets/getHebrewOptions";


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
        await getAllMksByEvent();
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
      console.log(url);
      try {
        let response = await axios.get(url);
        state.info = response.data;
        if (state.isSpecificMKEventInfo) {
          state.info = [response.data];
        }
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    function closeAll() {
      state.isChoose = false;
      state.isEvent = false;
      state.isVote = false;
      state.isByMk = false;
      state.isSpecificMKEventInfo = false;
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

    async function getAllMksByEvent() {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk-event/by/event?eventId=${state.selectedEvents}&imageIncluded=false&uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          console.log(response.data);
          state.mksByEvent = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
    }

    async function getAllMks() {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk/all?imageIncluded=false&uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          console.log(response.data);
          state.mks = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
    }
    onMounted(async () => {
      await getAllEvents();
      await getAllMks();
    });

    return {
      state,
      findNext,
      viewAllReport,
      closeAll,
      getAllEvents,
      getAllMks,
      chosen,
      chosenEvent,
      getAllMksByEvent,
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