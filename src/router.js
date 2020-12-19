import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
// import store from './store'
// import memberStore from './store/modules/memberStore.js';// member 관리 store

//네비게이션가드
var loginCheck = localStorage.loginStatus;
const LoginAuth = () => (to, from, next) => {
     //vuex 체크용
     console.log(localStorage.vuex.includes('"loginStatus":true'))
     console.log(loginCheck)

     if (localStorage.vuex.includes('"loginStatus":true')) {

          return next();
     }

     Vue.swal({
          text: "로그인 후 이용해주세요.",
          icon: "error",
     });
     next('/login')
}
const adminDeny = () => (to, from, next) => {
     if (localStorage.vuex.includes('"memberLevel":"0"')) {

          return next();
     }

     Vue.swal({
          text: "관리자용 페이지 입니다. 관리자용 아이디로 로그인 해주세요",
          icon: "error",
     });
     next('/login')
}

const LoginDeny = () => (to, from, next) => {
     if (localStorage.vuex.includes('"loginStatus":true')) {

          return next();
     }
     Vue.swal({
          text: "잘못된 접근입니다. 로그인 페이지로 이동합니다.",
          icon: "error",
     });
     next('/login')
}

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
import Meetingapply from './components/meeting/Meetingapply.vue';
import Approve from './components/meeting/Approve.vue';
import Mkmeeting from './components/meeting/Mkmeeting.vue';
import Meetingupdate from './components/meeting/Meetingupdate.vue';

//혜지

import resume from './components/resume/resume'
import BlindResume from './components/resume/BlindResume'
import LineResume from './components/resume/LineResume'
import DesignResume from './components/resume/DesignResume'
import insertresume from './components/resume/insertresume'
import updateresume from './components/resume/updateresume'
import consultresume from './components/resume/consultresume'
import consult from './components/resume/consult'
import consultresumeenroll from './components/resume/consultresumeenroll'
import resumeList from './components/resume/resumeList'


//민지
const InfoList = () => {
     return import('./components/info/InfoList.vue')
}
const InfoDetail = () => {
     return import('./components/info/InfoDetail.vue')
}
const InfoForm = () => {
     return import('./components/info/InfoForm.vue')
}
const InfoModify = () => {
     return import('./components/info/InfoModify.vue')
}
const JobList = () => {
     return import('./components/jobInfo/JobList.vue')
}

//주은
const CommunityBoardList = () => {
     return import('./components/communityBoard/CommunityBoardList.vue')
}
const CommunityBoardForm = () => {
     return import('./components/communityBoard/CommunityBoardForm.vue')
}
const CommunityBoardView = () => {
     return import('./components/communityBoard/CommunityBoardView.vue')
}
const CommunityBoardUpdate = () => {
     return import('./components/communityBoard/CommunityBoardUpdate.vue')
}
const ItNewsList = () => {
     return import('./components/itNews/ItNewsList.vue')
}
const ItNewsForm = () => {
     return import('./components/itNews/ItNewsForm.vue')
}
const itNewsView = () => {
     return import('./components/itNews/itNewsView.vue')
}
const ItNewsUpdate = () => {
     return import('./components/itNews/ItNewsUpdate.vue')
}
const NoticeList = () => {
     return import('./components/notice/NoticeList.vue')
}
const NoticeForm = () => {
     return import('./components/notice/NoticeForm.vue')
}
const NoticeView = () => {
     return import('./components/notice/NoticeView.vue')
}
const NoticeUpdate = () => {
     return import('./components/notice/NoticeUpdate.vue')
}

//현주
const QnaModify = () => {
     return import('./components/qnaboard/qnaModify.vue')
}
const QnaBoard = () => {
     return import('./components/qnaboard/qnaBoard.vue')
}
const QnaView = () => {
     return import('./components/qnaboard/qnaView.vue')
}
const QnaWrite = () => {
     return import('./components/qnaboard/qnaWrite.vue')
}
const RefSite = () => {
     return import('./components/referenceSite/refSite.vue')
}
const RefSiteback = () => {
     return import('./components/referenceSite/refSiteback.vue')
}
const RefSitefront = () => {
     return import('./components/referenceSite/refSitefront.vue')
}
const RefSiteEtc = () => {
     return import('./components/referenceSite/refSiteEtc.vue')
}
const RefWrite = () => {
     return import('./components/referenceSite/refWrite.vue')
}
const RefUpdate = () => {
     return import('./components/referenceSite/refUpdate.vue')
}
const RefSiteView = () => {
     return import('./components/referenceSite/refSiteView.vue')
}
const RefSiteStatus = () => {
     return import('./components/referenceSite/refSiteStatus.vue')
}
const qnaBoardback = () => {
     return import('./components/qnaboard/qnaBoardback.vue')
}
const qnaBoardfront = () => {
     return import('./components/qnaboard/qnaBoardfront.vue')
}


//현정 라우터
const Login = () => {
     return import('./components/Login.vue')
}

const Register = () => {
     return import('./components/member/Register.vue')
}
const FindPassword = () => {

     return import('./components/member/FindPassword.vue')
}

const FindEmail = () => {
     return import('./components/member/FindEmail.vue')
}

const ChangePassword = () => {
     return import('./components/member/ChangePassword.vue')
}
const MyPage = () => {
     return import('./components/member/MyPage.vue')
}

const JobInfoDtl = () => {
     return import('./components/jobInfo/JobInfoDtl.vue')
}

const FoundPassword = () => {
     return import('./components/member/FoundPassword.vue')
}

const FoundEmail = () => {
     return import('./components/member/FoundEmail.vue')
}


const JobSearchDtl = () => {
     return import('./components/jobInfo/JobSearchDtl.vue')
}

const ChgMemberInfo = () => {
     return import('./components/member/ChgMemberInfo.vue')
}

const ChgPwdInfo = () => {
     return import('./components/member/ChgPwdInfo.vue')
}
const DeleteMember = () => {
     return import('./components/member/DeleteMember.vue')
}
const LoginCallback = () => {
     return import('./components/member/LoginCallback.vue')
}
const NaverLogin = () => {
     return import('./components/member/NaverLogin.vue')
}
const KakaoCallbackLogin = () => {
     return import('./components/member/KakaoCallbackLogin.vue')
}
const AdminPage = () => {
     return import('./components/member/AdminPage.vue')
}


export default new Router({
     mode: 'history',
     base: process.env.BASE_URL,
     routes: [

          //동욱
          {
               path: '/meetingList',
               component: meetingList,
               name: "meetingList",

               children: [
                    {
                         path: 'meeting',
                         component: Meeting,
                         name: 'meeting'

                    },
                    {
                         path: 'meetingend',
                         component: MeetingEnd,
                    }
               ]

          },
          {

               path: '/meetingapply',
               component: Meetingapply,
               beforeEnter: LoginAuth()

          },
          {
               path: '/approve/:memberSq',
               component: Approve,
               name: 'approve',
               beforeEnter: LoginAuth()

          },
          {
               path: '/mkmeeting/:memberSq',
               component: Mkmeeting,
               name: 'mkmeeting',
               beforeEnter: LoginAuth()
          },
          {
               path: '/enrollmeeting',
               component: EnrollerMeeing,
               beforeEnter: LoginAuth()


          },
          {
               path: '/meetingupdae/:id',
               component: Meetingupdate,
               name: "meetingupdate",
               beforeEnter: LoginAuth()

          },
          {
               path: '/meetinginfo/:id',
               component: Meetinginfo,
               name: "meetinginfo",
          },
          {
               path: '/portfolioList',
               component: PortFolio,
               name: 'portlist',
               beforeEnter: LoginAuth()

          },
          {
               path: '/portfolioenroller',
               component: PortFoiloenroller,
               beforeEnter: LoginAuth()

          },
          {
               path: '/Portfolioinfo/:id/:number',
               component: Portfolioinfo,
               name: 'Portinfo',
               beforeEnter(to, from, next) {
                    //로그인한 사용자의 레벨을 가져온다 
                    //console.log(to)
                    if (localStorage.vuex.includes('"loginStatus":true')) {

                         return next();
                    }
               
                    Vue.swal({
                         text: "로그인 후 이용해주세요.",
                         icon: "error",
                    });
                    next('/login')
                    const no =localStorage.getItem("vuex")
                    const obb=JSON.parse(no);
                   const mno=obb.userData.memberSq
                  const pno=to.params.number
               //    console.log(`mno:${mno}pno:${pno}`)
                  const mck= (mno,pno)=> mno===pno ;
               //    console.log(mck(mno,pno));
                    const level = localStorage.vuex.includes('"memberLevel":"2"')
                    console.log(level)
                    if (level == true || mck(mno,pno)==true) {
                         //레벨이 2어간 관리자 레벨이면 게시물에 접근 가능
                         next();
                    } else {
                         alert("권한정보가 부족합니다.")
                    }


               }

          },
          {
               path: '/Portfolioupdate/:id',
               component: Portfolioupdate,
               name: 'Portup',
               beforeEnter: LoginAuth()

          },
          //민지
          {
               path: '/infoList',
               name: 'InfoList',
               component: InfoList
          },
          {
               path: '/infoDetail/:id',
               name: 'InfoDetail',
               component: InfoDetail
          },
          {
               path: '/infoForm',
               name: 'InfoForm',
               component: InfoForm
          },
          {
               path: '/jobList',
               name: 'jobList',
               component: JobList
          },
          {
               path: '/infoModify/:id',
               name: 'InfoModify',
               component: InfoModify
          },
          //주은
          {
               path: '/communityBoardList',
               name: 'CommunityBoardList',
               component: CommunityBoardList
          },

          {
               path: '/communityBoardForm',
               name: 'CommunityBoardForm',
               component: CommunityBoardForm,
                beforeEnter: LoginDeny()
          },

          {
               path: '/itNewsList',
               component: ItNewsList,
               name: "ItNewsList",
          },

          {
               path: '/itNewsForm',
               name: 'ItNewsForm',
               component: ItNewsForm,
                beforeEnter: LoginDeny()
          },

          {
               path: '/noticeList',
               name: 'NoticeList',
               component: NoticeList
          },


          {
               path: '/noticeForm',
               name: 'NoticeForm',
               component: NoticeForm,
               beforeEnter: adminDeny()
          },

          {
               path: '/itNewsView/:id',
               name: 'itNewsView',
               component: itNewsView
          },

          {
               path: '/communityBoardView/:id',
               name: 'CommunityBoardView',
               component: CommunityBoardView
          },

          {
               path: '/noticeView/:id',
               name: 'NoticeView',
               component: NoticeView
          },

          {
               path: '/noticeUpdate/:id',
               name: 'NoticeUpdate',
               component: NoticeUpdate,
               beforeEnter: adminDeny()
          },

          {
               path: '/itNewsUpdate/:id',
               name: 'ItNewsUpdate',
               component: ItNewsUpdate,
               beforeEnter: LoginDeny()
          },

          {
               path: '/communityBoardUpdate/:id',
               name: 'CommunityBoardUpdate',
               component: CommunityBoardUpdate,
                beforeEnter: LoginDeny()
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
               component: Register
          },
          {
               path: '/login',
               name: 'login',
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
               path: '/myPage/:memberSq',
               name: 'myPage',
               component: MyPage,
               beforeEnter: LoginAuth()
          },
          {
               path: '/jobInfoDtl/:wantedNo',
               name: 'jobInfoDtl',
               component: JobInfoDtl
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
               query: { occupation: '', keyword: '', region: '' },
               component: JobSearchDtl,

          },
          {
               path: '/chgMemberInfo',
               name: 'chgMemberInfo',
               component: ChgMemberInfo,
               beforeEnter: LoginDeny()
          },
          {
               path: '/chgPwdInfo',
               name: 'chgPwdInfo',
               component: ChgPwdInfo,
               beforeEnter: LoginDeny()
          },
          {
               path: '/deleteMember',
               name: 'deleteMember',
               component: DeleteMember,
               beforeEnter: LoginDeny()
          },
          {
               path: '/loginCallback',
               name: 'loginCallback',
               component: LoginCallback,

          },
          {
               path: '/naverLogin',
               name: 'naverLogin',
               component: NaverLogin
          },
          {
               path: '/kakaoCallbackLogin',
               name: 'kakaoCallbackLogin',
               component: KakaoCallbackLogin
          },

          {
               path: '/adminPage',
               name: 'adminPage',
               component: AdminPage,
               beforeEnter: adminDeny()
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
               path: '/refSiteback',
               name: 'refSiteback',
               component: RefSiteback
          },
          {
               path: '/refSitefront',
               name: 'refSitefront',
               component: RefSitefront
          },
          {
               path: '/refSiteEtc',
               name: 'refSiteEtc',
               component: RefSiteEtc
          },
          {
               path: '/refUpdate/:id',
               name: 'refUpdate',
               component: RefUpdate
          },
          {
               path: '/refSiteView/:id',
               name: 'refSiteView',
               component: RefSiteView
          },
          {
               path: '/refSiteStatus',
               name: 'refSiteStatus',
               component: RefSiteStatus
          },
          {
               path: '/qnaView/:id',
               name: 'qnaView',
               component: QnaView
          },
          {
               path: '/qnaBoard',
               name: 'qnaBoard',
               component: QnaBoard
          },
          {
               path: '/qnaModify/:id',
               name: 'qnaModify',
               component: QnaModify
          },
          {
               path: '/qnaBoardback',
               name: 'qnaBoardback',
               component: qnaBoardback
          },
          {
               path: '/qnaBoardfront',
               name: 'qnaBoardfront',
               component: qnaBoardfront
          },

          //혜지
          {
               path: '/resume/resume/:id',
               name: 'resume',
               component: resume,
               beforeEnter: LoginAuth(),
          },
          {
               path: '/resume/BlindResume/:id',
               name: 'BlindResume',
               component: BlindResume
          },
          {
               path: '/resume/LineResume/:id',
               name: 'LineResume',
               component: LineResume
          },
          {
               path: '/resume/DesignResume/:id',
               name: 'DesignResume',
               component: DesignResume
          },
          {
               path: '/resume/insertresume',
               name: 'insertresume',
               component: insertresume
          },
          {
               path: '/resume/updateresume/:id',
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
          },
          {
               path: '/resume/consultresumeenroll',
               name: 'consultresumeenroll',
               component: consultresumeenroll
          },
          {
               path: '/resume/resumeList',
               name: 'resumeList',
               component: resumeList
          },

     ]
})