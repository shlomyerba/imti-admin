<template>
  <div class="add-new-news">
    <form class="add-new-news_form" @submit.prevent="addNewNews">
      <div class="add-new-news_container">
        <label>הזן ידיעה חדשה *</label><br />
        <textarea
          type="text"
          v-model="state.news"
          maxlength="200"
          required
        ></textarea>
        <button>הוסף</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive } from "vue";
import { baseUrl } from "../../assets/url";
import { generalGetRequest } from "../../assets/apiRequest";

export default {
  name: "AddNewNews",
  setup() {
    const state = reactive({
      news: "",
    });

    async function addNewNews() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/news/add?text=${state.news}&uuid=${token}`;
      console.log(url);
      await generalGetRequest(url);
      state.news = "";
    }

    return {
      state,
      addNewNews,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.add-new-news_container {
  padding: 16px;
  font-weight: bold;

  textarea {
    width: 100%;
    font-size: 20px;
    height: 150px;
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
