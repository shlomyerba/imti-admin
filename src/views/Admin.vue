<template>
  <div class="Admin">
    <div class="admin-panel">

      <div class="admin-panel_main-menu">
        <h1>left</h1>
        <!-- <button class="admin-panel_main-menu_button" @click="exit">
          Controller
        </button>
        <button class="admin-panel_main-menu_button" @click="exit">
          Events
        </button>
        <button class="admin-panel_main-menu_button" @click="exit">
          Reports
        </button> -->
      </div>

      <div class="admin-panel_action-screen">
                <h1>ritgh</h1>

        <!-- <h1>action!</h1>
        <h1>action!</h1>
        <h1>action!</h1>
        <h1>action!</h1> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-panel {
  display: flex;
    align-items: center;
    justify-content: space-between;
// display: flex;
//   grid-template-columns: 1fr 3fr;
  // width: 100%;
  padding: 50px 5%;

  .admin-panel_main-menu {
    // display: grid;
width: 30%;
    // .admin-panel_main-menu_button {
    //   background: none !important;
    //   border: none;
    //   padding: 15px !important;
    //   color: blueviolet;
    //   cursor: pointer;
    //   font-weight: bold;
    //   font-size: 24px;
    //   border-radius: 5px;
    //   border: 1px solid #dfe3e8;

      // &:hover {
      //   opacity: 0.5;
      // }
    // }
  }

  .admin-panel_action-screen {
    width: 70%;

  //   display: grid;
  //   width: 100%;
  // padding: 50px 5%;
  }
}
</style>