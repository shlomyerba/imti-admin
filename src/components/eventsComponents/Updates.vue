<template>
  <div class="event-update-controller">
    <div class="event-update-controller-panel">
      <div class="event-update-controller-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToUpdateDate"
          v-if="state.isUpdateDate"
        >
          עדכן תאריך
        </button>
        <button class="link_button" @click="goToUpdateDate" v-else>
          עדכן תאריך
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdateDescription"
          v-if="state.isUpdateDescription"
        >
          עדכן תיאור
        </button>
        <button class="link_button" @click="goToUpdateDescription" v-else>
          עדכן תיאור
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdateFounder"
          v-if="state.isUpdateFounder"
        >
          עדכן יוזם ההצעה
        </button>
        <button class="link_button" @click="goToUpdateFounder" v-else>
          עדכן יוזם ההצעה
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdateImportance"
          v-if="state.isUpdateImportance"
        >
          עדכן חשיבות
        </button>
        <button class="link_button" @click="goToUpdateImportance" v-else>
          עדכן חשיבות
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdateMessageToMks"
          v-if="state.isUpdateMessageToMks"
        >
          עדכן הודעה לח"כ
        </button>
        <button class="link_button" @click="goToUpdateMessageToMks" v-else>
          עדכן הודעה לח"כ
        </button>

        <button
          class="link_button_choose"
          @click="goUpdateStatus"
          v-if="state.isUpdateStatus"
        >
          עדכן סטטוס
        </button>
        <button class="link_button" @click="goUpdateStatus" v-else>
          עדכן סטטוס
        </button>
      </div>

      <div class="user-controller-panel_action-screen">
        <EventUpdateDate v-if="state.isUpdateDate" />
        <EventUpdateDescription v-else-if="state.isUpdateDescription" />
        <EventUpdateFounder v-else-if="state.isUpdateFounder" />
        <EventUpdateImportance v-else-if="state.isUpdateImportance" />
        <EventUpdateMessageToMks v-else-if="state.isUpdateMessageToMks" />
        <EventUpdateStatus v-else-if="state.isUpdateStatus" />
      </div>
    </div>
  </div>
</template>


<script>
import EventUpdateDate from "./updatesEventsComponents/EventUpdateDate";
import EventUpdateDescription from "./updatesEventsComponents/EventUpdateDescription";
import EventUpdateFounder from "./updatesEventsComponents/EventUpdateFounder";
import EventUpdateImportance from "./updatesEventsComponents/EventUpdateImportance";
import EventUpdateMessageToMks from "./updatesEventsComponents/EventUpdateMessageToMks";
import EventUpdateStatus from "./updatesEventsComponents/EventUpdateStatus";
import { reactive } from "vue";

export default {
  name: "Updates",
  components: {
    EventUpdateDate,
    EventUpdateDescription,
    EventUpdateFounder,
    EventUpdateImportance,
    EventUpdateMessageToMks,
    EventUpdateStatus,
  },
  setup() {
    const state = reactive({
      isUpdateDate: true,
      isUpdateDescription: false,
      isUpdateFounder: false,
      isUpdateImportance: false,
      isUpdateMessageToMks: false,
      isUpdateStatus: false,
    });

    function goToUpdateDate() {
      closeAll();
      state.isUpdateDate = true;
    }
    function goToUpdateDescription() {
      closeAll();
      state.isUpdateDescription = true;
    }
    function goToUpdateFounder() {
      closeAll();
      state.isUpdateFounder = true;
    }
    function goToUpdateImportance() {
      closeAll();
      state.isUpdateImportance = true;
    }
    function goToUpdateMessageToMks() {
      closeAll();
      state.isUpdateMessageToMks = true;
    }

    function goUpdateStatus() {
      closeAll();
      state.isUpdateStatus = true;
    }
    function closeAll() {
      state.isUpdateDate = false;
      state.isUpdateDescription = false;
      state.isUpdateFounder = false;
      state.isUpdateImportance = false;
      state.isUpdateMessageToMks = false;
      state.isUpdateStatus = false;
    }
    return {
      state,
      closeAll,
      goToUpdateDate,
      goToUpdateDescription,
      goToUpdateFounder,
      goToUpdateImportance,
      goToUpdateMessageToMks,
      goUpdateStatus,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.event-update-controller-panel_main-menu {
  // border-bottom: 2px solid gray;

  .link_button {
    color: gray;
    font-size: 15px;
  }

  .link_button_choose {
    color: gray;
    font-size: 20px;
  }
}
</style>
