<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Albums />
    <router-view/>
    <router-link to="/post">Go to Foo</router-link>
  </div>
</template>

<script>
import Albums from "./components/Albums";

export default {
  name: "App",
  components: {
    Albums
  }
};
</script>
