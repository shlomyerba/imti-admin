<template>
  <table class="user_info">
    <tr>
      <th>הצעת חוק</th>
      <th>חבר כנסת</th>
    </tr>
    <tr v-for="(event, index) in state.info" :key="index">
      <td>{{ event.event.title }}</td>
      <td>{{ `${event.mk.first} ${event.mk.last}` }}</td>
    </tr>
  </table>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "ActivityTable",
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