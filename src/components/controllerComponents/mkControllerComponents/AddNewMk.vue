<template>
  <div class="add-new-mk">
    <form class="add-new-mk_form" @submit.prevent="saveMk">
      <div class="add-new-mk_container">
        <label>Email</label>
        <input type="email" placeholder="Enter Email" v-model="state.email" />
        <label>First Name*</label>
        <input
          type="text"
          placeholder="Enter firstName"
          v-model="state.firstName"
          required
        />
        <label>Last name*</label>
        <input
          type="text"
          placeholder="Enter lasttName"
          v-model="state.lastName"
          required
        />
        <label>Party*</label>
        <select id="addParty" v-model="state.selectedParty" required>
          <option
            :value="option.value"
            v-for="(option, index) in state.parties"
            :key="index"
          >
            {{ option.name }}
          </option>
        </select>

        <label>Phone</label>
        <input
          type="number"
          placeholder="Enter phone number"
          v-model="state.phone"
        />
        <label>Photo*</label>
        <input
          type="file"
          placeholder="upload photo"
          @change="uploadPhoto"
          required
        />

        <button>Add</button>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive } from "vue";

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
      parties: [
        { value: null, name: "Choose a party" },
        { value: 1, name: "Licud" },
        { value: 2, name: "Avoda" },
        { value: 3, name: "Yesh_Atid" },
      ],
    });

    async function saveMk() {
      let token = VueCookies.get("token");
      let url = `http://localhost:8080/admin/mk/add?`;
      if (state.email) {
        url += `email=${state.email}&`;
      }
      url += `first=${state.firstName}&last=${state.lastName}&partyId=${state.selectedParty}`;
      if (state.phone) {
        url += `&phone=${state.phone}`;
      }
      url += `&uuid=${token}`;

      let fd = new FormData();
      fd.append("image", state.photo, state.photo.name);

      //   let header = {
      //     header: {
      //       accept: "*/*",
      //       "Content-Type": "multipart/form-data",
      //     },
      //   };

      try {
        let response = await axios.post(url, fd);

        console.log("response", response.data);
      } catch (e) {
        console.log("e", e);
      }
    }

    async function uploadPhoto(event) {
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
