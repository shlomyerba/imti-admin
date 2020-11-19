<template>
  <div class="Admin">
    <div class="admin-panel">
      <div class="admin-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToController"
          v-if="state.isController"
        >
          Controller
        </button>
        <button class="link_button" @click="goToController" v-else>
          Controller
        </button>

        <button
          class="link_button_choose"
          @click="goToEvents"
          v-if="state.isEvents"
        >
          Events
        </button>
        <button class="link_button" @click="goToEvents" v-else>Events</button>

        <button
          class="link_button_choose"
          @click="goToReports"
          v-if="state.isReports"
        >
          Reports
        </button>
        <button class="link_button" @click="goToReports" v-else>Reports</button>
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
import { reactive, onMounted } from "vue";
import VueCookies from "vue-cookies";

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

    //check if token is expired every 10 seconds:
    onMounted(async () => {
      setInterval(() => {
        let token = VueCookies.get("token");
        if (!token || token === "null") {
          window.location = "/login";
        }
      }, 10000);
    });

    return {
      state,
      goToController,
      goToEvents,
      goToReports,
      closeAll,
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
    border-left: 2px solid blueviolet;

    .link_button {
      color: blueviolet;
      font-size: 24px;
    }

    .link_button_choose {
      color: blueviolet;
      font-size: 35px;
    }
  }

  .admin-panel_action-screen {
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 10px 10%;
  }
}
</style>