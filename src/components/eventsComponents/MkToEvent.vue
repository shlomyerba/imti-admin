<template>
  <div class="mk-to-event-controller">
    <div class="mk-to-event-controller-panel">
      <div class="mk-to-event-controller-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToAddMkToEvent"
          v-if="state.isAddMkToEvent"
        >
          add mk to event
        </button>
        <button class="link_button" @click="goToAddMkToEvent" v-else>
          add mk to event
        </button>

        <button
          class="link_button_choose"
          @click="goToRemoveMkFromEvent"
          v-if="state.isRemoveMkFromEvent"
        >
          remove mk from event
        </button>
        <button class="link_button" @click="goToRemoveMkFromEvent" v-else>
          remove mk from event
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdateMkVote"
          v-if="state.isUpdateMkVote"
        >
          update vote
        </button>
        <button class="link_button" @click="goToUpdateMkVote" v-else>
          update vote
        </button>
      </div>

      <div class="user-controller-panel_action-screen">
        <AddMkToEvent v-if="state.isAddMkToEvent" />
        <RemoveMkFromEvent v-else-if="state.isRemoveMkFromEvent" />
        <EventUpdateMkVote v-else-if="state.isUpdateMkVote" />
      </div>
    </div>
  </div>
</template>


<script>
import AddMkToEvent from "./mkToEventComponents/AddMkToEvent";
import RemoveMkFromEvent from "./mkToEventComponents/RemoveMkFromEvent";
import EventUpdateMkVote from "./mkToEventComponents/EventUpdateMkVote";
import { reactive } from "vue";

export default {
  name: "MkToEvent",
  components: {
    AddMkToEvent,
    RemoveMkFromEvent,
    EventUpdateMkVote,
  },
  setup() {
    const state = reactive({
      isAddMkToEvent: true,
      isRemoveMkFromEvent: false,
      isUpdateMkVote: false,
    });

    function goToAddMkToEvent() {
      closeAll();
      state.isAddMkToEvent = true;
    }
    function goToRemoveMkFromEvent() {
      closeAll();
      state.isRemoveMkFromEvent = true;
    }
    function goToUpdateMkVote() {
      closeAll();
      state.isUpdateMkVote = true;
    }

    function closeAll() {
      state.isAddMkToEvent = false;
      state.isRemoveMkFromEvent = false;
      state.isUpdateMkVote = false;
    }
    return {
      state,
      closeAll,
      goToAddMkToEvent,
      goToRemoveMkFromEvent,
      goToUpdateMkVote,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.mk-to-event-controller-panel_main-menu {
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
