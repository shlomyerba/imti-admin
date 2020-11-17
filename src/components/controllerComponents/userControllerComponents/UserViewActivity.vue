<template>
  <div class="user-view-activity">
    <form class="user-view-activity_form" @submit.prevent="viewUserActivity">
      <div class="user-view-activity_container">
        <label>Users *</label><br />
        <select id="ChooseUser" v-model="state.selectedUser" required>
          <option
            :value="option.id"
            v-for="(option, index) in state.users"
            :key="index"
          >
            {{ `${option.first} ${option.last}` }}
          </option>
        </select>
        <button>view</button>
      </div>
    </form>
  </div>
  <div>
    <table-lite
      :has-checkbox="true"
      :is-loading="table.isLoading"
      :is-re-search="table.isReSearch"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      :messages="table.messages"
      @do-search="doSearch"
      @is-finished="tableLoadingFinish"
      @return-checked-rows="updateCheckedRows"
    ></table-lite>
  </div>
</template>


<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { reactive, onMounted } from "vue";
import { baseUrl } from "../../../assets/url";
import TableLite from "vue3-table-lite";

export default {
  name: "UserViewActivity",
  components:{TableLite},
  setup() {
    const table = reactive({
      isLoading: false,
      isReSearch: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "3%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Name",
          field: "name",
          width: "10%",
          sortable: true,
          display: function (row) {
            return (
              '<a href="#" data-id="' +
              row.user_id +
              '" class="name-btn">' +
              row.name +
              "</button>"
            );
          },
        },
        {
          label: "Email",
          field: "email",
          width: "15%",
          sortable: true,
        },
        {
          label: "",
          field: "quick",
          width: "10%",
          display: function (row) {
            return (
              '<button type="button" data-id="' +
              row.user_id +
              '" class="quick-btn">Button</button>'
            );
          },
        },
      ],
      rows: [
        {
          id: 1,
          name: "TEST1",
        },
        {
          id: 2,
          name: "TEST2",
        },
      ],
      totalRecordCount: 2,
      sortable: {
        order: "id",
        sort: "asc",
      },
      messages: {
        pagingInfo: "Showing {0}-{1} of {2}",
        pageSizeChangeLabel: "Row count:",
        gotoPageLabel: "Go to page:",
        noDataAvailable: "No data",
      },
    });
    const state = reactive({
      selectedUser: null,
      users: [],
      // items: [
      //   { id: 1, name: "shlomy" },
      //   { id: 2, name: "shlomo" },
      // ],
    });

    async function viewUserActivity() {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/user/view/activity?userId=${state.selectedUser}&uuid=${token}`;
      try {
        let response = await axios.get(url);
        console.log("response", response);
      } catch (e) {
        console.log("e", e);
      }
    }

    onMounted(async () => {
      let token = VueCookies.get("token");
      let url = `${baseUrl}/admin/report/user/all?uuid=${token}`;
      try {
        let response = await axios.get(url);
        if (response.data) {
          state.users = response.data;
        }
      } catch (e) {
        console.log("e", e);
      }
    });

    return {
      state,
      viewUserActivity,
      table
    };
  },
};
</script>

  
<style lang="scss">
.user-view-activity_container {
  padding: 16px;
  font-weight: bold;

  select {
    width: 45%;
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
    width: 45%;
    font-weight: bold;
    margin-left: 5%;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
