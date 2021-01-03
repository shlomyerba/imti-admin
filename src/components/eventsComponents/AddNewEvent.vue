<template>
  <div class="add-new-event">
    <form class="add-new-event_form" @submit.prevent="addNewEvent">
      <div class="add-new-event_container">
        <label>כותרת *</label><br />
        <input type="text" v-model="state.title" required />
        <label>תיאור *</label><br />
        <input type="text" v-model="state.description" required />
        <label>תאריך ושעה *</label><br />
        <input type="datetime-local" v-model="state.date" required />

        <label>יוזם ההצעה *</label><br />
        <select id="chooseEvent" v-model="state.selectedMk" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.mks"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>

        <label>חשיבות *</label><br />
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
            {{ option.name }}
          </option>
        </select>

        <label>הצבעה מועדפת *</label><br />
        <select
          id="chooseImportance"
          v-model="state.selectedPreferredVote"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.preferredVote"
            :key="index"
          >
            {{ option.name }}
          </option>
        </select>

        <label>הודעה לחברי כנסת *</label><br />
        <input type="text" v-model="state.textMessageToMKs" required />
        <button>הוסף</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../assets/url";
import { importances, preferredVote } from "../../assets/staticOptions";
import { getAllMks, generalGetRequest } from "../../assets/apiRequest";

export default {
  name: "AddNewMk",
  setup() {
    const state = reactive({
      description: "",
      selectedMk: null,
      mks: [],
      selectedImportance: null,
      Importances: importances,
      textMessageToMKs: "",
      title: "",
      date: "",
      selectedPreferredVote:null,
      preferredVote: preferredVote,
    });

    async function addNewEvent() {
      let token = VueCookies.get("adminToken");
      let timestamp = new Date(state.date).getTime();

      let url = `${baseUrl}/admin/event/new?description=${state.description}&founderMKId=${state.selectedMk}&`;
      url += `importance=${state.selectedImportance}&preferredVote=${state.selectedPreferredVote}&textMessageToMKs=${state.textMessageToMKs}&`;
      url += `timestamp=${timestamp}&title=${state.title}&uuid=${token}`;
      console.log(url)
      await generalGetRequest(url);
      state.description = "";
      state.selectedMk = null;
      state.selectedImportance = null;
      state.textMessageToMKs = "";
      state.title = "";
      state.date = "";
    }

    onMounted(async () => {
      state.mks = await getAllMks();
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
