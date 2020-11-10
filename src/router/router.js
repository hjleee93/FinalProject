import Vue from 'vue'
import VueRouter from 'vue-router'
import meetingList from '../components/meeting/meetingList.vue'
import EnrollerMeeing from '../components/meeting/EnrollerMeeting.vue';
import Meeting from '../components/meeting/MeetingView.vue';
import MeetingEnd from '../components/meeting/MeetingEndView.vue';
import Meetinginfo from '../components/meeting/Meetinginfo.vue';
import PortFolio from '../components/portfolio/PortFoilo.vue'
import PortFoiloenroller from '../components/portfoilo/PortFoiloenroller.vue';

//혜지

import resume from './components/resume/resume'
import BlindResume from './components/resume/BlindResume'
import LineResume from './components/resume/LineResume'
import DesignResume from './components/resume/DesignResume'
import insertresume from './components/resume/insertresume'
import updateresume from './components/resume/updateresume'
import consultresume from './components/resume/consultresume'
import consult from './components/resume/consult'



Vue.use(VueRouter)

export const router = new VueRouter({
  mode:'history', 
  routes:[
    {
      path:'/meetingList',
      component:meetingList,
      children:[
        {
          path:'meeting',
          component:Meeting,
        },
        {
          path:'meetingend',
          component:MeetingEnd,
        }
      ]

    },
    {
      path:'/enrollmeeting',
      component:EnrollerMeeing,
    },
    {
      path:'/meetinginfo',
      component:Meetinginfo,

    },
    {
      path:'/portfolioList',
      component:PortFolio,
    },
    {
      path:'/portfolioenroller',
      component:PortFoiloenroller,
    },
    //혜지
      {
      path: '/resume/resume',
      name: 'resume',
      component: resume
      },
      {
      path: '/resume/BlindResume',
      name: 'BlindResume',
      component: BlindResume
      },
      {
      path: '/resume/LineResume',
      name: 'LineResume',
      component: LineResume
      },
      {
      path: '/resume/DesignResume',
      name: 'DesignResume',
      component: DesignResume
      },
      {
      path: '/resume/insertresume',
      name: 'insertresume',
      component: insertresume
      },
      {
      path: '/resume/updateresume',
      name: 'updateresume',
      component: updateresume
      },
      {
      path: '/resume/consultresume',
      name: 'consultresume',
      component: consultresume
      },
      {
      path: '/resume/consult',
      name: 'consult',
      component: consult
      }
    
    
      
  ]
})



export default router
