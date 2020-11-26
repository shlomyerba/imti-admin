<template>
  <div class="event-update-description">
    <form
      class="event-update-description_form"
      @submit.prevent="eventUpdateDescription"
    >
      <div class="event-update-description_container">
        <label>Events *</label><br />
        <select
          id="ChooseParty"
          v-model="state.selectedEvents"
          @change="findOldDescription"
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

        <label>Description *</label><br />
        <input
          type="text"
          placeholder="Enter Description"
          v-model="state.description"
          required
        />

        <button>update</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { getAllEvents, generalGetRequest } from "../../../assets/apiRequest";

export default {
  name: "EventUpdateDescription",
  setup() {
    const state = reactive({
      description: "",
      selectedEvents: null,
      events: [],
    });

    async function eventUpdateDescription() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/event/update/description?eventId=${state.selectedEvents}&description=${state.description}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedEvents = null;
      state.description = "";
    }

    async function findOldDescription() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/event/info?eventId=${state.selectedEvents}&uuid=${token}`;
      let data = await generalGetRequest(url);
      state.description = data.description;
    }

    async function updateEvents() {
      state.events = await getAllEvents();
    }

    onMounted(async () => {
      await updateEvents();
    });

    return {
      state,
      eventUpdateDescription,
      updateEvents,
      findOldDescription,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.event-update-description_container {
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
