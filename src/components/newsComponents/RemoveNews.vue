<template>
  <div class="remove-news">
    <form class="remove-news_form" @submit.prevent="removeNews">
      <div class="remove-news_container">
        <label>בחר ידיעת חדשות *</label><br />
        <select id="ChooseNews" v-model="state.selectedNews" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.news"
            :key="index"
          >
            {{ option.text }}
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
import { baseUrl } from "../../assets/url";
import { getAllNews, generalGetRequest } from "../../assets/apiRequest";

export default {
  name: "RemoveNews",
  setup() {
    const state = reactive({
      selectedNews: null,
      news: [],
    });

    async function removeNews() {
      let token = VueCookies.get("adminToken");
      let url = `${baseUrl}/admin/news/remove?newsId=${state.selectedNews}&uuid=${token}`;
      await generalGetRequest(url);
      state.selectedNews = "";
      state.news = await getAllNews();
    }

    onMounted(async () => {
      state.news = await getAllNews();
    });

    return {
      state,
      removeNews,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.remove-news_container {
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
