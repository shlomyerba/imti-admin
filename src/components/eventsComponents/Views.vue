<template>
  <div class="event-view-controller">
    <div class="event-view-controller-panel">
      <div class="event-view-controller-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToViewInfo"
          v-if="state.isViewInfo"
        >
          פרטי הצעה
        </button>
        <button class="link_button" @click="goToViewInfo" v-else>
          פרטי הצעה
        </button>

        <button
          class="link_button_choose"
          @click="goToViewMkEventAll"
          v-if="state.isViewMkEventAll"
        >
          הצג ח"כים המשוייכים להצעה
        </button>
        <button class="link_button" @click="goToViewMkEventAll" v-else>
          הצג ח"כים המשוייכים להצעה
        </button>

        <button
          class="link_button_choose"
          @click="goToViewMkEventInfo"
          v-if="state.isViewMkEventInfo"
        >
          הצג שיוך ח"כ ספציפי להצעה
        </button>
        <button class="link_button" @click="goToViewMkEventInfo" v-else>
          הצג שיוך ח"כ ספציפי להצעה
        </button>
      </div>

      <div class="user-controller-panel_action-screen">
        <EventViewInfo v-if="state.isViewInfo" />
        <EventViewMkEventAll v-else-if="state.isViewMkEventAll" />
        <EventViewMkEventInfo v-else-if="state.isViewMkEventInfo" />
      </div>
    </div>
  </div>
</template>


<script>
import EventViewInfo from "./viewsEventsComponents/EventViewInfo";
import EventViewMkEventAll from "./viewsEventsComponents/EventViewMkEventAll";
import EventViewMkEventInfo from "./viewsEventsComponents/EventViewMkEventInfo";

import { reactive } from "vue";

export default {
  name: "Views",
  components: {
    EventViewInfo,
    EventViewMkEventAll,
    EventViewMkEventInfo,
  },
  setup() {
    const state = reactive({
      isViewInfo: true,
      isViewMkEventAll: false,
      isViewMkEventInfo: false,
    });

    function goToViewInfo() {
      closeAll();
      state.isViewInfo = true;
    }
    function goToViewMkEventAll() {
      closeAll();
      state.isViewMkEventAll = true;
    }
    function goToViewMkEventInfo() {
      closeAll();
      state.isViewMkEventInfo = true;
    }

    function closeAll() {
      state.isViewInfo = false;
      state.isViewMkEventAll = false;
      state.isViewMkEventInfo = false;
    }
    return {
      state,
      closeAll,
      goToViewInfo,
      goToViewMkEventAll,
      goToViewMkEventInfo,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.event-view-controller-panel_main-menu {
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
