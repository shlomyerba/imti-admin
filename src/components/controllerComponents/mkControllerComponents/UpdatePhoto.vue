<template>
  <div class="update-phone">
    <form class="update-phone_form" @submit.prevent="updatePhoto">
      <div class="update-phone_container">
        <label>Mks *</label><br />
        <select id="chooseMk" v-model="state.selectedMk" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.Mks"
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
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";

export default {
  name: "UpdatePhone",
  setup() {
    const state = reactive({
      selectedMk: null,
      Mks: [],
      photo: null,
    });

    async function updatePhoto() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/mk/update/photo?mkId=${state.selectedMk}&uuid=${token}`;
      let formData = new FormData();
      formData.append("photo", state.photo);
      try {
        let response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/mixed; boundary=gc0p4Jq0M2Yt08jU534c0p"
          },
        });
        state.selectedMk = "";
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    onMounted(async () => {
      let token = await VueCookies.get("token");
      let url = `${baseUrl}/admin/report/mk/all?imageIncluded=false&uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          state.Mks = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
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
