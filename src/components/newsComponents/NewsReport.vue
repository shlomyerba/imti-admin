<template>
  <table class="news-report">
    <tr>
      <th width="150">תאריך</th>
      <th>ידיעת חדשות</th>
    </tr>
    <tr v-for="(event, index) in state.news" :key="index">
      <td>{{ state.getDateFormatForNews(new Date(event.timestamp)) }}</td>
      <td>{{ event.text }}</td>
    </tr>
  </table>
</template>

<script>
import { reactive, onMounted } from "vue";
import { getAllNews } from "../../assets/apiRequest";
import { getDateFormatForNews } from "../../assets/getDateFormat";

export default {
  name: "NewsReport",
  setup() {
    const state = reactive({
      news: [],
      getDateFormatForNews: getDateFormatForNews,
    });

    onMounted(async () => {
      state.news = await getAllNews();
    });

    return {
      state,
    };
  },
};
</script>


<style lang="scss" scoped>
.news-report {
  margin-top: 50px;
}
</style>
