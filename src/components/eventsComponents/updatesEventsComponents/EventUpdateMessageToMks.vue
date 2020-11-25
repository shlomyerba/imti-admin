<template>
  <div class="event-update-message">
    <form
      class="event-update-message_form"
      @submit.prevent="eventUpdateMessageToMks"
    >
      <div class="event-update-message_container">
        <label>Events *</label><br />
        <select
          id="ChooseParty"
          v-model="state.selectedEvents"
          @change="findOldMessageToMks"
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

        <label>TextMessageToMKs *</label><br />
        <input
          type="text"
          placeholder="Enter Text Message To MKs"
          v-model="state.textMessageToMKs"
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
import { getAllEvents } from "../../../assets/apiRequest";

export default {
  name: "EventUpdateMessageToMks",
  setup() {
    const state = reactive({
      textMessageToMKs: "",
      selectedEvents: null,
      events: [],
    });

    async function eventUpdateMessageToMks() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/event/update/messageToMKs?eventId=${state.selectedEvents}&message=${state.textMessageToMKs}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.selectedEvents = null;
        state.textMessageToMKs = "";
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    async function findOldMessageToMks() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/event/info?eventId=${state.selectedEvents}&uuid=${token}`;
      let response = await axios.get(url);
      state.textMessageToMKs = response.data.msgToMKs;
      console.log("response", response);
    }

    async function updateEvents() {
      state.events = await getAllEvents();
    }

    onMounted(async () => {
      await updateEvents();
    });

    return {
      state,
      eventUpdateMessageToMks,
      updateEvents,
      findOldMessageToMks,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.event-update-message_container {
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
