<template>
  <table class="user_info">
    <tr>
      <th>Id</th>
      <th>Mk</th>
      <th>Event</th>
      <th width="200">Description</th>
      <th>Vote</th>
    </tr>
    <tr v-for="(event, index) in state.info" :key="index">
      <td>{{ event.id }}</td>
      <td>{{ `${event.mk.first} ${event.mk.last}` }}</td>
      <td>{{ event.event.title }}</td>
      <td>{{ event.event.description }}</td>
      <td>{{ state.getHebrewVote(event.vote) }}</td>
    </tr>
  </table>
</template>

<script>
import { reactive } from "vue";
import { getHebrewVote } from "../../assets/getHebrewOptions";

export default {
  name: "MkEventTable",
  props: {
    info: JSON,
  },
  setup(props) {
    const state = reactive({
      info: props.info,
      getHebrewVote: getHebrewVote,
    });

    return {
      state,
    };
  },
};
</script>