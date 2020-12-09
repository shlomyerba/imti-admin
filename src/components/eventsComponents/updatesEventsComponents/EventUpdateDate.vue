<template>
  <div class="event-update-date">
    <form class="event-update-date_form" @submit.prevent="eventUpdateDate">
      <div class="event-update-date_container">
        <label>Events *</label><br />
        <select
          id="ChooseParty"
          v-model="state.selectedEvents"
          @change="findOldDate"
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

        <label>Date *</label><br />
        <input
          type="datetime-local"
          placeholder="Enter Date"
          v-model="state.date"
          required
        />

        <button>update</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { getDateFormat } from "../../../assets/getDateFormat";
import { getHourAndMinuteFormat } from "../../../assets/getDateFormat";
import { getAllEvents, generalGetRequest } from "../../../assets/apiRequest";

export default {
  name: "EventUpdateDate",
  setup() {
    const state = reactive({
      date: "",
      selectedEvents: null,
      events: [],
    });

    async function eventUpdateDate() {
      let token = VueCookies.get("adminToken");
      let timestamp = new Date(state.date).getTime();
      let url = `${baseUrl}/admin/event/update/date?eventId=${state.selectedEvents}&timestamp=${timestamp}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedEvents = null;
      state.date = "";
    }

    async function findOldDate() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/report/event/info?eventId=${state.selectedEvents}&uuid=${token}`;
      let data = await generalGetRequest(url);
      let oldDate = new Date(data.timestamp);
      state.date = `${getDateFormat(oldDate)}T${getHourAndMinuteFormat(
        oldDate
      )}`;
    }

    async function updateEvents() {
      state.events = await getAllEvents();
    }

    onMounted(async () => {
      await updateEvents();
    });

    return {
      state,
      eventUpdateDate,
      updateEvents,
      findOldDate,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.event-update-date_container {
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
</style>
