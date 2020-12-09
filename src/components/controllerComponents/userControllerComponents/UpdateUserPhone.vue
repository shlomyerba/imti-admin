<template>
  <div class="update-phone">
    <form class="update-phone_form" @submit.prevent="updatePhone">
      <div class="update-phone_container">
        <label>Users *</label><br />
        <select
          id="chooseMk"
          v-model="state.selectedUser"
          @change="findCurrentPhone"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.users"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>
        <label>Phone *</label><br />
        <input
          type="phone"
          placeholder="Enter Phone"
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
import { getAllUsers, generalGetRequest } from "../../../assets/apiRequest";

export default {
  name: "UpdatePhone",
  setup() {
    const state = reactive({
      selectedUser: null,
      users: [],
      phone: "",
    });

    async function findCurrentPhone() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/report/user/info?userId=${state.selectedUser}&uuid=${token}`;
      let data = await generalGetRequest(url);
      state.phone = data.phone;
    }

    async function updatePhone() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/user/update/phone?phone=${state.phone}&userId=${state.selectedUser}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedUser = "";
      state.phone = "";
    }

    onMounted(async () => {
      state.users = await getAllUsers();
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
