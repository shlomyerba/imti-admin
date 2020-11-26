<template>
  <div class="report-event">
    <div class="report-event_container">
      <label>Choose report by *</label><br />
      <select v-model="state.selectedBy" @change="findNext">
        <option
          :value="option.id"
          v-for="(option, index) in state.reportEventOptions"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <input
        v-model="state.timestamp"
        type="date"
        @change="chosen"
        v-if="state.isByDate"
      />

      <select
        v-model="state.selectedMk"
        @change="chosen"
        v-else-if="state.isByFounder"
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
        v-model="state.selectedByImportances"
        @change="chosen"
        v-else-if="state.isByImportance"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.importances"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <select
        v-model="state.selectedStatus"
        @change="chosen"
        v-else-if="state.isByStatus"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.statuses"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <select
        v-model="state.selectedEvents"
        @change="chosen"
        v-else-if="state.isSpecificEventInfo"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.events"
          :key="index"
        >
          {{ option.title }}
        </option>
      </select>

      <button @click="viewAllReport" v-if="state.isChoose">view</button>
    </div>
  </div>

  <div v-if="state.info">
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
</template>


<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../assets/url";
import { reportEventOptions } from "../../assets/reportsOptions";
import { importances, status } from "../../assets/staticOptions";
import { getDateFormat } from "../../assets/getDateFormat";
import { getHourAndMinuteFormat } from "../../assets/getDateFormat";
import {
  getHebrewImportances,
  getHebrewStatus,
} from "../../assets/getHebrewOptions";
import { getAllEvents, getAllMks } from "../../assets/apiRequest";

export default {
  name: "ReportEvent",
  setup() {
    const state = reactive({
      isChoose: false,
      isAll: false,
      isByDate: false,
      isByFounder: false,
      isByImportance: false,
      isByStatus: false,
      isSpecificEventInfo: false,
      selectedBy: null,
      reportEventOptions: reportEventOptions,
      getDateFormat: getDateFormat,
      getHourAndMinuteFormat: getHourAndMinuteFormat,
      getHebrewImportances: getHebrewImportances,
      getHebrewStatus: getHebrewStatus,
      info: "",
      timestamp: "",
      selectedMk: null,
      mks: [],
      selectedByImportances: null,
      importances: importances,
      selectedStatus: null,
      statuses: status,
      selectedEvents: null,
      events: [],
    });

    function findNext() {
      console.log(state.selectedBy);
      closeAll();
      if (state.selectedBy === "all") {
        state.isAll = true;
        state.isChoose = true;
      } else if (state.selectedBy === "byDate") {
        state.isByDate = true;
      } else if (state.selectedBy === "byFounder") {
        state.isByFounder = true;
      } else if (state.selectedBy === "byImportance") {
        state.isByImportance = true;
      } else if (state.selectedBy === "byStatus") {
        state.isByStatus = true;
      } else if (state.selectedBy === "specificEventInfo") {
        state.isSpecificEventInfo = true;
      }
    }

    function chosen() {
      state.isChoose = true;
    }

    async function viewAllReport() {
      state.info = "";
      let token = await VueCookies.get("token");
      console.log("viewAllReport");
      let url = `${baseUrl}/admin/report/event`;
      if (state.isAll) {
        url += "/all?";
      } else if (state.isByDate) {
        url += `/by/date?timestamp=${new Date(state.timestamp).getTime()}&`;
      } else if (state.isByFounder) {
        url += `/by/founder?founderMKId=${state.selectedMk}&`;
      } else if (state.isByImportance) {
        url += `/by/importance?importance=${state.selectedByImportances}&`;
      } else if (state.isByStatus) {
        url += `/by/status?status=${state.selectedStatus}&`;
      } else if (state.isSpecificEventInfo) {
        url += `/info?eventId=${state.selectedEvents}&`;
      }
      url += `uuid=${token}`;
      console.log(url);
      try {
        let response = await axios.get(url);
        state.info = response.data;
        if (state.isSpecificEventInfo) {
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
      state.isByDate = false;
      state.isByFounder = false;
      state.isByImportance = false;
      state.isByStatus = false;
      state.isSpecificEventInfo = false;
    }

    async function updateEventsList() {
      state.events = await getAllEvents();
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
    };
  },
};
</script>

<style lang="scss" scoped>
.report-event_container {
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