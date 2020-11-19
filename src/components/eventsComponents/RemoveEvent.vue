<template>
  <div class="remove-event">
    <form class="remove-event_form" @submit.prevent="removeEvent">
      <div class="remove-event_container">
        <label>Mks *</label><br />
        <select id="ChooseParty" v-model="state.selectedEvents" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.events"
            :key="index"
          >
            {{ option.title }}
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
import { baseUrl } from "../../assets/url";

export default {
  name: "RemoveMk",
  setup() {
    const state = reactive({
      selectedEvents: null,
      events: [],
    });

    async function removeEvent() {
      let token = VueCookies.get("token");

      let url = `${baseUrl}/admin/event/remove?eventId=${state.selectedEvents}&uuid=${token}`;
      console.log(url)
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
      removeEvent,
      updateEvents,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.remove-event_container {
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
