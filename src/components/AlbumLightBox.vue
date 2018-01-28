<template>
  <div class="album-light-box" v-if="lightBoxAlbumId" @click="hideLightBox">
    <img v-if="!loaded" src="../assets/loading.svg" class="loading-svg">
    <img src="../assets/close.svg" class="close-button" @click="hideLightBox">
          <swiper
            :options="swiperOptionTop"
            class="gallery-top"
            ref="swiperTop"
            :if="lightBoxAlbumId">
              <swiper-slide v-for="(image,idx) in images" :key="image.key">
                <div class="swiper-zoom-container">
                  <div class="gallery-body">
                    <img v-if="idx != 0" class="gallery-image swiper-lazy" :data-src="'http://i.imgur.com/'+image.id+'.png'" />
                    <img v-else class="gallery-image swiper-lazy" :src="'http://i.imgur.com/'+image.id+'.png'" />
                    <div v-if="image.description" class="gallery-description">{{image.description}}</div>
                  </div>
                  <div v-if="idx != 0" class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </div>
              </swiper-slide>
              <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
              <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          </swiper>
          <swiper
            :options="swiperOptionThumbs"
            class="gallery-thumbs"
            ref="swiperThumbs">
              <swiper-slide v-for="image in images" :key="image.key">
                <img :src="'http://i.imgur.com/'+image.id+'s.png'"/>
              </swiper-slide>
          </swiper>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";

export default {
  name: "AlbumLightBox",
  props: ["lightBoxAlbumId"],
  data() {
    return {
      images: [],
      loaded: false,
      swiperOptionTop: {
        preloadImages: false,
        zoom: true,
        lazy: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.4,
        slideToClickedSlide: true
      }
    };
  },
  created() {
    if (this.lightBoxAlbumId) {
      document.body.style.overflow = "hidden";
      this.images.length = 0;
      axios
        .get(config.IMGUR_API + "/album/" + this.lightBoxAlbumId + "/images", {
          headers: config.IMGUR_HEADER
        })
        .then(response => {
          this.images.length = 0;
          this.images = response.data.data;
          this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper;
            const swiperThumbs = this.$refs.swiperThumbs.swiper;
            swiperTop.controller.control = swiperThumbs;
            swiperThumbs.controller.control = swiperTop;
          });
          this.loaded = true;
        });
    }
  },
  destroyed() {
    document.body.style.overflow = "auto";
  },
  methods: {
    hideLightBox: function(event) {
      if (event.target == event.currentTarget) this.$emit("hideLightBox");
    }
  }
};
</script>

<style lang="scss" scoped>
.loading-svg {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.album-light-box {
  box-sizing: border-box;
  position: fixed;
  height: 100%;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  z-index: 81000;
}

.close-button {
  position: fixed;
  width: 30px;
  height: 30px;
  right: 10px;
  cursor: pointer;
  z-index: 82000;
}

.gallery-top {
  $gallery-top-height: calc(87vh - 20px);
  &.swiper-container {
    width: 100%;
    max-width: 1366px;
    height: $gallery-top-height;
  }
  .gallery-body {
    position: relative;
    max-width: 1366px;
  }
  .gallery-image {
    max-height: $gallery-top-height;
    max-width: 100%;
  }
  .gallery-description {
    position: absolute;
    width: 100%;
    bottom: 4px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 4px;
    box-sizing: border-box;
  }
}

.gallery-thumbs {
  height: calc(10% + 16px);
  box-sizing: border-box;
  padding: 8px 0px 8px 0px;
  .swiper-slide {
    width: 100px;
    height: 100%;
    opacity: 0.4;
  }
  .swiper-slide-active {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
