<template>
  <div class="remove-mk">
    <form class="remove-mk_form" @submit.prevent="removeMk">
      <div class="remove-mk_container">
        <label>בחר חבר כנסת *</label><br />
        <select id="ChooseParty" v-model="state.selectedMk" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.mks"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>
        <button>מחק</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { getAllMks, generalGetRequest } from "../../../assets/apiRequest";

export default {
  name: "RemoveMk",
  setup() {
    const state = reactive({
      selectedMk: null,
      mks: [],
    });

    async function removeMk() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/mk/remove?mkId=${state.selectedMk}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedMk = "";
      await updateMks();
    }

    async function updateMks() {
      state.mks = await getAllMks();
    }

    onMounted(async () => {
      await updateMks();
    });

    return {
      state,
      removeMk,
      updateMks,
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
