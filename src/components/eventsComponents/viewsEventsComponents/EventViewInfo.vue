<template>
  <div class="event-view-info">
    <form class="event-view-info_form">
      <div class="event-view-info_container">
        <label>Events *</label><br />
        <select
          id="ChooseEvent"
          v-model="state.selectedEvents"
          @change="eventViewInfo"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.events"
            :key="index"
          >
            {{ option.title }}
          </option>
        </select>
      </div>
    </form>
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
      <tr>
        <td>{{ state.info.title }}</td>
        <td>{{ state.info.description }}</td>
        <td>{{ state.getHebrewImportances(state.info.importance) }}</td>
        <td>{{ `${state.info.founder.first} ${state.info.founder.last}` }}</td>
        <td>{{ state.info.msgToMKs }}</td>
        <td>{{ state.getDateFormat(new Date(state.info.timestamp)) }}</td>
        <td>
          {{ state.getHourAndMinuteFormat(new Date(state.info.timestamp)) }}
        </td>
        <td>{{ state.getHebrewStatus(state.info.status) }}</td>
      </tr>
    </table>
  </div>
</template>
 

<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { getDateFormat } from "../../../assets/getDateFormat";
import { getHourAndMinuteFormat } from "../../../assets/getDateFormat";
import {
  getHebrewImportances,
  getHebrewStatus,
} from "../../../assets/getHebrewOptions";
import { getAllEvents, generalGetRequest } from "../../../assets/apiRequest";

export default {
  name: "EventViewInfo",
  setup() {
    const state = reactive({
      selectedEvents: null,
      events: [],
      info: "",
      getDateFormat: getDateFormat,
      getHourAndMinuteFormat: getHourAndMinuteFormat,
      getHebrewImportances: getHebrewImportances,
      getHebrewStatus: getHebrewStatus,
    });

    async function eventViewInfo() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/event/view/info?eventId=${state.selectedEvents}&uuid=${token}`;
      state.info = await generalGetRequest(url);
    }

    onMounted(async () => {
      state.events = await getAllEvents();
    });

    return {
      state,
      eventViewInfo,
    };
  },
};
</script>

  
<style lang="scss">
.event-view-info_container {
  padding: 16px;
  font-weight: bold;

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

th {
  border: 1px solid blueviolet;
  text-align: center;
  padding: 8px;
  background-color: blueviolet;
  color: white;
  font-size: 14px;
}

td {
  border: 1px solid blueviolet;
  text-align: center;
  padding: 8px;
  font-size: 14px;
}

tr:nth-child(even) {
  background-color: white;
  color: black;
}
</style>
