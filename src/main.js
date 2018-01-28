import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'

Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload)

require('swiper/dist/css/swiper.css')

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
