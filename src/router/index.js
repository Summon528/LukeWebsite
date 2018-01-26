import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Albums from '@/components/Albums'
import Post from '@/components/Post'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
        path: '/post/:albumId',
        name: 'Post',
        component: Post
    }
  ]
})
