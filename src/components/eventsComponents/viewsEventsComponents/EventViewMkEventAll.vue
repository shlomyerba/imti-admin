<template>
  <div class="event-view-mk-event-all">
    <form class="event-view-mk-event-all_form">
      <div class="event-view-mk-event-all_container">
        <label>בחר הצעת חוק *</label><br />
        <select
          id="ChooseEvent"
          v-model="state.selectedEvents"
          @change="eventViewMkEventAll"
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
      </div>
    </form>
  </div>
  <div v-if="state.info">
    <MkEventTable v-bind:info="state.info" />
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { getAllEvents, generalGetRequest } from "../../../assets/apiRequest";
import MkEventTable from "../../commonHtml/MkEventTable";

export default {
  name: "EventViewMkEventAll",
  components: { MkEventTable },
  setup() {
    const state = reactive({
      selectedEvents: null,
      events: [],
      info: "",
    });

    async function eventViewMkEventAll() {
      state.info = "";
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/event/view/mk-event/all?eventId=${state.selectedEvents}&uuid=${token}`;
      state.info = await generalGetRequest(url);
    }

    onMounted(async () => {
      state.events = await getAllEvents();
    });

    return {
      state,
      eventViewMkEventAll,
    };
  },
};
</script>

  
<style lang="scss">
.event-view-mk-event-all_container {
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
table {
  // font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th {
  border: 1px solid blueviolet;
  text-align: center;
  padding: 8px;
  background-color: blueviolet;
  color: white;
  font-size: 14px;
}

td {
  border: 1px solid blueviolet;
  text-align: center;
  padding: 8px;
  font-size: 14px;
}

tr:nth-child(even) {
  background-color: white;
  color: black;
}
</style>
