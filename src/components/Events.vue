<template>
  <div class="events">
    <div class="events-panel">
      <div class="events-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToNewEvent"
          v-if="state.isNewEvent"
        >
          יצירת הצעה חדשה
        </button>
        <button class="link_button" @click="goToNewEvent" v-else>
          יצירת הצעה חדשה
        </button>

        <button
          class="link_button_choose"
          @click="goToRemoveEvent"
          v-if="state.isRemoveEvent"
        >
          מחק הצעה
        </button>
        <button class="link_button" @click="goToRemoveEvent" v-else>
          מחק הצעה
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdates"
          v-if="state.isUpdates"
        >
          עדכן פרטים
        </button>
        <button class="link_button" @click="goToUpdates" v-else>
          עדכן פרטים
        </button>

        <button
          class="link_button_choose"
          @click="goToMkToEvent"
          v-if="state.isMkToEvent"
        >
          שיוך ח"כ להצעה
        </button>
        <button class="link_button" @click="goToMkToEvent" v-else>
          שיוך ח"כ להצעה
        </button>

        <button
          class="link_button_choose"
          @click="goToViews"
          v-if="state.isViews"
        >
          דוחות הצעות חוק
        </button>
        <button class="link_button" @click="goToViews" v-else>
          דוחות הצעות חוק
        </button>
      </div>

      <div class="controller-panel_action-screen">
        <AddNewEvent v-if="state.isNewEvent" />
        <RemoveEvent v-else-if="state.isRemoveEvent" />
        <MkToEvent v-else-if="state.isMkToEvent" />
        <Updates v-else-if="state.isUpdates" />
        <Views v-else-if="state.isViews" />
      </div>
    </div>
  </div>
</template>


<script>
import AddNewEvent from "./eventsComponents/AddNewEvent";
import RemoveEvent from "./eventsComponents/RemoveEvent";
import MkToEvent from "./eventsComponents/MkToEvent";
import Updates from "./eventsComponents/Updates";
import Views from "./eventsComponents/Views";

import { reactive } from "vue";

export default {
  name: "Events",
  components: {
    AddNewEvent,
    RemoveEvent,
    MkToEvent,
    Updates,
    Views,
  },
  setup() {
    const state = reactive({
      isNewEvent: true,
      isRemoveEvent: false,
      isMkToEvent: false,
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

    function goToMkToEvent() {
      closeAll();
      state.isMkToEvent = true;
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
      state.isMkToEvent = false;
      state.isUpdates = false;
      state.isViews = false;
    }

    return {
      state,
      goToNewEvent,
      goToRemoveEvent,
      goToMkToEvent,
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
