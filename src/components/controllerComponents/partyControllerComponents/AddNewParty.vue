<template>
  <div class="add-new-party">
    <form class="add-new-party_form" @submit.prevent="addNewParty">
      <div class="add-new-party_container">
        <label>name *</label><br />
        <input
          type="name"
          placeholder="Enter party name"
          v-model="state.name"
          required
        />
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
        <button>add</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive } from "vue";
import { baseUrl } from "../../../assets/url";
import { orientations } from "../../../assets/staticOptions";
import { generalGetRequest } from "../../../assets/apiRequest";

export default {
  name: "AddNewParty",
  setup() {
    const state = reactive({
      name: "",
      selectedOrientation: null,
      Orientations: orientations,
    });

    async function addNewParty() {
      let token = VueCookies.get("adminToken");

      let url = `${baseUrl}/admin/party/add?name=${state.name}&orientation=${state.selectedOrientation}&uuid=${token}`;
      await generalGetRequest(url);
      state.name = "";
      state.selectedOrientation = "";
    }

    return {
      state,
      addNewParty,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.add-new-party_container {
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
