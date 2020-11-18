import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import HomePage from '@/components/pages/HomePage.vue';
import BlogsPage from '@/components/pages/BlogsPage.vue';
import SubmitPage from '@/components/pages/SubmitPage.vue';
import BlogPage from '@/components/pages/BlogPage.vue';

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/all', component: BlogsPage },
    { path: '/submit', component: SubmitPage },
    { path: '/all/:id', component: BlogPage, props: true },
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
