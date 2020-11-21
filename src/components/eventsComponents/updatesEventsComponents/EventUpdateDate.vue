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
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";

export default {
  name: "EventUpdateDate",
  setup() {
    const state = reactive({
      date: "",
      selectedEvents: null,
      events: [],
    });

    async function eventUpdateDate() {
      let token = VueCookies.get("token");
      let timestamp = new Date(state.date).getTime();
      console.log(state.date);
      console.log(new Date(state.date).getTime());
      let url = `${baseUrl}/admin/event/update/date?eventId=${state.selectedEvents}&timestamp=${timestamp}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.selectedEvents = null;
        state.date = "";
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    async function findOldDate() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/event/info?eventId=${state.selectedEvents}&uuid=${token}`;
      let response = await axios.get(url);
      let oldDate = new Date(response.data.timestamp);
      
      let min = oldDate.getMinutes();
      if (oldDate.getMinutes() < 10) {
        min = `0${oldDate.getMinutes()}`;
      }
      let hour = oldDate.getHours();
      if (oldDate.getHours() < 10) {
        hour = `0${oldDate.getHours()}`;
      }
      let day = oldDate.getDate();
      if (oldDate.getDate() < 10) {
        day = `0${oldDate.getDate()}`;
      }
      let month = oldDate.getMonth() + 1;
      if (oldDate.getMonth() + 1 < 10) {
        month = `0${oldDate.getMonth() + 1}`;
      }
      state.date = `${oldDate.getFullYear()}-${month}-${day}T${hour}:${min}`;
      console.log("response", response);
    }

    async function updateEvents() {
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
