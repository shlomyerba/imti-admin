<template>
  <div class="update-orientation">
    <form class="update-orientation_form" @submit.prevent="updateOrientation">
      <div class="update-orientation_container">
        <label>Parties *</label><br />
        <select
          id="ChooseParty"
          v-model="state.selectedParty"
          @change="findCurrentOrientation"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.parties"
            :key="index"
          >
            {{ option.name }}
          </option>
        </select>
        <label>Orientation *</label><br />
        <select
          id="ChooseOrientation"
          v-model="state.selectedOrientation"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.Orientations"
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
import { orientations } from "../../../assets/staticOptions";

export default {
  name: "UpdateOrientation",
  setup() {
    const state = reactive({
      selectedParty: null,
      parties: [],
      selectedOrientation: null,
      Orientations: orientations,
    });

    async function updateOrientation() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/party/update/orientation?orientation=${state.selectedOrientation}&partyId=${state.selectedParty}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.selectedParty = "";
        state.selectedOrientation = "";
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    async function findCurrentOrientation() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/party/info?partyId=${state.selectedParty}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.selectedOrientation = response.data.orientation;
      } catch (e) {
        console.log("e", e);
      }
    }
    onMounted(async () => {
      let token = VueCookies.get("token");
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
      updateOrientation,
      findCurrentOrientation,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.update-orientation_container {
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
