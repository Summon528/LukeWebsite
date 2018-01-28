<template>
  <div class="main-head">
    <div class="intro">
      <!-- <img class="intro-img" src="http://www.cacanews.com/imgs/image/140/14067241.jpg"> -->
      <div class="intro-img"></div>
      <div class="intro-text-contanier">
        <div class="intro-text">
          台科大大帥哥<br/>
          建中畢業<br/>
          還有女朋友<br/>
          我就問你羨慕不羨慕羨慕不羨慕羨慕不羨慕<br/>
          再加一行好了<br />
          再加一行好了<br />
        </div>
      </div>
    </div>
    <swiper :options="swiperOption">
        <swiper-slide><img src="https://i.imgur.com/6OKzArFl.png" class="swiper-image"></swiper-slide>
        <swiper-slide><img src="https://i.imgur.com/cMbnLt6l.png" class="swiper-image"></swiper-slide>
        <swiper-slide><img src="https://i.imgur.com/E9MrEJjl.png" class="swiper-image"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>

</template>
<style lang="scss" scoped>
.main-head {
  display: flex;
  background: #7d4627;
  padding: 8px 12% 8px 12%;
  @media only screen and (max-width: 768px) {
    padding: 32px 16px 8px 16px;
    flex-direction: column;
  }
}
.intro {
  display: flex;
  flex-direction: column;
  padding-right: 8px;
  text-align: center;
  color: aliceblue;
  min-width: 300px;
  @media only screen and (max-width: 768px) {
    flex-direction: row;
    padding-right: 0px;
    padding-bottom: 8px;
  }
  .intro-text-contanier,
  .intro-img {
    flex: 1;
  }
  .intro-text-contanier {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .intro-text {
    font-size: large;
  }
  .intro-img {
    background-image: url("http://www.cacanews.com/imgs/image/140/14067241.jpg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
  }
}
.swiper-slide {
  width: auto;
  display: flex;
  align-items: center;
  max-width: 100%;
  transition: all 0.5s ease;
  filter: brightness(50%);
}
.swiper-container {
  width: 100%;
}
.swiper-image {
  max-width: 100%;
}
.swiper-slide-active {
  filter: brightness(100%);
}
</style>

<script>
export default {
  name: "Header",
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: true
        }
      }
    };
  }
};
</script>
