<template>
  <div class="event-update-founder">
    <form
      class="event-update-founder_form"
      @submit.prevent="eventUpdateFounder"
    >
      <div class="event-update-founder_container">
        <label>בחר הצעת חוק *</label><br />
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

        <label>עדכן יוזם הצעה *</label><br />
        <select id="chooseEvent" v-model="state.selectedFounder" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.founders"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>

        <button>עדכן</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import {
  getAllEvents,
  getAllMks,
  generalGetRequest,
} from "../../../assets/apiRequest";

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
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/event/update/founder?eventId=${state.selectedEvents}&founderMKId=${state.selectedFounder}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedEvents = null;
      state.selectedFounder = null;
    }

    async function findOldFounder() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/report/event/info?eventId=${state.selectedEvents}&uuid=${token}`;
      let data = await generalGetRequest(url);
      state.selectedFounder = data.founder.id;
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
