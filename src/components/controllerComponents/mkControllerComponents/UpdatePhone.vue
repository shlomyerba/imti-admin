<template>
  <div class="update-phone">
    <form class="update-phone_form" @submit.prevent="updatePhone">
      <div class="update-phone_container">
        <label>Mks *</label><br />
        <select
          id="chooseMk"
          v-model="state.selectedMk"
          @change="findCurrentPhone"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.mks"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>
        <label>Phone *</label><br />
        <input
          type="number"
          placeholder="Enter phone number"
          v-model="state.phone"
          required
        />
        <button>update</button>
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
  name: "UpdatePhone",
  setup() {
    const state = reactive({
      selectedMk: null,
      mks: [],
      phone: "",
    });

    async function findCurrentPhone() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk/info?imageIncluded=false&mkId=${state.selectedMk}&uuid=${token}`;
      let data = await generalGetRequest(url);
      state.phone = data.phone;
    }

    async function updatePhone() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/mk/update/phone?phone=${state.phone}&mkId=${state.selectedMk}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedMk = "";
      state.phone = "";
    }

    onMounted(async () => {
      state.mks = await getAllMks();
    });

    return {
      state,
      updatePhone,
      findCurrentPhone,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.update-phone_container {
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
