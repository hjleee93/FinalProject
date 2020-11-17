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
import Portfolioinfo from './components/portfolio/PortFolioinfo.vue';
import Portfolioupdate from './components/portfolio/PortFolioupdate.vue';

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
const InfoList = () =>{
  return import('./components/info/InfoList.vue')
}
const InfoDetail = () =>{
  return import('./components/info/InfoDetail.vue')
}
const InfoForm = () =>{
  return import('./components/info/InfoForm.vue')
}
const JobList = () =>{
  return import('./components/info/JobList.vue')
}
//주은
const CommunityBoardList = () =>{
  return import('./components/communityBoard/CommunityBoardList.vue')
}
const CommunityBoardForm = () =>{
  return import('./components/communityBoard/CommunityBoardForm.vue')
}
const CommunityBoardView = () =>{
  return import('./components/communityBoard/CommunityBoardView.vue')
}
const CommunityBoardUpdate = () =>{
  return import('./components/communityBoard/CommunityBoardUpdate.vue')
}
const ItNewsList = () =>{
  return import('./components/itNews/ItNewsList.vue')
}
const ItNewsForm = () =>{
  return import('./components/itNews/ItNewsForm.vue')
}
const itNewsView = () =>{
  return import('./components/itNews/itNewsView.vue')
}
const ItNewsUpdate = () =>{
  return import('./components/itNews/ItNewsUpdate.vue')
}
const NoticeList = () =>{
  return import('./components/notice/NoticeList.vue')
}
const NoticeForm = () =>{
  return import('./components/notice/NoticeForm.vue')
}
const NoticeView = () =>{
  return import('./components/notice/NoticeView.vue')
}
const NoticeUpdate = () =>{
  return import('./components/notice/NoticeUpdate.vue')
}

//현주
const QnaModify = () =>{
  return import('./components/qnaboard/qnaModify.vue')
}
const QnaBoard = () =>{
  return import('./components/qnaboard/qnaBoard.vue')
}
const QnaView = () =>{
  return import('./components/qnaboard/qnaView.vue')
}
const QnaWrite = () =>{
  return import('./components/qnaboard/qnaWrite.vue')
}
const RefSite = () =>{
  return import('./components/referenceSite/refSite.vue')
}
const RefWrite = () =>{
  return import('./components/referenceSite/refWrite.vue')
}
//현정 라우터
const Login = () =>{
  return import('./components/Login.vue')
}

const Register = () =>{
  return import('./components/Register.vue')
}
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
  return import('./components/member/MyPage.vue')
}

const jobInfo = () =>{
  return import('./components/jobInfo.vue')
}

const FoundPassword = () =>{
  return import('./components/member/foundPassword.vue')
}

const FoundEmail = () =>{
  return import('./components/member/foundEmail.vue')
}


const JobSearchDtl = () =>{
  return import('./components/jobInfo/jobSearchDtl.vue')
}

const ChgMemberInfo = () =>{
  return import('./components/member/chgMemberInfo.vue')
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
    {
      path:'/Portfolioinfo/:id',
      component:Portfolioinfo,
      name:'Portinfo',
    },
    {
      path:'/Portfolioupdate/:id',
      component:Portfolioupdate,
      name:'Portup',
    },
    //민지
    {
      path: '/infoList',
      name: 'infoList',
      component: InfoList
    },
    {
      path: '/infoDetail',
      name: 'infoDetail',
      component: InfoDetail
    },
    {
      path: '/infoForm',
      name: 'infoForm',
      component: InfoForm
    },
    {
      path: '/jobList',
      name: 'jobList',
      component: JobList
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
    {
      path: '/foundEmail',
      name: 'foundEmail',
      component: FoundEmail
    },
    {
      path: '/jobSearchDtl',
      name: 'jobSearchDtl',
      component: JobSearchDtl
    },
    {
      path: '/chgMemberInfo',
      name: 'chgMemberInfo',
      component: ChgMemberInfo
    },
    //현주
    {
      path: '/qnaWrite',
      name: 'qnaWrite',
      component: QnaWrite
    },
    {
      path: '/refWrite',
      name: 'refWrite',
      component: RefWrite
    },
    {
      path: '/refSite',
      name: 'refSite',
      component: RefSite
    },
    {
      path: '/qnaView',
      name: 'qnaView',
      component: QnaView
    },
    {
      path: '/qnaBoard',
      name: 'qnaBoard',
      component: QnaBoard
    },
    {
      path: '/qnaModify',
      name: 'qnaModify',
      component: QnaModify
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