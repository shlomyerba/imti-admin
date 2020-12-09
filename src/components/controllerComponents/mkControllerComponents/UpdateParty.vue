<template>
  <div class="update-party">
    <form class="update-party_form" @submit.prevent="updateParty">
      <div class="update-party_container">
        <label>Mks *</label><br />
        <select
          id="chooseMk"
          v-model="state.selectedMk"
          @change="findCurrentParty"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.mks"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>
        <label>Party *</label><br />
        <select id="chooseParty" v-model="state.selectedParty" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.parties"
            :key="index"
          >
            {{ option.name }}
          </option>
        </select>
        <button>update</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import {
  getAllParties,
  getAllMks,
  generalGetRequest,
} from "../../../assets/apiRequest";

export default {
  name: "UpdateParty",
  setup() {
    const state = reactive({
      selectedMk: null,
      mks: [],
      selectedParty: null,
      parties: [],
    });

    async function findCurrentParty() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/report/mk/info?imageIncluded=false&mkId=${state.selectedMk}&uuid=${token}`;
      let data = await generalGetRequest(url);
      state.selectedParty = data.party.id;
    }

    async function updateParty() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/mk/update/party?mkId=${state.selectedMk}&partyId=${state.selectedParty}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedMk = "";
      state.selectedParty = "";
    }

    onMounted(async () => {
      state.mks = await getAllMks();
    });

    onMounted(async () => {
      state.parties = await getAllParties();
    });

    return {
      state,
      updateParty,
      findCurrentParty,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.update-party_form {
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
