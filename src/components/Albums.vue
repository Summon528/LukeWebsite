<template>
<div>
<div class="album-container">
  <div class="album-item" v-for="album in albums" :key='album.key'>
    <el-card :body-style="{ padding: '0px' }">
      <img :src="'http://i.imgur.com/'+album.cover+'m.png'" width="320px" class="image">
      <div style="padding: 14px;">
        <span>{{album.title? album.title:"沒有標體"}}</span>
        <div class="bottom clearfix">
          <el-button type="text" class="button" @click="albumNavi(album.id)">操作按钮</el-button>
          {{album.id}}
        </div>
      </div>
    </el-card>
  </div>
</div >


</div>
</template>

<style lang="scss" scoped>
.album-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
img {
  object-fit: cover;
  width: 320px;
  height: 180px;
}
.album-item {
  width: 320px;
  height: auto;
  margin: 10px 0px 10px 0px;
}
</style>


<script>
import axios from "axios";
import Post from "./Post";
import config from "../config";

export default {
  name: "Albums",
  created() {
    this.fetchAlbums();
  },
  components: {
    Post
  },
  data() {
    return {
      albums: [],
      dialogVisible: false
    };
  },
  methods: {
    fetchAlbums: function() {
      axios
        .get(config.IMGUR_API + "/account/summon528/albums", {
          headers: config.IMGUR_HEADER
        })
        .then(response => {
          console.log(response.data.data);
          this.albums = response.data.data;
        });
    },
    albumNavi: function(albumId) {
      this.$router.push({ path: `/post/${albumId}` });
    }
  }
};
</script>
