<template>
  <div class="remove-mk-from-event">
    <form class="remove-mk-from-event_form" @submit.prevent="removeMkFromEvent">
      <div class="remove-mk-from-event_container">
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
        <label>בחר חבר כנסת מתוך חברי הכנסת המשוייכים *</label><br />
        <select id="ChooseParty" v-model="state.selectedMkByEvent" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.MksByEvent"
            :key="index"
          >
            {{ `${option.mk.first} ${option.mk.last}` }}
          </option>
        </select>
        <button>הסר</button>
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
  name: "RemoveMkFromEvent",
  setup() {
    const state = reactive({
      selectedEvents: null,
      events: [],
      selectedMkByEvent: null,
      MksByEvent: [],
    });

    async function removeMkFromEvent() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/event/remove/mk?mkeId=${state.selectedMkByEvent}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedEvents = "";
      await updateEvents();
    }

    async function updateEvents() {
      state.events = await getAllEvents();
      state.MksByEvent = [];
    }

    async function getMksByEvent() {
      let token = await VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/report/mk-event/by/event?eventId=${state.selectedEvents}&uuid=${token}`;
      state.MksByEvent = await generalGetRequest(url);
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
