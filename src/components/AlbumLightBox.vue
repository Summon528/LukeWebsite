<template>
<transition name="fade">
    <div class="album-light-box" v-if="lightBoxAlbumId" @click="hideLightBox">
      <img src="../assets/close.svg" class="close-button" @click="hideLightBox">
            <swiper
              :options="swiperOptionTop"
              class="gallery-top"
              ref="swiperTop"
              :if="lightBoxAlbumId">
                <swiper-slide v-for="image in images" :key="image.key">
                  <div class="swiper-zoom-container">
                    <div class="gallery-body">
                      <img class="gallery-image" :src="'http://i.imgur.com/'+image.id+'.png'" />
                      <div v-if="image.description" class="gallery-description">{{image.description}}</div>
                    </div>
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
  </transition>
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
      swiperOptionTop: {
        zoom: true,
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
      console.log("wut");
      this.images.length = 0;
      axios
        .get(config.IMGUR_API + "/album/" + this.lightBoxAlbumId + "/images", {
          headers: config.IMGUR_HEADER
        })
        .then(response => {
          this.images.length = 0;
          console.log(response.data.data);
          this.images = response.data.data;
          this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper;
            const swiperThumbs = this.$refs.swiperThumbs.swiper;
            swiperTop.controller.control = swiperThumbs;
            swiperThumbs.controller.control = swiperTop;
          });
        });
    }
  },
  methods: {
    hideLightBox: function(event) {
      if (event.target == event.currentTarget) this.$emit("hideLightBox");
    }
  }
};
</script>

<style lang="scss" scoped>
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
    position: absolute;
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
  height: 10%;
  box-sizing: border-box;
  padding: 16px 0px 16px 0px;
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
