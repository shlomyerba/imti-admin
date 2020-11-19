<template>
  <div class="controller">
    <div class="controller-panel">
      <div class="controller-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToMkOptions"
          v-if="state.isMkChoose"
        >
          mk
        </button>
        <button class="link_button" @click="goToMkOptions" v-else>mk</button>

        <button
          class="link_button_choose"
          @click="goToPartyOptions"
          v-if="state.isPartyChoose"
        >
          party
        </button>
        <button class="link_button" @click="goToPartyOptions" v-else>
          party
        </button>

        <button
          class="link_button_choose"
          @click="goToUserOptions"
          v-if="state.isUserChoose"
        >
          user
        </button>
        <button class="link_button" @click="goToUserOptions" v-else>
          user
        </button>
      </div>

      <div class="controller-panel_action-screen">
        <MkController v-if="state.isMkChoose" />
        <PartyController v-else-if="state.isPartyChoose" />
        <UserController v-else-if="state.isUserChoose" />
      </div>
    </div>
  </div>
</template>


<script>
import MkController from "./controllerComponents/MkController";
import PartyController from "./controllerComponents/PartyController";
import UserController from "./controllerComponents/UserController";

import { reactive } from "vue";

export default {
  name: "Controller",
  components: { MkController, PartyController, UserController },

  setup() {
    const state = reactive({
      isMkChoose: true,
      isPartyChoose: false,
      isUserChoose: false,
    });

    function goToMkOptions() {
      closeAll();
      state.isMkChoose = true;
    }

    function goToPartyOptions() {
      closeAll();
      state.isPartyChoose = true;
    }

    function goToUserOptions() {
      closeAll();
      state.isUserChoose = true;
    }

    function closeAll() {
      state.isMkChoose = false;
      state.isPartyChoose = false;
      state.isUserChoose = false;
    }

    return {
      state,
      goToMkOptions,
      goToPartyOptions,
      goToUserOptions,
      closeAll,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.controller-panel_main-menu {
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
