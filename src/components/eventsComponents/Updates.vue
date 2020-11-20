<template>
  <div class="event-update-controller">
    <div class="event-update-controller-panel">
      <div class="event-update-controller-panel_main-menu">

        <button class="link_button_choose" @click="goToUpdateDate" v-if="state.isUpdateDate">update date</button>
        <button class="link_button" @click="goToUpdateDate" v-else>update date</button>


        <button class="link_button_choose" @click="goToUpdateDescription" v-if="state.isUpdateDescription">update description</button>
        <button class="link_button" @click="goToUpdateDescription" v-else>update description</button>


<button class="link_button_choose" @click="goToUpdateFounder" v-if="state.isUpdateFounder">update founder</button>
        <button class="link_button" @click="goToUpdateFounder" v-else>update founder</button>

<button class="link_button_choose" @click="goToUpdateImportance" v-if="state.isUpdateImportance">update importance</button>
        <button class="link_button" @click="goToUpdateImportance" v-else>update importance</button>


<button class="link_button_choose" @click="goToUpdateMessageToMks" v-if="state.isUpdateMessageToMks">update message</button>
        <button class="link_button" @click="goToUpdateMessageToMks" v-else>update message</button>


<button class="link_button_choose" @click="goToUpdateMkVote" v-if="state.isUpdateMkVote">update vote</button>
        <button class="link_button" @click="goToUpdateMkVote" v-else>update vote</button>


<button class="link_button_choose" @click="goUpdateStatus" v-if="state.isUpdateStatus">update status</button>
        <button class="link_button" @click="goUpdateStatus" v-else>update status</button>



      </div>

      <div class="user-controller-panel_action-screen">
        <EventUpdateDate v-if="state.isUpdateDate" />
        <EventUpdateDescription v-else-if="state.isUpdateDescription" />
        <EventUpdateFounder v-else-if="state.isUpdateFounder" />
        <EventUpdateImportance v-else-if="state.isUpdateImportance" />
        <EventUpdateMessageToMks v-else-if="state.isUpdateMessageToMks" />
        <EventUpdateMkVote v-else-if="state.isUpdateMkVote" />
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
import EventUpdateMkVote from "./updatesEventsComponents/EventUpdateMkVote";
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
    EventUpdateMkVote,
    EventUpdateStatus,
  },
  setup() {
    const state = reactive({
      isUpdateDate: true,
      isUpdateDescription: false,
      isUpdateFounder: false,
      isUpdateImportance: false,
      isUpdateMessageToMks: false,
      isUpdateMkVote: false,
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
    function goToUpdateMkVote() {
      closeAll();
      state.isUpdateMkVote = true;
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
      state.isUpdateMkVote = false;
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
      goToUpdateMkVote,
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
