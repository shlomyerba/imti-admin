<template>
  <div class="Admin">
    <div class="admin-panel">
      <div class="admin-panel_main-menu">
        <button class="link_button" @click="goToController">Controller</button>
        <button class="link_button" @click="goToEvents">Events</button>
        <button class="link_button" @click="goToReports">Reports</button>
      </div>

      <div class="admin-panel_action-screen">
        <Controller v-if="state.isController" />
        <Events v-else-if="state.isEvents" />
        <Reports v-else-if="state.isReports" />
      </div>
    </div>
  </div>
</template>

<script>
import Controller from "../components/Controller";
import Events from "../components/Events";
import Reports from "../components/Reports";
import { reactive } from "vue";

export default {
  name: "Admin",
  components: { Controller, Events, Reports },
  setup() {
    const state = reactive({
      isController: true,
      isEvents: false,
      isReports: false,
    });

    function goToController() {
      closeAll();
      state.isController = true;
    }

    function goToEvents() {
      closeAll();
      state.isEvents = true;
    }

    function goToReports() {
      closeAll();
      state.isReports = true;
    }

    function closeAll() {
      state.isController = false;
      state.isEvents = false;
      state.isReports = false;
    }

    return {
      state,
      goToController,
      goToEvents,
      goToReports,
      closeAll
    };
  },
};
</script>


<style lang="scss" scoped>
.admin-panel {
  display: flex;
  justify-content: space-between;
  padding: 50px 2%;

  .admin-panel_main-menu {
    display: flex;
    flex-direction: column;
    width: 20%;
    padding: 10px 1%;
    border-right: 2px solid blueviolet;

    .link_button {
      color: blueviolet;
      font-size: 24px;
    }
  }

  .admin-panel_action-screen {
    width:  90%;
    display: flex;
    flex-direction: column;
    padding: 10px 10%;
  }
}
</style>