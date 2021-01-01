<template>
  <div class="mk-controller">
    <div class="mk-controller-panel">
      <div class="mk-controller-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToAddMk"
          v-if="state.isAddMk"
        >
          הוסף ח"כ
        </button>
        <button class="link_button" @click="goToAddMk" v-else>הוסף ח"כ</button>
        <button
          class="link_button_choose"
          @click="goToRemoveMk"
          v-if="state.isRemoveMk"
        >
          מחק ח"כ
        </button>
        <button class="link_button" @click="goToRemoveMk" v-else>
          מחק ח"כ
        </button>
        <button
          class="link_button_choose"
          @click="goToUpdateEmail"
          v-if="state.isUpdateEmail"
        >
          עדכן אימייל
        </button>
        <button class="link_button" @click="goToUpdateEmail" v-else>
          עדכן אימייל
        </button>
        <button
          class="link_button_choose"
          @click="goToUpdateParty"
          v-if="state.isUpdateParty"
        >
          עדכן מפלגה
        </button>
        <button class="link_button" @click="goToUpdateParty" v-else>
          עדכן מפלגה
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdatePhone"
          v-if="state.isUpdatePhone"
        >
          עדכן פלאפון
        </button>
        <button class="link_button" @click="goToUpdatePhone" v-else>
          עדכן פלאפון
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdatePhoto"
          v-if="state.isUpdatePhoto"
        >
          עדכן תמונה
        </button>
        <button class="link_button" @click="goToUpdatePhoto" v-else>
          עדכן תמונה
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

  .link_button_choose {
    color: gray;
    font-size: 20px;
  }
}
</style>
