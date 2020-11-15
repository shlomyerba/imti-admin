<template>
  <div class="add-new-party">
    <form class="add-new-party_form" @submit.prevent="addNewParty">
      <div class="add-new-party_container">
        <label>name *</label>
        <input
          type="name"
          placeholder="Enter party name"
          v-model="state.name"
          required
        />
        <label>orientation *</label>
        <input
          type="orientation"
          placeholder="Enter orientation"
          v-model="state.orientation"
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
import { reactive } from "vue";
import { baseUrl } from "../../../assets/url";

export default {
  name: "AddNewParty",
  setup() {
    const state = reactive({
      name: "",
      orientation: "",
    });

    async function addNewParty() {
      let token = VueCookies.get("token");

      let url = `${baseUrl}/admin/party/add?name=${state.name}&orientation=${state.orientation}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        state.name = "";
        state.orientation = "";
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
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

  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
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
