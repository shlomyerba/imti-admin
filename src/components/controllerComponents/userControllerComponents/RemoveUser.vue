<template>
  <div class="remove-user">
    <form class="remove-user_form" @submit.prevent="removeUser">
      <div class="remove-user_container">
        <label>בחר משתמש *</label><br />
        <select id="ChooseUser" v-model="state.selectedUser" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.users"
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
import { getAllUsers, generalGetRequest } from "../../../assets/apiRequest";

export default {
  name: "RemoveParty",
  setup() {
    const state = reactive({
      selectedUser: null,
      users: [],
    });

    async function removeUser() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/user/remove?userId=${state.selectedUser}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedUser = "";
      await updateUsers();
    }

    async function updateUsers() {
      state.users = await getAllUsers();
    }

    onMounted(async () => {
      await updateUsers();
    });

    return {
      state,
      removeUser,
      updateUsers,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.remove-user_container {
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
