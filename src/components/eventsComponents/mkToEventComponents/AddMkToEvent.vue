<template>
  <div class="add-mk-to-event">
    <form class="add-mk-to-event_form" @submit.prevent="addMkToEvent">
      <div class="add-mk-to-event_container">
        <label>Events *</label><br />
        <select id="ChooseParty" v-model="state.selectedEvents" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.events"
            :key="index"
          >
            {{ option.title }}
          </option>
        </select>
        <label>Mks *</label><br />
        <select id="ChooseParty" v-model="state.selectedMk" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.mks"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>

        <label>Vote *</label><br />
        <select id="chooseImportance" v-model="state.selectedVotes" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.votes"
            :key="index"
          >
            {{ option.name }}
          </option>
        </select>
        <button>add</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { votes } from "../../../assets/staticOptions";
import {
  getAllEvents,
  getAllMks,
  generalGetRequest,
} from "../../../assets/apiRequest";

export default {
  name: "AddMkToEvent",
  setup() {
    const state = reactive({
      selectedEvents: null,
      events: [],
      selectedMk: null,
      mks: [],
      selectedVotes: null,
      votes: votes,
    });

    async function addMkToEvent() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/event/add/mk?eventId=${state.selectedEvents}&mkId=${state.selectedMk}&uuid=${token}&vote=${state.selectedVotes}`;
      await generalGetRequest(url);
      state.selectedEvents = null;
      state.selectedMk = null;
      state.selectedVotes = null;
    }

    onMounted(async () => {
      state.events = await getAllEvents();
    });

    onMounted(async () => {
      state.mks = await getAllMks();
    });

    return {
      state,
      addMkToEvent,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.add-mk-to-event_container {
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
