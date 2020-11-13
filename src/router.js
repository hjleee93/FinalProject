import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'



Vue.use(Router)

//동욱
import meetingList from './components/meeting/meetingList.vue'
import EnrollerMeeing from './components/meeting/EnrollerMeeting.vue';
import Meeting from './components/meeting/MeetingView.vue';
import MeetingEnd from './components/meeting/MeetingEndView.vue';
import Meetinginfo from './components/meeting/Meetinginfo.vue';
import PortFolio from './components/portfolio/PortFoilo.vue'
import PortFoiloenroller from './components/portfolio/PortFoiloenroller.vue';

//혜지

import resume from './components/resume/resume'
import BlindResume from './components/resume/BlindResume'
import LineResume from './components/resume/LineResume'
import DesignResume from './components/resume/DesignResume'
import insertresume from './components/resume/insertresume'
import updateresume from './components/resume/updateresume'
import consultresume from './components/resume/consultresume'
import consult from './components/resume/consult'



//민지
const Info = () =>{
  return import('./components/board/Info.vue')
}
const Detail = () =>{
  return import('./components/board/Detail.vue')
}
const Boardform = () =>{
  return import('./components/board/Boardform.vue')
}
const Job = () =>{
  return import('./components/board/Job.vue')
}
//주은
const CommunityBoardList = () =>{
  return import('./components/CommunityBoardList.vue')
}
const CommunityBoardForm = () =>{
  return import('./components/CommunityBoardForm.vue')
}
const CommunityBoardView = () =>{
  return import('./components/CommunityBoardView.vue')
}
const CommunityBoardUpdate = () =>{
  return import('./components/CommunityBoardUpdate.vue')
}
const ItNewsList = () =>{
  return import('./components/ItNewsList.vue')
}
const ItNewsForm = () =>{
  return import('./components/ItNewsForm.vue')
}
const itNewsView = () =>{
  return import('./components/itNewsView.vue')
}
const ItNewsUpdate = () =>{
  return import('./components/ItNewsUpdate.vue')
}
const NoticeList = () =>{
  return import('./components/NoticeList.vue')
}
const NoticeForm = () =>{
  return import('./components/NoticeForm.vue')
}
const NoticeView = () =>{
  return import('./components/NoticeView.vue')
}
const NoticeUpdate = () =>{
  return import('./components/NoticeUpdate.vue')
}

//현주
const Detailpage_modify = () =>{
  return import('./components/Detailpage_modify.vue')
}
const Board = () =>{
  return import('./components/Board.vue')
}
const Detailpage = () =>{
  return import('./components/Detailpage.vue')
}
const Write_ref = () =>{
  return import('./components/Write_ref.vue')
}
const Write_qna = () =>{
  return import('./components/Write_qna.vue')
}
const Reference = () =>{
  return import('./components/Reference.vue')
}
//현정 라우터
const Login = () =>{
  return import('./components/Login.vue')
}

const Register = () =>{
  return import('./components/Register.vue')
}
//nested router
const FindPassword = () => {
  
  return import('./components/member/FindPassword.vue')
}

const FindEmail = () =>{
  return import('./components/member/FindEmail.vue')
}

const ChangePassword = () =>{
  return import('./components/member/ChangePassword.vue')
}
const MyPage = () =>{
  return import('./components/MyPage.vue')
}

const jobInfo = () =>{
  return import('./components/jobInfo.vue')
}

const FoundPassword = () =>{
  return import('./components/member/foundPassword.vue')
}

// const UpdatePassword = () =>{
//   return import('./components/member/updatePassword.vue')
// }

export default new Router({ 
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    //동욱
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
    //민지
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/boardform',
      name: 'boardform',
      component: Boardform
    },
    {
      path: '/job',
      name: 'job',
      component: Job
    },
    //주은
    {
      path: '/communityBoardList',
      name: 'CommunityBoardList',
      component: CommunityBoardList
    },

    {
      path:'/communityBoardForm',
      name:'CommunityBoardForm',
      component:CommunityBoardForm
    },

    {
      path:'/itNewsList',
      name:'ItNewsList',
      component:ItNewsList
    },

    {
      path:'/itNewsForm',
      name:'ItNewsForm',
      component:ItNewsForm
    },

    {
      path:'/noticeList',
      name:'NoticeList',
      component:NoticeList
    },

    {
      path:'/noticeForm',
      name:'NoticeForm',
      component:NoticeForm
    },

    {
      path:'/itNewsView',
      name:'itNewsView',
      component:itNewsView
    },

    {
      path:'/communityBoardView',
      name:'CommunityBoardView',
      component:CommunityBoardView
    },

    {
      path:'/noticeView',
      name:'NoticeView',
      component:NoticeView
    },

    {
      path:'/noticeUpdate',
      name:'NoticeUpdate',
      component:NoticeUpdate
    },

    {
      path:'/itNewsUpdate',
      name:'ItNewsUpdate',
      component:ItNewsUpdate
    },

    {
      path:'/communityBoardUpdate',
      name:'CommunityBoardUpdate',
      component:CommunityBoardUpdate
    },

    //현정
    {
      path: '/',//주소
      name: 'home',
      component: Home//주소와 연결이되는 컴포넌트

    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    },
    {
      path: '/findPassword',
      name: 'findPassword',
      component: FindPassword
    },
    {
      path: '/findEmail',
      name: 'findEmail',
      component: FindEmail
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: ChangePassword
    },
    {
      path: '/myPage',
      name: 'myPage',
      component: MyPage
    },
    {
      path: '/jobInfo',
      name: 'jobInfo',
      component: jobInfo
    },
    {
      path: '/foundPassword',
      name: 'foundPassword',
      component: FoundPassword
    },
    //현주
    {
      path: '/write_qna',
      name: 'write_qna',
      component: Write_qna
    },
    {
      path: '/write_ref',
      name: 'write_ref',
      component: Write_ref
    },
    {
      path: '/reference',
      name: 'reference',
      component: Reference
    },
    {
      path: '/detailpage',
      name: 'detailpage',
      component: Detailpage
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    },
    {
      path: '/detailpage_modify',
      name: 'detailpage_modify',
      component: Detailpage_modify
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