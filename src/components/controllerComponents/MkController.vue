<template>
  <div class="mk-controller">
    <div class="mk-controller-panel">
      <div class="mk-controller-panel_main-menu">
        <button class="link_button" @click="goToAddMk">add mk</button>
        <button class="link_button" @click="goToRemoveMk">remove mk</button>
        <button class="link_button" @click="goToUpdateEmail">
          update email
        </button>
        <button class="link_button" @click="goToUpdateParty">
          update party
        </button>
        <button class="link_button" @click="goToUpdatePhone">
          update phone
        </button>
        <button class="link_button" @click="goToUpdatePhoto">
          update photo
        </button>
      </div>

      <div class="mk-controller-panel_action-screen">
        <AddNewMk v-if="state.isAddMk" />
        <RemoveMk v-else-if="state.isRemoveMk" />
        <UpdateEmail v-else-if="state.isUpdateEmail" />
        <UpdateParty v-else-if="state.isUpdateParty" />
        <UpdatePhone v-else-if="state.isUpdatePhone" />
        <UpdatePhoto v-else-if="state.isUpdatePhoto" />
      </div>
    </div>
  </div>
</template>


<script>
import AddNewMk from "./mkControllerComponents/AddNewMk";
import RemoveMk from "./mkControllerComponents/RemoveMk";
import UpdateEmail from "./mkControllerComponents/UpdateEmail";
import UpdateParty from "./mkControllerComponents/UpdateParty";
import UpdatePhone from "./mkControllerComponents/UpdatePhone";
import UpdatePhoto from "./mkControllerComponents/UpdatePhoto";
import { reactive } from "vue";

export default {
  name: "MkController",
  components: {
    AddNewMk,
    RemoveMk,
    UpdateEmail,
    UpdateParty,
    UpdatePhone,
    UpdatePhoto,
  },
  setup() {
    const state = reactive({
      isAddMk: true,
      isRemoveMk: false,
      isUpdateEmail: false,
      isUpdateParty: false,
      isUpdatePhone: false,
      isUpdatePhoto: false,
    });

    function goToAddMk() {
      closeAll();
      state.isAddMk = true;
    }

    function goToRemoveMk() {
      closeAll();
      state.isRemoveMk = true;
    }
    function goToUpdateEmail() {
      closeAll();
      state.isUpdateEmail = true;
    }
    function goToUpdateParty() {
      closeAll();
      state.isUpdateParty = true;
    }
    function goToUpdatePhone() {
      closeAll();
      state.isUpdatePhone = true;
    }
    function goToUpdatePhoto() {
      closeAll();
      state.isUpdatePhoto = true;
    }

    function closeAll() {
      state.isAddMk = false;
      state.isRemoveMk = false;
      state.isUpdateEmail = false;
      state.isUpdateParty = false;
      state.isUpdatePhone = false;
      state.isUpdatePhoto = false;
    }
    return {
      state,
      closeAll,
      goToAddMk,
      goToRemoveMk,
      goToUpdateEmail,
      goToUpdateParty,
      goToUpdatePhone,
      goToUpdatePhoto,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.mk-controller-panel_main-menu {
  // border-bottom: 2px solid gray;

  .link_button {
    color: gray;
    font-size: 15px;
  }
}
</style>
