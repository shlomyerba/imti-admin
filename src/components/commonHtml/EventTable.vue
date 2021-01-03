<template>
  <table class="user_info">
    <tr>
      <th>הצעת חוק</th>
      <th width="200">תיאור</th>
      <th>חשיבות</th>
      <th>יוזם ההצעה</th>
      <th width="200">הודעה לחברי הכנסת</th>
      <th width="80">תאריך</th>
      <th>שעה</th>
      <th>סטטוס</th>
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