<template>
  <div class="update-membership">
    <form class="update-membership_form" @submit.prevent="updateMembership">
      <div class="update-membership_container">
        <label>Users *</label><br />
        <select
          id="chooseMk"
          v-model="state.selectedUser"
          @change="findCurrentMembership"
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
        <label>Membership *</label><br />
        <select
          id="ChooseMembership"
          v-model="state.selectedMembership"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.memberships"
            :key="index"
          >
            {{ option.id }}
          </option>
        </select>
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
  name: "updateMembership",
  setup() {
    const state = reactive({
      selectedUser: null,
      users: [],
      selectedMembership: null,
      memberships: [{ id: false }, { id: true }],
    });

    async function findCurrentMembership() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/report/user/info?userId=${state.selectedUser}&uuid=${token}`;
      let data = await generalGetRequest(url);
      state.selectedMembership = data.membership;
    }

    async function updateMembership() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/user/update/membership?membership=${state.selectedMembership}&userId=${state.selectedUser}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedUser = "";
      state.selectedMembership = "";
    }

    onMounted(async () => {
      state.users = await getAllUsers();
    });

    return {
      state,
      updateMembership,
      findCurrentMembership,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.update-membership_container {
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
