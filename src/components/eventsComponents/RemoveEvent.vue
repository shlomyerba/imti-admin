<template>
  <div class="remove-event">
    <form class="remove-event_form" @submit.prevent="removeEvent">
      <div class="remove-event_container">
        <label>בחר הצעת חוק *</label><br />
        <select id="ChooseEvent" v-model="state.selectedEvents" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.events"
            :key="index"
          >
            {{ option.title }}
          </option>
        </select>
        <button>מחק</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../assets/url";
import { getAllEvents, generalGetRequest } from "../../assets/apiRequest";

export default {
  name: "RemoveEvent",
  setup() {
    const state = reactive({
      selectedEvents: null,
      events: [],
    });

    async function removeEvent() {
      let token = VueCookies.get("adminToken");

      let url = `${baseUrl}/admin/event/remove?eventId=${state.selectedEvents}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedEvents = "";
      state.events = await getAllEvents();
    }

    onMounted(async () => {
      state.events = await getAllEvents();
    });

    return {
      state,
      removeEvent,
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
