<template>
  <div class="add-new-mk">
    <form class="add-new-mk_form" @submit.prevent="saveMk">
      <div class="add-new-mk_container">
        <label>Email *</label><br />
        <input
          type="email"
          placeholder="Enter Email"
          v-model="state.email"
          required
        />
        <label>First Name *</label><br />
        <input
          type="text"
          placeholder="Enter firstName"
          v-model="state.firstName"
          required
        />
        <label>Last name *</label><br />
        <input
          type="text"
          placeholder="Enter lasttName"
          v-model="state.lastName"
          required
        />
        <label>Party *</label><br />
        <select id="addParty" v-model="state.selectedParty" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.parties"
            :key="index"
          >
            {{ option.name }}
          </option>
        </select>

        <label>Phone</label><br />
        <input
          type="number"
          placeholder="Enter phone number"
          v-model="state.phone"
        />
        <label>Photo *</label><br />
        <input
          type="file"
          placeholder="upload photo"
          @change="uploadPhoto"
          required
        />

        <button>add</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import { getAllParties, generalPostRequest } from "../../../assets/apiRequest";

export default {
  name: "AddNewMk",
  setup() {
    const state = reactive({
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      photo: null,
      selectedParty: null,
      parties: [],
    });

    async function saveMk() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/mk/add?`;
      if (state.email) {
        url += `email=${state.email}&`;
      }
      url += `first=${state.firstName}&last=${state.lastName}&partyId=${state.selectedParty}`;
      if (state.phone) {
        url += `&phone=${state.phone}`;
      }
      url += `&uuid=${token}`;

      console.log(url);
      let formData = new FormData();
      formData.append("photo", state.photo);
      await generalPostRequest(url, formData);
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.phone = "";
      state.selectedParty = null;
    }

    onMounted(async () => {
      state.parties = await getAllParties();
    });

    function uploadPhoto(event) {
      state.photo = event.target.files[0];
    }

    return {
      state,
      saveMk,
      uploadPhoto,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.add-new-mk_container {
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
