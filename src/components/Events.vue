<template>
  <div class="events">
    <div class="events-panel">
      <div class="events-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToNewEvent"
          v-if="state.isNewEvent"
        >
          new event
        </button>
        <button class="link_button" @click="goToNewEvent" v-else>
          new event
        </button>

        <button
          class="link_button_choose"
          @click="goToRemoveEvent"
          v-if="state.isRemoveEvent"
        >
          remove event
        </button>
        <button class="link_button" @click="goToRemoveEvent" v-else>
          remove event
        </button>

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
          remove mk event
        </button>
        <button class="link_button" @click="goToRemoveMkFromEvent" v-else>
          remove mk event
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdates"
          v-if="state.isUpdates"
        >
          updates
        </button>
        <button class="link_button" @click="goToUpdates" v-else>updates</button>

        <button
          class="link_button_choose"
          @click="goToViews"
          v-if="state.isViews"
        >
          views
        </button>
        <button class="link_button" @click="goToViews" v-else>views</button>
      </div>

      <div class="controller-panel_action-screen">
        <AddNewEvent v-if="state.isNewEvent" />
        <RemoveEvent v-else-if="state.isRemoveEvent" />
        <AddMkToEvent v-else-if="state.isAddMkToEvent" />
        <RemoveMkFromEvent v-else-if="state.isRemoveMkFromEvent" />
        <Updates v-else-if="state.isUpdates" />
        <Views v-else-if="state.isViews" />
      </div>
    </div>
  </div>
</template>


<script>
import AddNewEvent from "./eventsComponents/AddNewEvent";
import RemoveEvent from "./eventsComponents/RemoveEvent";
import AddMkToEvent from "./eventsComponents/AddMkToEvent";
import RemoveMkFromEvent from "./eventsComponents/RemoveMkFromEvent";
import Updates from "./eventsComponents/Updates";
import Views from "./eventsComponents/Views";

import { reactive } from "vue";

export default {
  name: "Events",
  components: {
    AddNewEvent,
    RemoveEvent,
    AddMkToEvent,
    RemoveMkFromEvent,
    Updates,
    Views,
  },
  setup() {
    const state = reactive({
      isNewEvent: true,
      isRemoveEvent: false,
      isAddMkToEvent: false,
      isRemoveMkFromEvent: false,
      isUpdates: false,
      isViews: false,
    });

    function goToNewEvent() {
      closeAll();
      state.isNewEvent = true;
    }

    function goToRemoveEvent() {
      closeAll();
      state.isRemoveEvent = true;
    }

    function goToAddMkToEvent() {
      closeAll();
      state.isAddMkToEvent = true;
    }

    function goToRemoveMkFromEvent() {
      closeAll();
      state.isRemoveMkFromEvent = true;
    }

    function goToUpdates() {
      closeAll();
      state.isUpdates = true;
    }

    function goToViews() {
      closeAll();
      state.isViews = true;
    }
    function closeAll() {
      state.isNewEvent = false;
      state.isRemoveEvent = false;
      state.isAddMkToEvent = false;
      state.isRemoveMkFromEvent = false;
      state.isUpdates= false;
      state.isViews= false;
    }

    return {
      state,
      goToNewEvent,
      goToRemoveEvent,
      goToAddMkToEvent,
      goToRemoveMkFromEvent,
      goToUpdates,
      goToViews,
      closeAll,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.events-panel_main-menu {
  border-bottom: double;

  .link_button {
    color: gray;
    font-size: 18px;
  }
  .link_button_choose {
    color: gray;
    font-size: 30px;
  }
}
</style>
