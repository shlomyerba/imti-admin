<template>
  <div class="party-controller">
    <div class="party-controller-panel">
      <div class="party-controller-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToAddParty"
          v-if="state.isAddParty"
        >
          הוסף מפלגה
        </button>
        <button class="link_button" @click="goToAddParty" v-else>
          הוסף מפלגה
        </button>
        <button
          class="link_button_choose"
          @click="goToRemoveParty"
          v-if="state.isRemoveParty"
        >
          מחק מפלגה
        </button>
        <button class="link_button" @click="goToRemoveParty" v-else>
          מחק מפלגה
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdateOrientation"
          v-if="state.isUpdateOrientation"
        >
          עדכן נטייה (אוריינטציה)
        </button>
        <button class="link_button" @click="goToUpdateOrientation" v-else>
          עדכן נטייה (אוריינטציה)
        </button>
      </div>

      <div class="party-controller-panel_action-screen">
        <AddNewParty v-if="state.isAddParty" />
        <RemoveParty v-else-if="state.isRemoveParty" />
        <UpdateOrientation v-else-if="state.isUpdateOrientation" />
      </div>
    </div>
  </div>
</template>


<script>
import AddNewParty from "./partyControllerComponents/AddNewParty";
import RemoveParty from "./partyControllerComponents/RemoveParty";
import UpdateOrientation from "./partyControllerComponents/UpdateOrientation";
import { reactive } from "vue";

export default {
  name: "PartyController",
  components: {
    AddNewParty,
    RemoveParty,
    UpdateOrientation,
  },
  setup() {
    const state = reactive({
      isAddParty: true,
      isRemoveParty: false,
      isUpdateOrientation: false,
    });

    function goToAddParty() {
      closeAll();
      state.isAddParty = true;
    }

    function goToRemoveParty() {
      closeAll();
      state.isRemoveParty = true;
    }

    function goToUpdateOrientation() {
      closeAll();
      state.isUpdateOrientation = true;
    }

    function closeAll() {
      state.isAddParty = false;
      state.isRemoveParty = false;
      state.isUpdateOrientation = false;
    }

    return {
      state,
      closeAll,
      goToAddParty,
      goToRemoveParty,
      goToUpdateOrientation,
    };
  },
};
</script>

 <style lang="scss" scoped>
.party-controller-panel_main-menu {
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