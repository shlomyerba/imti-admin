<template>
  <div class="update-email">
    <form class="update-email_form" @submit.prevent="updateEmail">
      <div class="update-email_container">
        <label>Mks *</label><br />
        <select
          id="chooseMk"
          v-model="state.selectedMk"
          @change="findCurrentEmail"
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
        <label>Email *</label><br />
        <input
          type="email"
          placeholder="Enter Email"
          v-model="state.email"
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
  name: "UpdateEmail",
  setup() {
    const state = reactive({
      selectedMk: null,
      mks: [],
      email: "",
    });

    async function findCurrentEmail() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk/info?imageIncluded=false&mkId=${state.selectedMk}&uuid=${token}`;
      let data = await generalGetRequest(url);
      state.email = data.email;
    }

    async function updateEmail() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/mk/update/email?email=${state.email}&mkId=${state.selectedMk}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedMk = "";
      state.email = "";
    }

    onMounted(async () => {
      state.mks = await getAllMks();
    });

    return {
      state,
      updateEmail,
      findCurrentEmail,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.update-email_container {
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
