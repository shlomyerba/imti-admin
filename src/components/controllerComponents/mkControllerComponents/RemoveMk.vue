<template>
  <div class="remove-mk">
    <form class="remove-mk_form" @submit.prevent="removeMk">
      <div class="remove-mk_container">
        <label>Mks *</label>
        <select id="ChooseParty" v-model="state.selectedMk" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.Mks"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>
        <button>remove</button>
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
  name: "RemoveMk",
  setup() {
    const state = reactive({
      selectedMk: null,
      Mks: [],
    });

    async function removeMk() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/mk/remove?mkId=${state.selectedMk}&uuid=${token}`;
      try {
        let response = await axios.get(url);

        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    onMounted(async () => {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk/all?imageIncluded=false&uuid=${token}`;
      console.log(url);
      try {
        let response = await axios.get(url);
        console.log(response);
        if (response.data) {
          state.Mks = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
    });

    return {
      state,
      removeMk,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.remove-mk_container {
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
