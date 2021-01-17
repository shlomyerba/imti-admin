<template>
  <div class="news">
    <div class="news-panel">
      <div class="news-panel_main-menu">
        <button
          class="link_button_choose"
          @click="goToNewNews"
          v-if="state.isNewNews"
        >
          הוספת ידיעה חדשה
        </button>
        <button class="link_button" @click="goToNewNews" v-else>
          הוספת ידיעה חדשה
        </button>

        <button
          class="link_button_choose"
          @click="goToRemoveNews"
          v-if="state.isRemoveNews"
        >
          מחק ידיעת חדשות
        </button>
        <button class="link_button" @click="goToRemoveNews" v-else>
          מחק ידיעת חדשות
        </button>

        <button
          class="link_button_choose"
          @click="goToUpdateNews"
          v-if="state.isUpdateNews"
        >
          עדכן ידיעת חדשות
        </button>
        <button class="link_button" @click="goToUpdateNews" v-else>
          עדכן ידיעת חדשות
        </button>

        <button
          class="link_button_choose"
          @click="goToNewsReport"
          v-if="state.isNewsReport"
        >
          הצג את כל החדשות
        </button>
        <button class="link_button" @click="goToNewsReport" v-else>
          הצג את כל החדשות
        </button>
      </div>

      <div class="controller-panel_action-screen">
        <AddNewNews v-if="state.isNewNews" />
        <RemoveNews v-else-if="state.isRemoveNews" />
        <NewsReport v-else-if="state.isNewsReport" />
        <UpdateNews v-else-if="state.isUpdateNews" />
      </div>
    </div>
  </div>
</template>


<script>
import AddNewNews from "./newsComponents/AddNewNews";
import RemoveNews from "./newsComponents/RemoveNews";
import NewsReport from "./newsComponents/NewsReport";
import UpdateNews from "./newsComponents/UpdateNews";

import { reactive } from "vue";

export default {
  name: "News",
  components: {
    AddNewNews,
    RemoveNews,
    NewsReport,
    UpdateNews,
  },
  setup() {
    const state = reactive({
      isNewNews: true,
      isRemoveNews: false,
      isNewsReport: false,
      isUpdateNews: false,
    });

    function goToNewNews() {
      closeAll();
      state.isNewNews = true;
    }

    function goToRemoveNews() {
      closeAll();
      state.isRemoveNews = true;
    }

    function goToNewsReport() {
      closeAll();
      state.isNewsReport = true;
    }

    function goToUpdateNews() {
      closeAll();
      state.isUpdateNews = true;
    }

    function closeAll() {
      state.isNewNews = false;
      state.isRemoveNews = false;
      state.isNewsReport = false;
      state.isUpdateNews = false;
    }

    return {
      state,
      goToNewNews,
      goToRemoveNews,
      goToNewsReport,
      goToUpdateNews,
      closeAll,
    };
  },
};
</script>

  
<style lang="scss" scoped>
.news-panel_main-menu {
  border-bottom: double;

  .link_button {
    color: gray;
    font-size: 18px;
  }
  .link_button_choose {
    color: gray;
    font-size: 30px;
  }
}
</style>
