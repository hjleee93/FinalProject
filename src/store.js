import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {
     //동욱
     fetchPboardList,
     fetchPboardOne,
     fetchPboardDel,
     fetchPboardUp,
     fetchAttachment,
     fetchcomment,
     fetchcommentdel,
     fetchmtUpdate,

     //모임
     fetchMeeting,
     fetchmsublist,
     fetchMeetinginfo,
     fetchMeetingapply,
     fetchApprove,
     fetchUnapprove,
     fetchApproveList,
     fetchmklist,
     fetchmeetingdel,
     fetchapprovecount,
     fetchentrant,
     fetchWaitList,
     fetchMeetingend,


     //주은
     fetchCommunityBoardList,
     fetchCommunityBoardView,
     fetchCommunityBoardDelete,
     fetchCommunityBoardUpdate,
     fetchCoummunityBoardAttachment,
     fetchCboardCommentSelectList,
     fetchCboardCommentDelete,
     fetchItNewsUpdate,

     fetchNoticeList,
     fetchNoticeView,
     fetchNoticeDelete,
     fetchNoticeBoardUpdate,
     fetchNoticeAttachment,
     fetchNTboardCommentSelectList,
     fetchNTboardCommentDelete,

     fetchItNewsList,
     fetchItNewsView,
     fetchItNewsDelete,
     fetchITCommentSelectList,
     fetchItNewsCommentDelete,

     //현주
     fetchQnaBoardList,
     fetchQnaBoardView,
     fetchQnaBoardDelete,
     fetchQnaBoardUpdate,
     fetchQnaBoardAttachment,
     fetchqnacomment,
     fetchqnacommentdel,

     fetchrefList,
     fetchrefListNo,
     fetchrefListDelete,
     fetchrefListView,
     fetchrefListUpdate,
     fetchrefCount,

     //민지   
     fetchInfoList,
     fetchInfoDetail,
     fetchInfoDelete,
     fetchInfoUpdate,
     fetchInfoAttachment,

     //혜지
     fetchRboardList,
     fetchResume,
     fetchResumeList,
     fetchResumeDelete,
     fetchRboardView,
     fetchRboardAttachment,
     fetchRboardDelete,
     fetchConsultant,


}
     from './api/index.js';

import memberStore from './store/modules/memberStore.js';// member 관리 store
import jobStore from './store/modules/JobStore.js';

Vue.use(Vuex, axios)
import createPersistedState from 'vuex-persistedstate';

export default new Vuex.Store({

     modules: {
          memberStore: memberStore,
          jobStore: jobStore
     },
     plugins: [
          createPersistedState({
               key: 'vuex',
               reducer(val) {

                    if (val.memberStore.loginStatus === false) { // val.user.token (your user token for example)
                         return {}
                    }
                    return val.memberStore
               }
          })
     ],
     state: {
          pboard: [],
          pboardone: [],
          msg: '',
          attachment: [],
          attachment2: [],
          comment: [],
          //모임

          meeting: [],
          msubList: [],
          minfo: [],
          uminfo: [],
          apply: [],
          approvelist: [],
          mklist: [],
          acount: [],
          enter: [],
          meetingend: [],





          //주은
          communityboard: [],
          communityboardView: [],
          communityboardDelete: [],
          cbAttachment: [],
          cbAttachment2: [],
          cbcomment: [],
          noticeList: [],
          noticeView: [],
          updateData: [],
          noticeAttach: [],
          ntcomment: [],
          itnewsList: [],
          itNewsView: [],
          ITAttachment: [],
          ITcomment: [],

          //현주
          qnaboard1: [],
          qnaboard2: [],
          qnaBoardDelete: [],
          qbAttachment: [],
          qbAttachment2: [],
          qnacomment: [],
          refList: [],
          refListNo: [],
          refListView: [],
          refAttachment: [],
          refCount: [],



          //민지
          info: [],
          /* infoList: [], */
          infoDetail: [],
          infoDelete: [],
          infoAttachment: [],
          infoAttachment2: [],


          loginStatus: false,//로그인 성공 여부
          loginError: false,


          //혜지

          rboard: [],
          resume: [],
          resumeList: [],
          rboardDetail: [],
          rboardAttachment: [],
          consultant: [],

     },
     actions: {
          FETCH_PBOARD({ commit }) {
               //인자로 centext가 제공 centext.commit
               fetchPboardList()
                    .then(({ data }) => commit("SET_PBOARD", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })

          },
          async FETCH_PBOARDONE({ commit }, pboardNo) {
               const response = await fetchPboardOne(pboardNo)

               commit("SET_PBOARDONE", response.data)
               return response;
          },

          FETCH_PBOARDDEL({ commit }, no) {
               fetchPboardDel(no)
                    .then(({ data }) => commit("SET_PBOARDDEL", data))
                    .catch(({ error }) => console.log(error))
          },


          async FETCH_PBOARDUP({ commit }, no) {
               const response = await fetchPboardUp(no)
               commit("SET_PBOARDUP", response.data)
               return response;
          },
          //게시판번호로 첨부파일내용 가져오가
          FETCH_ATTACHMENT({ commit }, no) {
               fetchAttachment(no)
                    .then(({ data }) => commit("SET_ATTACHMENT", data))
                    .catch(({ error }) => console.log(error))
          },
          //게시판 댓글 불러오기
          FETCH_COMMNET({ commit }, no) {
               fetchcomment(no)
                    .then(({ data }) => commit("SET_COMMENT", data))
                    .catch(({ error }) => console.log(error))
          },
          //게시판 댓글 삭제
          async FETCH_COMMENTDEL(data, no) {
               const response = await fetchcommentdel(no)
               return response;

          },

          //모임
          FECH_MEETINGLIST({ commit }) {
               fetchMeeting()
                    .then(({ data }) => commit("SET_MEETING", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          FECH_MEETINGENDLIST({ commit }) {
               fetchMeetingend()
                    .then(({ data }) => commit("SET_MEETINGEND", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },

          FECH_MSUBLIST({ commit }) {
               fetchmsublist()
                    .then(({ data }) => commit("SET_MSUBLIST", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })

          },
          async FECH_MOBOARDINFO({ commit }, no) {
               const response = await fetchMeetinginfo(no)
               commit("SET_MINFO", response.data)
               return response;

          },
          async FECH_APPLYCOUNT({ commit }, no) {
               const response = await fetchapprovecount(no)
               commit("SET_COUNT", response.data)
               return response;

          },

          async FECH_MEETINGAPPLY({ commit }, email) {
               const response = await fetchMeetingapply(email)
               commit("SET_APPLY", response.data)
               return response;
          },
          //신청한 모음 승인처리하는 부분
          async FECH_APPROVE(data, no) {
               const response = await fetchApprove(no)
               return response;
          },
          //신청한 모임 미승인 처리하는부분
          async FECH_UNAPPROVE(data, no) {
               const response = await fetchUnapprove(no)
               return response;
          },
          async FECH_APPROVELIST({ commit }, no) {
               const response = await fetchApproveList(no)
               commit("SET_APPROVE", response.data)
               return response;
          },
          async FECH_MKLIST({ commit }, no) {
               const response = await fetchmklist(no)
               commit("SET_MKLIST", response.data)
               return response
          },
          async FECH_MEETINGDEL(data, no) {
               const response = await fetchmeetingdel(no)
               return response
          },
          //모임업데이트할때 해당 모임 정보를 가져오는 로직
          async FECH_UPDATED({ commit }, no) {
               const response = await fetchmtUpdate(no)
               commit("SET_UMINFO", response.data)
               return response;

          },
          async FECH_APPLYLIST({ commit }, no) {
               const response = await fetchentrant(no)
               commit("SET_ENTER", response.data)
               return response;
          },
          async FECH_WAITLIST({ commit }, no) {

               const response = await fetchWaitList(no)
               const waitArr = new Array();
               for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].memberSq == no) {
                         let j = 0;
                         waitArr[j] = response.data[i];
                         j++;
                    }
               }
               commit("SET_WAITLIST", waitArr)

          },

          //주은
          //자유게시판 list 불러오기
          FETCH_COMMUNITYBOARD({ commit }) {
               setTimeout(() => {
                    fetchCommunityBoardList()
                         .then(({ data }) => commit("SET_COMMUNITYBOARD", data))
                         .catch(({ error }) => {
                              console.log(error);
                         })
               }, 1000)
          },
          //자유게시판 상세화면
          FETCH_COMMUNITYBOARD_VIEW({ commit }, communityboardNo) {
               fetchCommunityBoardView(communityboardNo)
                    .then(({ data }) => commit("SET_COMMUNITYBOARD_VIEW", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          //자유게시판 삭제하기
          FETCH_COMMUNITYBOARD_DELETE({ commit }, communityboardNo) {

               fetchCommunityBoardDelete(communityboardNo)
                    .then(({ data }) => commit("SET_COMMUNITYBOARD_DELETE", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          //자유게시판 수정하기(객체 값 불러오기)
          FETCH_COMMUNITYBOARD_UPDATE({ commit }, boardSq) {
               fetchCommunityBoardUpdate(boardSq)
                    .then(({ data }) => commit("SET_COMMUNITYBOARD_UPDATE", data))
                    .catch(({ error }) => console.log(error))
          },
          //자유게시판 첨부파일 다운로드
          FETCH_COMMUNITYBOARD_ATTACHMENT({ commit }, no) {
               fetchCoummunityBoardAttachment(no)
                    .then(({ data }) => commit("SET_COMMUNITYBOARD_ATTACHMENT", data))
                    .catch(({ error }) => console.log(error))
          },
          //게시판 댓글 조회
          FETCH_CB_COMMENT_LIST({ commit }, cboardNo) {
               fetchCboardCommentSelectList(cboardNo)
                    .then(({ data }) => commit("SET_CB_COMMENT_SELECTLIST", data))
                    .catch(({ error }) => console.log(error))
          },
          //게시판 댓글 삭제
          FETCH_COMMENT_DELETE(data, no) {
               console.log(no)
               fetchCboardCommentDelete(no)
                    .then((data) => {
                         console.log(data)
                    })
                    .catch(({ error }) => console.log(error))
          },


          //공지사항  list 조회
          FETCH_NOTICE({ commit }) {
               setTimeout(() => {
                    fetchNoticeList()
                         .then(({ data }) => commit("SET_NOTICE", data))
                         .catch(({ error }) => {
                              console.log(error);
                         })
               }, 1000)
          },
          //공지사항 상세화면
          FETCH_NOTICE_VIEW({ commit }, noticeSq) {
               fetchNoticeView(noticeSq)
                    .then(({ data }) => commit("SET_NOTICE_VIEW", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          //공지사항 삭제하기
          FETCH_NOTICE_DELETE({ commit }, noticeSq) {
               fetchNoticeDelete(noticeSq)
                    .then(({ data }) => commit("SET_NOTICE_DELETE", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          //공지사항 수정하기(객체 값 불러오기)
          FETCH_NOTICE_UPDATE({ commit }, noticeSq) {
               fetchNoticeBoardUpdate(noticeSq)
                    .then(({ data }) => commit("SET_NOTICE_UPDATE", data))
                    .catch(({ error }) => console.log(error))
          },
          //공지사항 첨부파일 다운로드
          FETCH_NOTICE_ATTACHMENT({ commit }, no) {
               fetchNoticeAttachment(no)
                    .then(({ data }) => commit("SET_NOTICE_ATTACHMENT", data))
                    .catch(({ error }) => console.log(error))
          },
          //게시판 댓글 조회
          FETCH_NT_COMMENT_LIST({ commit }, ntBoardNo) {
               fetchNTboardCommentSelectList(ntBoardNo)
                    .then(({ data }) => commit("SET_NT_COMMENT_SELECTLIST", data))
                    .catch(({ error }) => console.log(error))
          },
          //게시판 댓글 삭제
          FETCH_NT_COMMENT_DELETE(data, no) {
               console.log(no)
               fetchNTboardCommentDelete(no)
                    .then((data) => {
                         console.log(data)
                    })
                    .catch(({ error }) => console.log(error))
          },

          //ItNews
          // ItNews 불러오기
          FECH_ITNEWS_LIST({ commit }) {
               setTimeout(() => {
                    fetchItNewsList()
                         .then(({ data }) => commit("SET_ITNEWS_LIST", data))
                         .catch(({ error }) => {
                              console.log(error);
                         })
               }, 1000)
          },
          // ItNews 상세화면
          FETCH_ITNEWS_VIEW({ commit }, newsSq) {
               fetchItNewsView(newsSq)
                    .then(({ data }) => commit("SET_ITNEWS_VIEW", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          // ItNews 삭제하기
          FETCH_ITNEWS_DELETE({ commit }, newsSq) {
               fetchItNewsDelete(newsSq)
                    .then(({ data }) => commit("SET_ITNEWS_DELETE", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          // ItNews 수정하기(객체 값 불러오기)
          FETCH_ITNEWS_UPDATE({ commit }, newsSq) {
               fetchItNewsUpdate(newsSq)
                    .then(({ data }) => commit("SET_ITNEWS_UPDATE", data))
                    .catch(({ error }) => console.log(error))
          },
          // ItNews 댓글 조회
          FETCH_ITNEWS_COMMENT_LIST({ commit }, itnewsNo) {
               fetchITCommentSelectList(itnewsNo)
                    .then(({ data }) => commit("SET_ITNEWS_COMMENT_SELECTLIST", data))
                    .catch(({ error }) => console.log(error))
          },
          //ItNews 댓글 삭제
          FETCH_ITNEWS_COMMENT_DELETE(data, no) {
               console.log(no)
               fetchItNewsCommentDelete(no)
                    .then((data) => {
                         console.log(data)
                    })
                    .catch(({ error }) => console.log(error))
          },


          //현주
          //qna 게시판 불러오기
          FETCH_QNABOARD({ commit }) {
               fetchQnaBoardList()
                    .then(({ data }) => commit("SET_QNABOARD", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          //qna 게시판 상세화면
          FETCH_QNABOARD_VIEW({ commit }, qboardNo) {
               fetchQnaBoardView(qboardNo)
                    .then(({ data }) => commit("SET_QNABOARD_VIEW", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          //qna 게시판 삭제하기
          FETCH_QNABOARD_DELETE({ commit }, qboardNo) {
               fetchQnaBoardDelete(qboardNo)
                    .then(({ data }) => commit("SET_QNABOARD_DELETE", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          //qna 게시판 수정하기(객체 값 불러오기)
          FETCH_QNABOARD_UPDATE({ commit }, qboardNo) {
               fetchQnaBoardUpdate(qboardNo)
                    .then(({ data }) => commit("SET_QNABOARD_UPDATE", data))
                    .catch(({ error }) => console.log(error))
          },
          //qna 게시판 첨부파일 다운로드
          FETCH_QNABOARD_ATTACHMENT({ commit }, qboardNo) {
               fetchQnaBoardAttachment(qboardNo)
                    .then(({ data }) => commit("SET_QNABOARD_ATTACHMENT", data))
                    .catch(({ error }) => console.log(error))
          },
          //qna 게시판 댓글 불러오기
          FETCH_QNABOARD_COMMENT({ commit }, qboardNo) {
               fetchqnacomment(qboardNo)
                    .then(({ data }) => commit("SET_QNABOARD_COMMENT", data))
                    .catch(({ error }) => console.log(error))
          },
          //qna 게시판 댓글 삭제
          FETCH_QNABOARD_COMMENTDEL(data, qboardCommentNo) {
               console.log(qboardCommentNo)
               fetchqnacommentdel(qboardCommentNo)
                    .then((data) => {
                         console.log(data)
                    })
                    .catch(({ error }) => console.log(error))
          },
          // REF SITE 불러오기
          FECH_REF_LIST({ commit }) {
               fetchrefList()
                    .then(({ data }) => commit("SET_REF_LIST", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          // REF SITE 불러오기(미승인 만)
          FECH_REF_LIST_NO({ commit }) {
               fetchrefListNo()
                    .then(({ data }) => commit("SET_REF_LIST_NO", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          // REF SITE 삭제하기
          FETCH_REF_DELETE({ commit }, refNo) {
               fetchrefListDelete(refNo)
                    .then(({ data }) => commit("SET_REF_DELETE", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          // REF SITE 상세화면
          FETCH_REF_VIEW({ commit }, refNo) {
               fetchrefListView(refNo)
                    .then(({ data }) => commit("SET_REF_VIEW", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          // REF SITE 수정하기(객체 값 불러오기)
          FETCH_REF_UPDATE({ commit }, refNo) {
               fetchrefListUpdate(refNo)
                    .then(({ data }) => commit("SET_REF_UPDATE", data))
                    .catch(({ error }) => console.log(error))
          },
          // REF SITE 글 작성 카운트
          FETCH_REF_COUNT({ commit }) {
               fetchrefCount()
                    .then(({ data }) => commit("SET_REF_COUNT", data))
                    .catch(({ error }) => console.log(error))
          },





          //민지
          //info list 불러오기
          FETCH_INFO({ commit }) {
               fetchInfoList()
                    .then(({ data }) => commit("SET_INFO", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          //info 상세화면
          FETCH_INFO_DETAIL({ commit }, infoNo) {
               fetchInfoDetail(infoNo)
                    .then(({ data }) => commit("SET_INFO_DETAIL", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          //info 삭제하기
          FETCH_INFO_DELETE({ commit }, infoNo) {
               fetchInfoDelete(infoNo)
                    .then(({ data }) => commit("SET_INFO_DELETE", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          //info 수정하기(객체 값 불러오기)
          FETCH_INFO_UPDATE({ commit }, infoSq) {
               fetchInfoUpdate(infoSq)
                    .then(({ data }) => commit("SET_INFO_UPDATE", data))
                    .catch(({ error }) => console.log(error))
          },
          //info 첨부파일 다운로드
          FETCH_INFO_ATTACHMENT({ commit }, no) {
               fetchInfoAttachment(no)
                    .then(({ data }) => commit("SET_INFO_ATTACHMENT", data))
                    .catch(({ error }) => console.log(error))
          },




          //혜지
          //이력서 게시판 리스트 보기
          FETCH_RBOARD({ commit }) {
               //인자로 centext가 제공 centext.commit
               fetchRboardList()
                    .then(({ data }) => commit("SET_RBOARD", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })

          },

          //이력서 불러오기
          FETCH_RESUME({ commit }, resumeNo) {
               fetchResume(resumeNo)
                    .then(({ data }) => commit("SET_RESUME", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },

          //이력서리스트 불러오기
          FETCH_RESUMELIST({ commit }, memberSq) {
               fetchResumeList(memberSq)
                    .then(({ data }) => commit("SET_RESUMELIST", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },

          //이력서 삭제하기
          FETCH_RESUME_DELETE({ commit }, resumeNo) {
               fetchResumeDelete(resumeNo)
                    .then(({ data }) => commit("SET_RESUME_DELETE", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },
          //이력서 게시판 상세화면
          FETCH_RBOARD_VIEW({ commit }, rboardNo) {
               fetchRboardView(rboardNo)
                    .then(({ data }) => commit("SET_RBOARD_VIEW", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },

          //이력서 게시판 상세화면(첨부파일)
          FETCH_RBOARD_ATTACHMENT({ commit }, rboardNo) {
               fetchRboardAttachment(rboardNo)
                    .then(({ data }) => commit("SET_RBOARD_ATTACHMENT", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },

          //이력서 게시판 삭제하기
          FETCH_RBOARD_DELETE({ commit }, rboardNo) {
               fetchRboardDelete(rboardNo)
                    .then(({ data }) => commit("SET_RBOARD_DELETE", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },

          //이력서 전문가 리스트 불러오기
          FETCH_CONSULTANT({ commit }) {
               fetchConsultant()
                    .then(({ data }) => commit("SET_CONSULTANT", data))
                    .catch(({ error }) => {
                         console.log(error);
                    })
          },

     },//action

     mutations: {
          SET_PBOARD(state, pboard) {
               state.pboard = pboard;
          },
          SET_PBOARDONE(state, pboardone) {
               state.pboardone = pboardone;
          },
          SET_PBOARDDEL(state, data) {
               state.msg = data;

          },
          SET_PBOARDUP(state, data) {
               state.attachment = data;
          },
          SET_ATTACHMENT(state, data) {
               state.attachment2 = data;
          },
          //모임
          SET_MEETING(state, data) {
               state.meeting = data;
          },
          SET_MINFO(state, data) {
               state.minfo = data;
          },
          SET_UMINFO(state, data) {
               state.uminfo = data;
          },
          SET_COMMENT(state, data) {
               state.comment = data;
          },
          SET_APPLY(state, data) {
               state.apply = data;

          },
          SET_MEETINGEND(state, data) {
               state.meetingend = data;
          },
          SET_APPROVE(state, data) {
               state.approvelist = data;
          },
          SET_MKLIST(state, data) {
               state.mklist = data;
          },
          SET_COUNT(state, data) {
               state.acount = data;
          },
          SET_ENTER(state, data) {
               state.enter = data;
          },
          SET_WAITLIST(state, data) {
               state.waitArr = data;
          },

          //주은
          //자유게시판 리스트(날짜 들어가는 부분)
          SET_COMMUNITYBOARD(state, communityboard) {
               state.communityboard = communityboard;
          },
          //자유게사판 상세화면
          SET_COMMUNITYBOARD_VIEW(state, communityboardView) {
               state.communityboardView = communityboardView;
          },
          //자유게시판 삭제
          SET_COMMUNITYBOARD_DELETE(state, data) {
               state.data = data;
          },
          //자유게시판 수정(값 불러오기)
          SET_COMMUNITYBOARD_UPDATE(state, data) {
               state.cbAttachment = data;
          },
          //자유게시판 첨부파일(다운로드)
          SET_COMMUNITYBOARD_ATTACHMENT(state, data) {
               state.cbAttachment2 = data;
          },
          //자유게시판 댓글 불러오기
          SET_CB_COMMENT_SELECTLIST(state, data) {
               state.cbcomment = data;
          },

          //공지사항 LIST 불러오기
          SET_NOTICE(state, noticeList) {
               state.noticeList = noticeList;
          },
          //공지사항 상세화면
          SET_NOTICE_VIEW(state, noticeView) {
               state.noticeView = noticeView;
          },
          //공지사항 삭제
          SET_NOTICE_DELETE(state, data) {
               state.data = data;
          },
          //공지사항 수정(값 불러오기)
          SET_NOTICE_UPDATE(state, data) {
               state.updateData = data;
          },
          //공지사항 첨부파일(다운로드)
          SET_NOTICE_ATTACHMENT(state, data) {
               state.noticeAttach = data;
          },
          //공지사항 댓글 불러오기
          SET_NT_COMMENT_SELECTLIST(state, data) {
               state.ntcomment = data;
          },

          // IT소식 리스트 불러오기
          SET_ITNEWS_LIST(state, data) {
               state.itnewsList = data;
          },
          // IT소식 상세화면
          SET_ITNEWS_VIEW(state, itNewsView) {
               state.itNewsView = itNewsView;
          },
          // IT소식 삭제
          SET_ITNEWS_DELETE(state, data) {
               state.data = data;
          },
          // IT소식 수정(첨부파일 불러오기)
          SET_ITNEWS_UPDATE(state, data) {
               state.ITAttachment = data;
          },
          // IT소식 댓글 불러오기
          SET_ITNEWS_COMMENT_SELECTLIST(state, data) {
               state.ITcomment = data;
          },


          //현주 게시판 리스트
          SET_QNABOARD(state, qnaboard1) {
               state.qnaboard1 = qnaboard1;
          },
          //qna게시판 상세화면
          SET_QNABOARD_VIEW(state, qnaboard2) {
               state.qnaboard2 = qnaboard2;
          },
          //qna게시판 삭제
          SET_QNABOARD_DELETE(state, data) {
               state.data = data;
          },
          //qna게시판 수정(값 불러오기)
          SET_QNABOARD_UPDATE(state, data) {
               state.qbAttachment = data;
          },
          //qna게시판 첨부파일(다운로드)
          SET_QNABOARD_ATTACHMENT(state, data) {
               state.qbAttachment2 = data;
          },
          //qna게시판 댓글
          SET_QNABOARD_COMMENT(state, data) {
               state.qnacomment = data;
          },
          // reference site 리스트 불러오기
          SET_REF_LIST(state, data) {
               state.refList = data;
          },
          // reference site 리스트 불러오기(미승인 만)
          SET_REF_LIST_NO(state, data) {
               state.refListNo = data;
          },
          // reference site 삭제
          SET_REF_DELETE(state, data) {
               state.data = data;
          },
          // reference site 상세화면
          SET_REF_VIEW(state, refListView) {
               state.refListView = refListView;
          },
          //reference site 수정(첨부파일 불러오기)
          SET_REF_UPDATE(state, data) {
               state.refAttachment = data;
          },
          //글작성 카운트
          SET_REF_COUNT(state, data) {
               state.refCount = data;
          },


          //민지
          //리스트
          SET_INFO(state, info) {
               state.info = info;
          },
          //상세화면
          SET_INFO_DETAIL(state, infoDetail) {
               state.infoDetail = infoDetail;
          },
          //삭제
          SET_INFO_DELETE(state, data) {
               state.data = data;
          },
          //수정(값 불러오기)
          SET_INFO_UPDATE(state, data) {
               state.infoAttachment = data;
          },
          //첨부파일(다운로드)
          SET_INFO_ATTACHMENT(state, data) {
               state.infoAttachment2 = data;
          },

          //혜지
          //이력서 게시판 리스트
          SET_RBOARD(state, rboard) {
               state.rboard = rboard;
          },
          //이력서 불러오기
          SET_RESUME(state, resume) {
               state.resume = resume;
          },
          //이력서리스트 불러오기
          SET_RESUMELIST(state, resumeList) {
               state.resumeList = resumeList;
          },
          //이력서 삭제
          SET_RESUME_DELETE(state, deta) {
               state.data = deta;
          },
          //이력서 상세화면
          SET_RBOARD_VIEW(state, rboardDetail) {
               state.rboardDetail = rboardDetail;
          },
          //이력서 상세화면(첨부파일)
          SET_RBOARD_ATTACHMENT(state, rboardAttachment) {
               state.rboardAttachment = rboardAttachment;
          },
          //이력서 게시판 삭제
          SET_RBOARD_DELETE(state, data) {
               state.data = data;
          },
          //이력서 전문가 리스트
          SET_CONSULTANT(state, consultant) {
               state.consultant = consultant;
          }

     }//mutations 끝


})