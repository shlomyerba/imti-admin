<template>
  <div class="reports">
    <div class="reports-panel">
      <div class="reports-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToReportEvent"
          v-if="state.isReportEvent"
        >
          הצעות חוק
        </button>
        <button class="link_button" @click="goToReportEvent" v-else>
          הצעות חוק
        </button>

        <button
          class="link_button_choose"
          @click="goToReportMK"
          v-if="state.isReportMK"
        >
          חברי כנסת
        </button>
        <button class="link_button" @click="goToReportMK" v-else>
          חברי כנסת
        </button>

        <button
          class="link_button_choose"
          @click="goToReportMKEvent"
          v-if="state.isReportMKEvent"
        >
          ח"כים - הצעת חוק
        </button>
        <button class="link_button" @click="goToReportMKEvent" v-else>
          ח"כים - הצעת חוק
        </button>

        <button
          class="link_button_choose"
          @click="goToReportParty"
          v-if="state.isReportParty"
        >
          מפלגות
        </button>
        <button class="link_button" @click="goToReportParty" v-else>
          מפלגות
        </button>

        <button
          class="link_button_choose"
          @click="goToReportUser"
          v-if="state.isReportUser"
        >
          משתמשים
        </button>
        <button class="link_button" @click="goToReportUser" v-else>
          משתמשים
        </button>
      </div>

      <div class="reports-panel_action-screen">
        <ReportEvents v-if="state.isReportEvent" />
        <ReportMks v-else-if="state.isReportMK" />
        <ReportMkEvent v-else-if="state.isReportMKEvent" />
        <ReportParty v-else-if="state.isReportParty" />
        <ReportUser v-else-if="state.isReportUser" />
      </div>
    </div>
  </div>
</template>


<script>
import ReportEvents from "./reportComponents/ReportEvents";
import ReportMks from "./reportComponents/ReportMks";
import ReportMkEvent from "./reportComponents/ReportMkEvent";
import ReportParty from "./reportComponents/ReportParty";
import ReportUser from "./reportComponents/ReportUser";

import { reactive } from "vue";

export default {
  name: "Reports",
  components: {
    ReportEvents,
    ReportMks,
    ReportMkEvent,
    ReportParty,
    ReportUser,
  },
  setup() {
    const state = reactive({
      isReportEvent: true,
      isRemoveEvent: false,
      isReportMKEvent: false,
      isReportParty: false,
      isReportUser: false,
    });

    function goToReportEvent() {
      closeAll();
      state.isReportEvent = true;
    }

    function goToReportMK() {
      closeAll();
      state.isReportMK = true;
    }

    function goToReportMKEvent() {
      closeAll();
      state.isReportMKEvent = true;
    }

    function goToReportParty() {
      closeAll();
      state.isReportParty = true;
    }

    function goToReportUser() {
      closeAll();
      state.isReportUser = true;
    }
    function closeAll() {
      state.isReportEvent = false;
      state.isReportMK = false;
      state.isReportMKEvent = false;
      state.isReportParty = false;
      state.isReportUser = false;
    }

    return {
      state,
      goToReportEvent,
      goToReportMK,
      goToReportMKEvent,
      goToReportParty,
      goToReportUser,
      closeAll,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.reports-panel_main-menu {
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
