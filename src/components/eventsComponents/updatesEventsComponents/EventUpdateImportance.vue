<template>
  <div class="event-update-importance">
    <form
      class="event-update-importance_form"
      @submit.prevent="eventUpdateImportance"
    >
      <div class="event-update-importance_container">
        <label>Events *</label><br />
        <select
          id="ChooseParty"
          v-model="state.selectedEvents"
          @change="findOldImportance"
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

        <label>Importance *</label><br />
        <select
          id="chooseImportance"
          v-model="state.selectedImportance"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.Importances"
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
import { importances } from "../../../assets/importances";

export default {
  name: "EventUpdateImportance",
  setup() {
    const state = reactive({
     selectedImportance: null,
      Importances: importances,
      selectedEvents: null,
      events: [],
    });

    async function eventUpdateImportance() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/event/update/importance?eventId=${state.selectedEvents}&importance=${state.selectedImportance}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.selectedEvents = null;
        state.selectedImportance = null;
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    async function findOldImportance() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/event/info?eventId=${state.selectedEvents}&uuid=${token}`;
      let response = await axios.get(url);
      state.selectedImportance = response.data.importance;
      console.log("response", response);
    }

    async function updateEvents() {
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
    }

    onMounted(async () => {
      await updateEvents();
    });

    

    return {
      state,
      eventUpdateImportance,
      updateEvents,
      findOldImportance,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.event-update-importance_container {
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
