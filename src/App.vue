<template>
<div id="app">
  <div class="main-head">
    <div class="intro">
      <img src="./assets/logo.png">
      <div >
        台科大大帥哥<br/>
        建中畢業<br/>
        還有女朋友<br/>
        我就問你羨慕不羨慕<br/>
        再加一行好了<br />
      </div>
    </div>
    <el-carousel trigger="click" class="main-carousel">
        <el-carousel-item>
            <img src="https://i.imgur.com/6OKzArF.png"  width="80%" class="image" >
        </el-carousel-item>
        <el-carousel-item>
            <img src="https://i.imgur.com/cMbnLt6.png"  width="80%" class="image" >
        </el-carousel-item>
    </el-carousel>
  </div>
  <div  class="container">
    <Albums />
    <router-view/>
  </div>
</div>
</template>

<style lang="scss" scope>
.intro {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-right: 20px;
}
.main-head {
  display: flex;

  widows: 100%;
  flex-direction: row;
  background: #c63d0f;
  padding: 8px 12% 8px 12%;
}
.main-carousel {
  flex: 5;
}
.container {
  padding: 32px 12% 8px 12%;
}
</style>

<style>
body {
  background: #fdf3e7;
}
</style>


<script>
import Albums from "./components/Albums";

export default {
  name: "App",
  components: {
    Albums
  }
};
</script>
