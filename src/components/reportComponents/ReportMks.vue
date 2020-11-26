<template>
  <div class="report-mk">
    <div class="report-mk_container">
      <label>Choose report by *</label><br />
      <select v-model="state.selectedBy" @change="findNext">
        <option
          :value="option.id"
          v-for="(option, index) in state.reportMkOptions"
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
        v-model="state.selectedOrientation"
        @change="chosen"
        v-else-if="state.isByOrientation"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.orientations"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <select
        v-model="state.selectedByParty"
        @change="chosen"
        v-else-if="state.isByParty"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.parties"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <select
        v-model="state.selectedMk"
        @change="chosen"
        v-else-if="state.isSpecificMkInfo"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.mks"
          :key="index"
        >
          {{ `${option.first} ${option.last}` }}
        </option>
      </select>

      <button @click="viewAllReport" v-if="state.isChoose">view</button>
    </div>
  </div>

  <div v-if="state.info">
    <table class="user_info">
      <tr>
        <th>Name</th>
        <th>Party</th>
        <th>Email</th>
        <th>Phone</th>
      </tr>
      <tr v-for="(event, index) in state.info" :key="index">
        <td>{{ `${event.first} ${event.last}` }}</td>
        <td>{{ event.party.name }}</td>
        <td>{{ event.email }}</td>
        <td>{{ event.phone }}</td>
      </tr>
    </table>
    <div class="report-mk_img" v-if="state.src">
      <img v-bind:src="state.src" />
    </div>
  </div>
</template>


<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../assets/url";
import { reportMkOptions } from "../../assets/reportsOptions";
import { orientations } from "../../assets/staticOptions";
import {
  getAllEvents,
  getAllParties,
  getAllMks,
} from "../../assets/apiRequest";

export default {
  name: "ReportMks",
  setup() {
    const state = reactive({
      isChoose: false,
      isAll: false,
      isByEvent: false,
      isByOrientation: false,
      isByParty: false,
      isSpecificMkInfo: false,
      selectedBy: null,
      reportMkOptions: reportMkOptions,
      info: "",
      selectedEvents: null,
      events: [],
      selectedOrientation: null,
      orientations: orientations,
      selectedByParty: null,
      parties: [],
      selectedMk: null,
      mks: [],
      src: null,
    });

    function findNext() {
      console.log(state.selectedBy);
      closeAll();
      if (state.selectedBy === "all") {
        state.isAll = true;
        state.isChoose = true;
      } else if (state.selectedBy === "byEvent") {
        state.isByEvent = true;
      } else if (state.selectedBy === "byOrientation") {
        state.isByOrientation = true;
      } else if (state.selectedBy === "byParty") {
        state.isByParty = true;
      } else if (state.selectedBy === "specificMkInfo") {
        state.isSpecificMkInfo = true;
      }
    }

    function chosen() {
      state.isChoose = true;
    }

    async function viewAllReport() {
      state.info = "";
      state.src = null;
      let token = await VueCookies.get("token");
      let imageIncluded = `false`;
      console.log("viewAllReport");
      let url = `${baseUrl}/admin/report/mk`;
      if (state.isAll) {
        url += "/all?";
      } else if (state.isByEvent) {
        url += `/by/event?eventId=${state.selectedEvents}&`;
      } else if (state.isByOrientation) {
        url += `/by/orientation?orientation=${state.selectedOrientation}&`;
      } else if (state.isByParty) {
        url += `/by/party?partyId=${state.selectedByParty}&`;
      } else if (state.isSpecificMkInfo) {
        url += `/info?mkId=${state.selectedMk}&`;
        imageIncluded = `true`;
      }
      url += `imageIncluded=${imageIncluded}&uuid=${token}`;
      console.log("url", url);
      try {
        let response = await axios.get(url);
        state.info = response.data;
        if (state.isSpecificMkInfo) {
          state.info = [response.data];
          state.src = `data:${response.data.photo.type};base64,${response.data.photo.picByte}`;
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
      state.isByOrientation = false;
      state.isByParty = false;
      state.isByStatus = false;
      state.isSpecificMkInfo = false;
    }

    async function updateEventsList() {
      state.events = await getAllEvents();
    }
    async function updateMksList() {
      state.mks = await getAllMks();
    }

    async function updatePartiesList() {
      state.parties = await getAllParties();
    }
    onMounted(async () => {
      await updateEventsList();
      await updateMksList();
      await updatePartiesList();
    });

    return {
      state,
      findNext,
      viewAllReport,
      closeAll,
      updateEventsList,
      updateMksList,
      updatePartiesList,
      chosen,
    };
  },
};
</script>

<style lang="scss" scoped>
.report-mk_img {
  text-align: center;
  padding-top: 20px;
  max-width: 100%;
}
.report-mk_container {
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