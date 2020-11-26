<template>
  <table class="user_info">
    <tr>
      <th>Title</th>
      <th width="200">Description</th>
      <th>Importance</th>
      <th>Mk Founder</th>
      <th width="200">Msg To MKs</th>
      <th width="80">Date</th>
      <th>Time</th>
      <th>Status</th>
    </tr>
    <tr v-for="(event, index) in state.info" :key="index">
      <td>{{ event.title }}</td>
      <td>{{ event.description }}</td>
      <td>{{ state.getHebrewImportances(event.importance) }}</td>
      <td>{{ `${event.founder.first} ${event.founder.last}` }}</td>
      <td>{{ event.msgToMKs }}</td>
      <td>{{ state.getDateFormat(new Date(event.timestamp)) }}</td>
      <td>
        {{ state.getHourAndMinuteFormat(new Date(event.timestamp)) }}
      </td>
      <td>{{ state.getHebrewStatus(event.status) }}</td>
    </tr>
  </table>
</template>

<script>
import { reactive } from "vue";
import {
  getDateFormat,
  getHourAndMinuteFormat,
} from "../../assets/getDateFormat";
import {
  getHebrewImportances,
  getHebrewStatus,
} from "../../assets/getHebrewOptions";

export default {
  name: "EventTable",
  props: {
    info: JSON,
  },
  setup(props) {
    const state = reactive({
      info: props.info,
      getDateFormat: getDateFormat,
      getHourAndMinuteFormat: getHourAndMinuteFormat,
      getHebrewImportances: getHebrewImportances,
      getHebrewStatus: getHebrewStatus,
    });

    return {
      state,
    };
  },
};
</script>