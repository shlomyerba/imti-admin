<template>
  <div class="event-view-mk-event-all">
    <form class="event-view-mk-event-all_form">
      <div class="event-view-mk-event-all_container">
        <label>Events *</label><br />
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
    <table class="user_info">
      <tr>
        <th>Title</th>
        <th>Mk</th>
        <th>Vote</th>
      </tr>
      <tr v-for="(event, index) in state.info" :key="index">
        <td>{{ event.event.title }}</td>
        <td>{{ `${event.mk.first} ${event.mk.last}` }}</td>
        <td>{{ state.getHebrewVote(event.vote) }}</td>
      </tr>
    </table>
  </div>
</template>


<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { getHebrewVote } from "../../../assets/getHebrewVote";

export default {
  name: "EventViewMkEventAll",
  setup() {
    const state = reactive({
      selectedEvents: null,
      events: [],
      info: "",
      getHebrewVote: getHebrewVote,
    });

    async function eventViewMkEventAll() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/event/view/mk-event/all?eventId=${state.selectedEvents}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.info = response.data;
        console.log("response", response.data);
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
  font-family: arial, sans-serif;
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
