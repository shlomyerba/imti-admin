<template>
  <div class="report-party">
    <div class="report-party_container">
      <label>Choose report by *</label><br />
      <select v-model="state.selectedBy" @change="findNext">
        <option
          :value="option.id"
          v-for="(option, index) in state.reportPartyOptions"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <select
        v-model="state.selectedByOrientation"
        @change="chosen"
        v-if="state.isByOrientation"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.orientations"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <select
        v-model="state.selectedParty"
        @change="chosen"
        v-else-if="state.isSpecificPartyInfo"
      >
        <option
          :value="option.id"
          v-for="(option, index) in state.parties"
          :key="index"
        >
          {{ option.name }}
        </option>
      </select>

      <button @click="viewAllReport" v-if="state.isChoose">view</button>
    </div>
  </div>

  <div v-if="state.info">
    <PartyTable v-bind:info="state.info" />
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../assets/url";
import { reportPartyOptions } from "../../assets/reportsOptions";
import { orientations } from "../../assets/staticOptions";
import { getHebrewOrientation } from "../../assets/getHebrewOptions";
import { getAllParties, generalGetRequest } from "../../assets/apiRequest";
import PartyTable from "../commonHtml/PartyTable";

export default {
  name: "ReportParty",
  components: { PartyTable },
  setup() {
    const state = reactive({
      isChoose: false,
      isAll: false,
      isByOrientation: false,
      isSpecificPartyInfo: false,
      selectedBy: null,
      reportPartyOptions: reportPartyOptions,
      getHebrewOrientation: getHebrewOrientation,
      info: "",
      selectedParty: null,
      parties: [],
      selectedByOrientation: null,
      orientations: orientations,
    });

    function findNext() {
      console.log(state.selectedBy);
      closeAll();
      if (state.selectedBy === "all") {
        state.isAll = true;
        state.isChoose = true;
      } else if (state.selectedBy === "byOrientation") {
        state.isByOrientation = true;
      } else if (state.selectedBy === "specificPartyInfo") {
        state.isSpecificPartyInfo = true;
      }
    }

    function chosen() {
      state.isChoose = true;
    }

    async function viewAllReport() {
      state.info = "";
      let token = await VueCookies.get("token");
      console.log("viewAllReport");
      let url = `${baseUrl}/admin/report/party`;
      if (state.isAll) {
        url += "/all?";
      } else if (state.isByOrientation) {
        url += `/by/orientation?orientation=${state.selectedByOrientation}&`;
      } else if (state.isSpecificPartyInfo) {
        url += `/info?partyId=${state.selectedParty}&`;
      }
      url += `uuid=${token}`;
      let data = await generalGetRequest(url);
      if (state.isSpecificPartyInfo) {
        state.info = [data];
      } else {
        state.info = data;
      }
    }

    function closeAll() {
      state.isChoose = false;
      state.isAll = false;
      state.isByOrientation = false;
      state.isSpecificPartyInfo = false;
    }

    onMounted(async () => {
      state.parties = await getAllParties();
    });

    return {
      state,
      findNext,
      viewAllReport,
      closeAll,
      chosen,
    };
  },
};
</script>

<style lang="scss" scoped>
.report-party_container {
  padding: 16px;
  font-weight: bold;

  input,
  select {
    width: 30%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-left: 3%;
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
    width: 20%;
    font-weight: bold;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>