<template>
  <div class="add-new-event">
    <form class="add-new-event_form" @submit.prevent="addNewEvent">
      <div class="add-new-event_container">
        <label>Day *</label><br />
        <input
          type="number"
          placeholder="Enter Day"
          v-model="state.day"
          required
        />
        <label>Description *</label><br />
        <input
          type="text"
          placeholder="Enter Description"
          v-model="state.description"
          required
        />

        <label>FounderMk *</label><br />
        <select id="chooseEvent" v-model="state.selectedMk" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.mks"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>

        <label>Hour *</label><br />
        <input
          type="text"
          placeholder="Enter Hour"
          v-model="state.hour"
          required
        />

        <label>Importance *</label><br />
        <select
          id="chooseImportance"
          v-model="state.selectedImportance"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.Importances"
            :key="index"
          >
            {{ option.id }}
          </option>
        </select>
        <label>Min *</label><br />
        <input
          type="number"
          placeholder="Enter Min"
          v-model="state.min"
          required
        />
        <label>Month *</label><br />
        <input
          type="number"
          placeholder="Enter Month"
          v-model="state.month"
          required
        />
        <label>TextMessageToMKs *</label><br />
        <input
          type="text"
          placeholder="Enter Text Message To MKs"
          v-model="state.textMessageToMKs"
          required
        />
        <label>Title *</label><br />
        <input
          type="text"
          placeholder="Enter Title"
          v-model="state.title"
          required
        />
        <label>Year *</label><br />
        <input
          type="number"
          placeholder="Enter Year"
          v-model="state.year"
          required
        />

        <button>add</button>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../assets/url";

export default {
  name: "AddNewMk",
  setup() {
    const state = reactive({
      day: "",
      description: "",
      selectedMk: null,
      mks: [],
      hour: "",
      selectedImportance: null,
      Importances: [
        { id: "CRITICAL" },
        { id: "HIGH" },
        { id: "MEDIUM" },
        { id: "LOW" },
      ],
      min: "",
      month: "",
      textMessageToMKs: "",
      title: "",
      year: "",
    });

    async function addNewEvent() {
      let token = VueCookies.get("token");

      let url = `${baseUrl}/admin/event/new?day=${state.day}&description=${state.description}&founderMKId=${state.selectedMk}&`;
      url += `hour=${state.hour}&importance=${state.selectedImportance}&min=${state.min}&month=${state.month}&`;
      url += `textMessageToMKs=${state.textMessageToMKs}&title=${state.title}&uuid=${token}&year=${state.year}`;
      try {
        let response = await axios.get(url);
        state.day = "";
        state.description = "";
        state.selectedMk = null;
        state.hour = "";
        state.selectedImportance = null;
        state.min = "";
        state.month = "";
        state.textMessageToMKs = "";
        state.title = "";
        state.year = "";
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
          console.log(response.data);
          state.mks = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
    });

    return {
      state,
      addNewEvent,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.add-new-event_container {
  padding: 16px;
  font-weight: bold;

  input,
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
