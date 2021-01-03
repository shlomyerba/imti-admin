<template>
  <div class="event-update-status">
    <form class="event-update-status_form" @submit.prevent="eventUpdateStatus">
      <div class="event-update-status_container">
        <label>בחר הצעת חוק *</label><br />
        <select
          id="ChooseParty"
          v-model="state.selectedEvents"
          @change="findOldStatus"
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

        <label>עדכן סטטוס *</label><br />
        <select id="chooseImportance" v-model="state.selectedStatus" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.statuses"
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
import { status } from "../../../assets/staticOptions";
import { getAllEvents, generalGetRequest } from "../../../assets/apiRequest";

export default {
  name: "EventUpdateStatus",
  setup() {
    const state = reactive({
      selectedStatus: null,
      statuses: status,
      selectedEvents: null,
      events: [],
    });

    async function eventUpdateStatus() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/event/update/status?eventId=${state.selectedEvents}&status=${state.selectedStatus}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedEvents = null;
      state.selectedStatus = null;
    }

    async function findOldStatus() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/report/event/info?eventId=${state.selectedEvents}&uuid=${token}`;
      let data = await generalGetRequest(url);
      state.selectedStatus = data.status;
    }

    async function updateEvents() {
      state.events = await getAllEvents();
    }

    onMounted(async () => {
      await updateEvents();
    });

    return {
      state,
      eventUpdateStatus,
      updateEvents,
      findOldStatus,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.event-update-status_container {
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
