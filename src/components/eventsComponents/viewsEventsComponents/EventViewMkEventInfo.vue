<template>
  <div class="event-view-mk-event-info">
    <form
      class="event-view-mk-event-info_form"
      @submit.prevent="eventViewMkEventInfo"
    >
      <div class="event-view-mk-event-info_container">
        <label>בחר הצעת חוק *</label><br />
        <select
          id="ChooseParty"
          v-model="state.selectedEvents"
          @change="getMksByEvent"
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
        <label>בחר חבר כנסת *</label><br />
        <select id="ChooseParty" v-model="state.selectedMkByEvent">
          <option
            :value="option.id"
            v-for="(option, index) in state.MksByEvent"
            :key="index"
          >
            {{ `${option.mk.first} ${option.mk.last}` }}
          </option>
        </select>
        <button>הצג</button>
      </div>
    </form>
  </div>
  <div v-if="state.info">
    <MkEventTable v-bind:info="state.info" />
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { getHebrewVote } from "../../../assets/getHebrewOptions";
import { getAllEvents, generalGetRequest } from "../../../assets/apiRequest";
import MkEventTable from "../../commonHtml/MkEventTable";

export default {
  name: "EventViewMkEventInfo",
  components: { MkEventTable },
  setup() {
    const state = reactive({
      selectedEvents: null,
      events: [],
      selectedMkByEvent: null,
      MksByEvent: [],
      info: "",
      getHebrewVote: getHebrewVote,
    });

    async function eventViewMkEventInfo() {
      state.info = "";
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/event/view/mk-event/info?mkeId=${state.selectedMkByEvent}&uuid=${token}`;
      state.info = [await generalGetRequest(url)];
    }

    async function getMksByEvent() {
      let token = await VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/report/mk-event/by/event?eventId=${state.selectedEvents}&uuid=${token}`;
      state.MksByEvent = await generalGetRequest(url);
    }

    onMounted(async () => {
      state.events = await getAllEvents();
    });

    return {
      state,
      eventViewMkEventInfo,
      getMksByEvent,
    };
  },
};
</script>

  
<style lang="scss">
.event-view-mk-event-info_container {
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
  // font-family: arial, sans-serif;
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
