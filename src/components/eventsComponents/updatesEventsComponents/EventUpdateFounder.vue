<template>
  <div class="event-update-founder">
    <form
      class="event-update-founder_form"
      @submit.prevent="eventUpdateFounder"
    >
      <div class="event-update-founder_container">
        <label>Events *</label><br />
        <select
          id="ChooseParty"
          v-model="state.selectedEvents"
          @change="findOldFounder"
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

        <label>FounderMk *</label><br />
        <select id="chooseEvent" v-model="state.selectedFounder" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.founders"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>

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
import { getAllEvents, getAllMks } from "../../../assets/apiRequest";

export default {
  name: "EventUpdateFounder",
  setup() {
    const state = reactive({
      selectedFounder: null,
      founders: [],
      selectedEvents: null,
      events: [],
    });

    async function eventUpdateFounder() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/event/update/founder?eventId=${state.selectedEvents}&founderMKId=${state.selectedFounder}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.selectedEvents = null;
        state.selectedFounder = null;
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    async function findOldFounder() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/event/info?eventId=${state.selectedEvents}&uuid=${token}`;
      let response = await axios.get(url);
      state.selectedFounder = response.data.founder.id;
      console.log("response", response);
    }

    async function updateEvents() {
      state.events = await getAllEvents();
    }

    onMounted(async () => {
      await updateEvents();
    });

    onMounted(async () => {
      state.founders = await getAllMks();
    });

    return {
      state,
      eventUpdateFounder,
      updateEvents,
      findOldFounder,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.event-update-founder_container {
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
