<template>
  <table class="user_info">
    <tr>
      <th>שם</th>
      <th>מפלגה</th>
      <th>אימייל</th>
      <th>מספר טלפון</th>
    </tr>
    <tr v-for="(event, index) in state.info" :key="index">
      <td>{{ `${event.first} ${event.last}` }}</td>
      <td>{{ event.party.name }}</td>
      <td>{{ event.email }}</td>
      <td>{{ event.phone }}</td>
    </tr>
  </table>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "MkTable",
  props: {
    info: JSON,
  },
  setup(props) {
    const state = reactive({
      info: props.info,
    });

    return {
      state,
    };
  },
};
</script>