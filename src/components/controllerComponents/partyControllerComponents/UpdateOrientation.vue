<template>
  <div class="update-orientation">
    <form class="update-orientation_form" @submit.prevent="updateOrientation">
      <div class="update-orientation_container">
        <label>בחר מפלגה *</label><br />
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
        <label>עדכן נטייה *</label><br />
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
        <button>עדכן</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { orientations } from "../../../assets/staticOptions";
import { getAllParties, generalGetRequest } from "../../../assets/apiRequest";

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
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/party/update/orientation?orientation=${state.selectedOrientation}&partyId=${state.selectedParty}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedParty = "";
      state.selectedOrientation = "";
    }

    async function findCurrentOrientation() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/report/party/info?partyId=${state.selectedParty}&uuid=${token}`;
      let data = await generalGetRequest(url);
      state.selectedOrientation = data.orientation;
    }
    onMounted(async () => {
      state.parties = await getAllParties();
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
