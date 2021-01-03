<template>
  <table class="user_info">
    <tr>
      <th>Id</th>
      <th>שם פרטי</th>
      <th>שם משפחה</th>
      <th>אימייל</th>
      <th>חברות</th>
      <th>סיסמה</th>
      <th>מספר טלפון</th>
    </tr>
    <tr v-for="(event, index) in state.info" :key="index">
      <td>{{ event.id }}</td>
      <td>{{ event.first }}</td>
      <td>{{ event.last }}</td>
      <td>{{ event.email }}</td>
      <td>{{ state.getHebrewMembership(event.membership) }}</td>
      <td>{{ event.password }}</td>
      <td>{{ event.phone }}</td>
    </tr>
  </table>
</template>

<script>
import { reactive } from "vue";
import { getHebrewMembership } from "../../assets/getHebrewOptions";

export default {
  name: "UserTable",
  props: {
    info: JSON,
  },
  setup(props) {
    const state = reactive({
      info: props.info,
      getHebrewMembership: getHebrewMembership,
    });

    return {
      state,
    };
  },
};
</script>