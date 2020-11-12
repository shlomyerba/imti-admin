<template>
  <div class="mk-controller">
    <div class="mk-controller-panel">
      <div class="mk-controller-panel_main-menu">
        <button class="link_button">add mk</button>
        <button class="link_button">remove mk</button>
        <button class="link_button">update email</button>
        <button class="link_button">update party</button>
        <button class="link_button">update phone</button>
        <button class="link_button">update photo</button>
      </div>

      <div class="mk-controller-panel_action-screen">
        <h1>Mk Controller</h1>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "MkController",
};
</script>

  
<style lang="scss" scoped>
.mk-controller-panel_main-menu {
  border-bottom: 2px solid gray;

  .link_button {
    color: gray;
    font-size: 15px;
  }
}
</style>
