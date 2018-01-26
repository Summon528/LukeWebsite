<template>
<div>
<div class="album-container">
  <div class="album-item" v-for="album in albums" :key='album.key' @click="albumNavi(album.id)">
    <el-card :body-style="{ padding: '0px' }">
      <div class="cover-container">
        <img :src="'http://i.imgur.com/'+album.cover+'m.png'" class="cover-image">
      </div>
      <div style="padding: 14px;">
        <span>{{album.title? album.title:"沒有標體"}}</span>
        <br/>
        <div style="text-align:right;">
          <span>
          {{(new Date(album.datetime*1000)).toLocaleDateString()}}
          </span>
        </div>
      </div>
    </el-card>
  </div>
</div >


</div>
</template>

<style lang="scss" scoped>
.album-container {
  display: grid;
  grid-gap: 20px 20px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}
.cover-container {
  position: relative;
  padding-top: 56.25%;
  width: 100%;
}
.cover-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.el-card {
  transition: box-shadow 0.5s;
}
.el-card:hover {
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
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
