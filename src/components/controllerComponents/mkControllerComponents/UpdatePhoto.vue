<template>
  <div class="update-phone">
    <form class="update-phone_form" @submit.prevent="updatePhoto">
      <div class="update-phone_container">
        <label>Mks *</label><br />
        <select id="chooseMk" v-model="state.selectedMk" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.mks"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>
        <label>Photo *</label><br />
        <input
          type="file"
          placeholder="upload photo"
          @change="uploadPhoto"
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
import { getAllMks, generalPostRequest } from "../../../assets/apiRequest";

export default {
  name: "UpdatePhone",
  setup() {
    const state = reactive({
      selectedMk: null,
      mks: [],
      photo: null,
    });

    async function updatePhoto() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/mk/update/photo?mkId=${state.selectedMk}&uuid=${token}`;
      let formData = new FormData();
      formData.append("photo", state.photo);
      await generalPostRequest(url, formData);
      state.selectedMk = "";
    }

    onMounted(async () => {
      state.mks = await getAllMks();
    });

    function uploadPhoto(event) {
      console.log(event.target.files[0]);

      state.photo = event.target.files[0];
    }
    return {
      state,
      updatePhoto,
      uploadPhoto,
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
