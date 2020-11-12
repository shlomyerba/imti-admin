<template>
  <div class="controller">
    <div class="controller-panel">
      <div class="controller-panel_main-menu">
        <button class="link_button" @click="goToMkOptions">mk</button>
        <button class="link_button" @click="goToPartyOptions">party</button>
        <button class="link_button" @click="goToUserOptions">user</button>
      </div>

      <div class="controller-panel_action-screen">
        <MkController v-if="state.isMk" />
        <PartyController v-else-if="state.isParty" />
        <UserController v-else-if="state.isUser" />
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
      isMk: true,
      isParty: false,
      isUser: false,
    });

    function goToMkOptions() {
      closeAll();
      state.isMk = true;
    }

    function goToPartyOptions() {
      closeAll();
      state.isParty = true;
    }

    function goToUserOptions() {
      closeAll();
      state.isUser = true;
    }

    function closeAll() {
      state.isMk = false;
      state.isParty = false;
      state.isUser = false;
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
    font-size: 24px;
  }
}
</style>
