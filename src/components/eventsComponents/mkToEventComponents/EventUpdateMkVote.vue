<template>
  <div class="event-update-mk-vote">
    <form class="event-update-mk-vote_form" @submit.prevent="eventUpdateMkVote">
      <div class="event-update-mk-vote_container">
        <label>Events *</label><br />
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
        <label>Mks by event *</label><br />
        <select
          id="ChooseParty"
          v-model="state.selectedMkByEvent"
          @change="getOldVote"
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.MksByEvent"
            :key="index"
          >
            {{ `${option.mk.first} ${option.mk.last}` }}
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
import { votes } from "../../../assets/staticOptions";
import { getAllEvents } from "../../../assets/apiRequest";

export default {
  name: "EventUpdateMkVote",
  setup() {
    const state = reactive({
      selectedEvents: null,
      events: [],
      selectedMkByEvent: null,
      MksByEvent: [],
      selectedVotes: null,
      votes: votes,
    });

    async function eventUpdateMkVote() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/event/update/mk/vote?mkeId=${state.selectedMkByEvent}&uuid=${token}&vote=${state.selectedVotes}`;
      console.log(url);
      try {
        let response = await axios.get(url);
        state.selectedEvents = "";
        state.selectedVotes = "";
        state.selectedMkByEvent = "";
        state.MksByEvent = "";
        console.log("response", response);
        await updateEvents();
      } catch (e) {
        console.log("e", e);
      }
    }

    async function updateEvents() {
      state.events = await getAllEvents();
      state.MksByEvent = [];
    }

    async function getMksByEvent() {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk-event/by/event?eventId=${state.selectedEvents}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          console.log(response.data);
          state.MksByEvent = response.data;
        }
      } catch (e) {
        console.log("e", e);
        state.MksByEvent = [];
      }
    }

    async function getOldVote() {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk-event/info?mkeId=${state.selectedMkByEvent}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          console.log(response.data);
          state.selectedVotes = response.data.vote;
        }
      } catch (e) {
        console.log("e", e);
        state.MksByEvent = [];
      }
    }

    onMounted(async () => {
      await updateEvents();
    });

    return {
      state,
      eventUpdateMkVote,
      updateEvents,
      getMksByEvent,
      getOldVote,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.event-update-mk-vote_container {
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
</style>
