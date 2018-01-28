<template>
<div id="app">
  <Header />
  <div  class="container">
    <Albums />
    <router-view/>
  </div>
</div>
</template>

<style lang="scss" scoped>
.container {
  padding: 32px 12% 8px 12%;
  @media only screen and (max-width: 768px) {
    padding: 32px 16px 8px 16px;
  }
}
</style>


<style>
body {
  background: #edd9c0;
  margin: 0 0 0 0;
}
html {
  font-family: Arial, "文泉驛正黑", "WenQuanYi Zen Hei", "儷黑 Pro", "LiHei Pro",
    "微軟正黑體", "Microsoft JhengHei", "標楷體", DFKai-SB, sans-serif;
}
</style>

<script>
import Albums from "./components/Albums";
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
    Albums
  }
};
</script>
