<template>
  <div class="Admin">
    <div class="admin-panel">
      <div class="admin-panel_main-menu">
        <button class="admin-panel_main-menu_button" @click="exit">
          Controller
        </button>
        <button class="admin-panel_main-menu_button" @click="exit">
          Events
        </button>
        <button class="admin-panel_main-menu_button" @click="exit">
          Reports
        </button>
      </div>

      <div class="admin-panel_action-screen">
        <h1>action 1</h1>
        <h1>action 2</h1>
        <h1>action 3</h1>
        <h1>action 4</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-panel {
  display: flex;
  justify-content: space-between;
  padding: 50px 5%;

  .admin-panel_main-menu {
    display: flex;
    flex-direction: column;
    width: 30%;
    padding: 10px 1%;
    border-right: 2px solid blueviolet;

    .admin-panel_main-menu_button {
      background: none !important;
      border: none;
      padding: 15px !important;
      color: blueviolet;
      cursor: pointer;
      font-weight: bold;
      font-size: 24px;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  .admin-panel_action-screen {
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 10px 15%;
  }
}
</style>