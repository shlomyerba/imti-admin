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
            v-for="(option, index) in state.Mks"
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
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { votes } from "../../../assets/staticOptions";

export default {
  name: "AddMkToEvent",
  setup() {
    const state = reactive({
      selectedEvents: null,
      events: [],
      selectedMk: null,
      Mks: [],
      selectedVotes: null,
      votes: votes,
    });

    async function addMkToEvent() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/event/add/mk?eventId=${state.selectedEvents}&mkId=${state.selectedMk}&uuid=${token}&vote=${state.selectedVotes}`;
      try {
        let response = await axios.get(url);
        state.selectedEvents = null;
        state.selectedMk = null;
        state.selectedVotes = null;

        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    onMounted(async () => {
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
    });

    onMounted(async () => {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk/all?imageIncluded=false&uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          console.log(response.data);
          state.Mks = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
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
