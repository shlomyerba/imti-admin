<template>
  <div class="remove-mk-from-event">
    <form class="remove-mk-from-event_form" @submit.prevent="removeMkFromEvent">
      <div class="remove-mk-from-event_container">
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
        <select id="ChooseParty" v-model="state.selectedMkByEvent" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.MksByEvent"
            :key="index"
          >
            {{ `${option.mk.first} ${option.mk.last}` }}
          </option>
        </select>
        <button>remove</button>
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
  name: "RemoveMkFromEvent",
  setup() {
    const state = reactive({
      selectedEvents: null,
      events: [],
      selectedMkByEvent: null,
      MksByEvent: [],
    });

    async function removeMkFromEvent() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/event/remove/mk?mkeId=${state.selectedMkByEvent}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.selectedEvents = "";
        console.log("response", response);
        await updateEvents();
      } catch (e) {
        console.log("e", e);
      }
    }

    async function updateEvents() {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/event/all?uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          console.log(response.data);
          state.events = response.data;
          state.MksByEvent = [];
        }
      } catch (e) {
        console.log("e", e);
      }
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

    onMounted(async () => {
      await updateEvents();
    });

    return {
      state,
      removeMkFromEvent,
      updateEvents,
      getMksByEvent,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.remove-mk-from-event_container {
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
