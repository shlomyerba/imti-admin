<template>
  <div class="user-controller">
    <div class="user-controller-panel">
      <div class="user-controller-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToRemoveUser"
          v-if="state.isRemoveUser"
        >
          מחק משתמש
        </button>
        <button class="link_button" @click="goToRemoveUser" v-else>
          מחר משתמש
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdateEmail"
          v-if="state.isUpdateUserEmail"
        >
          עדכן אימייל
        </button>
        <button class="link_button" @click="goToUpdateEmail" v-else>
          עדכן אימייל
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdateMembership"
          v-if="state.isUpdateUserMembership"
        >
          עדכן חברות
        </button>
        <button class="link_button" @click="goToUpdateMembership" v-else>
          עדכן חברות
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdatePhone"
          v-if="state.isUpdateUserPhone"
        >
          עדכן פלאפון
        </button>
        <button class="link_button" @click="goToUpdatePhone" v-else>
          עדכן פלאפון
        </button>

        <button
          class="link_button_choose"
          @click="goToViewActivity"
          v-if="state.isUserViewActivity"
        >
          פעילות משמתמש
        </button>
        <button class="link_button" @click="goToViewActivity" v-else>
          פעילות משמתמש
        </button>

        <button
          class="link_button_choose"
          @click="goToViewEvents"
          v-if="state.isUserViewEvents"
        >
          הצעות חוק
        </button>
        <button class="link_button" @click="goToViewEvents" v-else>
          הצעות חוק
        </button>

        <button
          class="link_button_choose"
          @click="goToViewInfo"
          v-if="state.isUserViewInfo"
        >
          פרטים אישיים
        </button>
        <button class="link_button" @click="goToViewInfo" v-else>
          פרטים אישיים
        </button>
      </div>

      <div class="user-controller-panel_action-screen">
        <RemoveUser v-if="state.isRemoveUser" />
        <UpdateUserEmail v-else-if="state.isUpdateUserEmail" />
        <UpdateUserMembership v-else-if="state.isUpdateUserMembership" />
        <UpdateUserPhone v-else-if="state.isUpdateUserPhone" />
        <UserViewActivity v-else-if="state.isUserViewActivity" />
        <UserViewEvents v-else-if="state.isUserViewEvents" />
        <UserViewInfo v-else-if="state.isUserViewInfo" />
      </div>
    </div>
  </div>
</template>


<script>
import RemoveUser from "./userControllerComponents/RemoveUser";
import UpdateUserEmail from "./userControllerComponents/UpdateUserEmail";
import UpdateUserMembership from "./userControllerComponents/UpdateUserMembership";
import UpdateUserPhone from "./userControllerComponents/UpdateUserPhone";
import UserViewActivity from "./userControllerComponents/UserViewActivity";
import UserViewEvents from "./userControllerComponents/UserViewEvents";
import UserViewInfo from "./userControllerComponents/UserViewInfo";
import { reactive } from "vue";

export default {
  name: "UserController",
  components: {
    RemoveUser,
    UpdateUserEmail,
    UpdateUserMembership,
    UpdateUserPhone,
    UserViewActivity,
    UserViewEvents,
    UserViewInfo,
  },
  setup() {
    const state = reactive({
      isRemoveUser: true,
      isUpdateUserEmail: false,
      isUpdateUserMembership: false,
      isUpdateUserPhone: false,
      isUserViewActivity: false,
      isUserViewEvents: false,
      isUserViewInfo: false,
    });

    function goToRemoveUser() {
      closeAll();
      state.isRemoveUser = true;
    }
    function goToUpdateEmail() {
      closeAll();
      state.isUpdateUserEmail = true;
    }
    function goToUpdateMembership() {
      closeAll();
      state.isUpdateUserMembership = true;
    }
    function goToUpdatePhone() {
      closeAll();
      state.isUpdateUserPhone = true;
    }
    function goToViewActivity() {
      closeAll();
      state.isUserViewActivity = true;
    }
    function goToViewEvents() {
      closeAll();
      state.isUserViewEvents = true;
    }
    function goToViewInfo() {
      closeAll();
      state.isUserViewInfo = true;
    }
    function closeAll() {
      state.isRemoveUser = false;
      state.isUpdateUserEmail = false;
      state.isUpdateUserMembership = false;
      state.isUpdateUserPhone = false;
      state.isUserViewActivity = false;
      state.isUserViewEvents = false;
      state.isUserViewInfo = false;
    }
    return {
      state,
      closeAll,
      goToRemoveUser,
      goToUpdateEmail,
      goToUpdateMembership,
      goToUpdatePhone,
      goToViewActivity,
      goToViewEvents,
      goToViewInfo,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.user-controller-panel_main-menu {
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
