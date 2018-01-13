import Vue from 'vue'
import Router from 'vue-router'
import JoinLeague from '@/components/JoinLeague'
import Rankings from '@/components/Rankings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'JoinLeague',
      component: JoinLeague
    },
    {
      path: '/rankings',
      name: 'Rankings',
      component: Rankings,
      props: true
    }
  ]
})
