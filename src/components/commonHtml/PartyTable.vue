<template>
  <table class="user_info">
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Orientation</th>
      </tr>
      <tr v-for="(event, index) in state.info" :key="index">
        <td>{{ event.id }}</td>
        <td>{{ event.name }}</td>
        <td>{{ state.getHebrewOrientation(event.orientation) }}</td>
      </tr>
  </table>
</template>

<script>
import { reactive } from "vue";
import { getHebrewOrientation } from "../../assets/getHebrewOptions";

export default {
  name: "PartyTable",
  props: {
    info: JSON,
  },
  setup(props) {
    const state = reactive({
      info: props.info,
      getHebrewOrientation: getHebrewOrientation,
    });

    return {
      state,
    };
  },
};
</script>