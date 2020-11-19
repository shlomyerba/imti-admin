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
            v-for="(option, index) in state.Mks"
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
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";

export default {
  name: "UpdateParty",
  setup() {
    const state = reactive({
      selectedMk: null,
      Mks: [],
      selectedParty: null,
      parties: [],
    });

    async function findCurrentParty() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk/info?imageIncluded=false&mkId=${state.selectedMk}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.selectedParty = response.data.party.id;
      } catch (e) {
        console.log("e", e);
      }
    }

    async function updateParty() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/mk/update/party?mkId=${state.selectedMk}&partyId=${state.selectedParty}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.selectedMk = "";
        state.selectedParty = "";
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    onMounted(async () => {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk/all?imageIncluded=false&uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          state.Mks = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
    });

    onMounted(async () => {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/party/all?uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          state.parties = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
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
