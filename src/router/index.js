import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Home from '@/components/Home'
import Overview from '@/components/Overview'
import Month from '@/components/Month'
import Category from '@/components/Category'
import Record from '@/components/Record'
import Setting from '@/components/Setting'
import Recovery from '@/components/Recovery'
import Backup from '@/components/Backup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      children: [
        {
          path: "overview",
          name: "Overview",
          component: Overview
        },
        {
          path: "month",
          name: "Month",
          component: Month
        },
        {
          path: "category",
          name: "Category",
          component: Category
        },
        {
          path: "record",
          name: "Record",
          component: Record
        },
        {
          path: "setting",
          name: "Setting",
          component: Setting
        },
        {
          path: "recovery",
          name: "Recovery",
          component: Recovery
        },
        {
          path: "backup",
          name: "Backup",
          component: Backup
        }
      ]
    },
    
  ]
})
