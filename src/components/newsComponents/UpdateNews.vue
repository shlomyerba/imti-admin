<template>
  <div class="update-news">
    <form class="update-news_form" @submit.prevent="updateEmail">
      <div class="update-news_container">
        <label>בחר ידיעת חדשות *</label><br />
        <select
          id="chooseNews"
          v-model="state.selectedNews"
          @change="findCurrentNews"
          required
        >
          <option
            :value="option.id"
            v-for="(option, index) in state.news"
            :key="index"
          >
            {{ option.text }}
          </option>
        </select>
        <label>עדכן ידיעת חדשות *</label><br />
        <textarea type="text" v-model="state.textNews"  maxlength="200" required></textarea>
        <button>עדכן</button>
      </div>
    </form>
  </div>
</template>


<script>
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../assets/url";
import { getAllNews, generalGetRequest } from "../../assets/apiRequest";

export default {
  name: "UpdateNews",
  setup() {
    const state = reactive({
      selectedNews: null,
      news: [],
      textNews: "",
    });

    async function findCurrentNews() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/reports/news/by/id?newsId=${state.selectedNews}&uuid=${token}`;
      let data = await generalGetRequest(url);
      state.textNews = data.text;
    }

    async function updateEmail() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/news/update?newsId=${state.selectedNews}&text=${state.textNews}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedNews = "";
      state.textNews = "";
      state.news = await getAllNews();
    }

    onMounted(async () => {
      state.news = await getAllNews();
    });

    return {
      state,
      updateEmail,
      findCurrentNews,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.update-news_container {
  padding: 16px;
  font-weight: bold;

  textarea {
    width: 100%;
    font-size:20px ;
    height: 150px;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

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
