<template>
  <div class="remove-party">
    <form class="remove-party_form" @submit.prevent="removeParty">
      <div class="remove-party_container">
        <label>בחר מפלגה *</label><br />
        <select id="ChooseParty" v-model="state.selectedParty" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.parties"
            :key="index"
          >
            {{ option.name }}
          </option>
        </select>
        <button>מחק</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { getAllParties, generalGetRequest } from "../../../assets/apiRequest";

export default {
  name: "RemoveParty",
  setup() {
    const state = reactive({
      selectedParty: null,
      parties: [],
    });

    async function removeParty() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/party/remove?partyId=${state.selectedParty}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedParty = "";
      await updateParties();
    }

    async function updateParties() {
      state.parties = await getAllParties();
    }

    onMounted(async () => {
      await updateParties();
    });

    return {
      state,
      removeParty,
      updateParties,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.remove-party_container {
  padding: 16px;
  font-weight: bold;

  select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  option {
    font-size: 15px;
  }
  button {
    background-color: blueviolet;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    font-weight: bold;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
