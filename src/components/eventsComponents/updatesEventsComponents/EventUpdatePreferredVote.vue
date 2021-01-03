<template>
  <div class="event-update-preferred-vote">
    <form
      class="event-update-preferred-vote_form"
      @submit.prevent="eventUpdatePreferredVote"
    >
      <div class="event-update-preferred-vote_container">
        <label>בחר הצעת חוק *</label><br />
        <select
          id="ChooseParty"
          v-model="state.selectedEvents"
          @change="findOldPreferredVote"
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

        <label>עדכן הצבעה מועדפת *</label><br />
        <select
          id="choosePreferredVote"
          v-model="state.selectedPreferredVote"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.preferredVote"
            :key="index"
          >
            {{ option.name }}
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
import { preferredVote } from "../../../assets/staticOptions";
import { getAllEvents, generalGetRequest } from "../../../assets/apiRequest";

export default {
  name: "EventUpdatePreferredVote",
  setup() {
    const state = reactive({
      selectedPreferredVote: null,
      preferredVote: preferredVote,
      selectedEvents: null,
      events: [],
    });

    async function eventUpdatePreferredVote() {
      let token = VueCookies.get("adminToken");

      ///to do!!!!
      let url = `${baseUrl}/admin/event/update/preferredVote?eventId=${state.selectedEvents}&preferredVote=${state.selectedPreferredVote}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedEvents = null;
      state.selectedPreferredVote = null;
    }

    async function findOldPreferredVote() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/report/event/info?eventId=${state.selectedEvents}&uuid=${token}`;
      let data = await generalGetRequest(url);
      state.selectedPreferredVote = data.preferredVote;
    }

    async function updateEvents() {
      state.events = await getAllEvents();
    }

    onMounted(async () => {
      await updateEvents();
    });

    return {
      state,
      eventUpdatePreferredVote,
      updateEvents,
      findOldPreferredVote,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.event-update-preferred-vote_container {
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
