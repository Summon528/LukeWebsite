<template>
    <div
      class="album-image-container"
      @mouseover="swiperButtonVisable = true"
      @mouseout="swiperButtonVisable = false">
        <swiper :options="swiperOption" class="swiper-box album-image" >
        <swiper-slide class="swiper-item" v-for="image in images" :key="image.key">
            <img :src="'http://i.imgur.com/'+image+'m.png'" class="album-image"/>
        </swiper-slide>
        <swiper-slide class="swiper-item" v-if="!loaded">
            <img src="../assets/loading.svg" class="album-image">
        </swiper-slide>
        <div
          v-bind:class="{ 'swiper-button-hide': !swiperButtonVisable }"
          class="swiper-button-prev"
          slot="button-prev"
          id="swiper-button-prev"/>
        <div
          v-bind:class="{ 'swiper-button-hide': !swiperButtonVisable }"
          class="swiper-button-next"
          slot="button-next"
          id="swiper-button-next"/>
        </swiper>
    </div>
</template>

<style lang="scss" scoped>
.album-image-container {
  position: relative;
  padding-top: 56.25%;
  width: 100%;
  background: #373737;
}
.album-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.swiper-button-prev {
  background-image: url("../assets/chevron-sign-left.svg");
}
.swiper-button-next {
  background-image: url("../assets/chevron-sign-right.svg");
}
.swiper-button-next,
.swiper-button-prev {
  background-size: 27px 27px;
  opacity: 0.6;
  transition: opacity 0.5s;
  &:hover {
    opacity: 0.9;
  }
}
.swiper-button-disabled,
.swiper-button-hide {
  opacity: 0 !important;
}
</style>

<script>
import axios from "axios";
import config from "../config";

export default {
  name: "AlbumSwiper",
  props: ["cover", "albumId"],
  created() {
    this.images.push(this.cover);
  },
  data() {
    const vue = this;
    return {
      images: [],
      loaded: false,
      swiperButtonVisable: false,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChange: function() {
            vue.fetchImages();
          }
        }
      }
    };
  },
  methods: {
    fetchImages: function() {
      if (!this.loaded) {
        axios
          .get(config.IMGUR_API + "/album/" + this.albumId + "/images", {
            headers: config.IMGUR_HEADER
          })
          .then(response => {
            console.log(response.data.data);
            this.images.length = 0;
            response.data.data.forEach(element => {
              this.images.push(element.id);
            });
            this.loaded = true;
          });
      }
    }
  }
};
</script>
