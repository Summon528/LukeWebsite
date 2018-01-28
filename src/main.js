import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)

require('swiper/dist/css/swiper.css')

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
