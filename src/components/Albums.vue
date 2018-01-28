<template>
<div class="album-container">
    <div
      class="album-card"
      v-for="album in albums"
      :key='album.key'
      @click="showLightBox($event, album.id)">
      <div class="album-text">
        <span class="album-title">{{album.title? album.title:"沒有標體"}}</span>
        <span style="float:right">{{(new Date(album.datetime*1000)).toLocaleDateString()}}</span>
      </div>
      <AlbumSwiper :cover="album.cover" :album-id="album.id" />
    </div>
  <AlbumLightBox v-if="lightBoxAlbumId" :lightBoxAlbumId="lightBoxAlbumId" @hideLightBox="lightBoxAlbumId = ''"/>
</div>
</template>

<style lang="scss" scoped>
.album-container {
  display: grid;
  grid-gap: 20px 20px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: auto;
}
.album-card {
  border-radius: 15px;
  overflow: auto;
  background: #f4f4f4;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  color: #303133;
}
.album-card:hover {
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
}
.album-text {
  padding: 8px 8px 4px 8px;
}
.album-title {
  font-size: larger;
  font-weight: bold;
}
.album-card-footer {
  position: absolute;
  right: 4px;
  bottom: 4px;
}
</style>


<script>
import axios from "axios";
import AlbumSwiper from "./AlbumSwiper";
import AlbumLightBox from "./AlbumLightBox";
import config from "../config";

export default {
  name: "Albums",
  created() {
    this.fetchAlbums();
  },
  components: {
    AlbumSwiper,
    AlbumLightBox
  },
  data() {
    return {
      albums: [],
      lightBoxAlbumId: ""
    };
  },
  methods: {
    fetchAlbums: function() {
      axios
        .get(
          config.IMGUR_API + "/account/" + config.IMGUR_USERNAME + "/albums",
          {
            headers: config.IMGUR_HEADER
          }
        )
        .then(response => {
          this.albums = response.data.data;
        });
    },
    showLightBox: function(event, albumId) {
      if (
        event.target.id != "swiper-button-prev" &&
        event.target.id != "swiper-button-next"
      ) {
        this.lightBoxAlbumId = albumId;
      }
    }
  }
};
</script>
