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
  
    //모임
    fetchMeeting,
    fetchmsublist,
    fetchMeetinginfo,
    fetchMeetingapply,

    //주은
    fetchCommunityBoardList,
    fetchCommunityBoardView,
    fetchCommunityBoardDelete,
    fetchCommunityBoardUpdate,
    fetchCoummunityBoardAttachment,
    fetchCboardCommentSelectList,
    fetchCboardCommentDelete,

    fetchNoticeList,
    fetchNoticeView,
    fetchNoticeDelete,
    fetchNoticeBoardUpdate,
    fetchNoticeAttachment,
    fetchNTboardCommentSelectList,
    fetchNTboardCommentDelete,

    //현주
    fetchQnaBoardList,
    fetchQnaBoardView,
    fetchQnaBoardDelete,
    fetchQnaBoardUpdate,
    fetchQnaBoardAttachment,
    fetchqnacomment,
    fetchqnacommentdel,

    //민지   
    fetchInfoList,
    fetchInfoDetail,
    fetchInfoDelete,
    fetchInfoUpdate,
    fetchInfoAttachment,

    //혜지
    fetchRboardList


}
    from './api/index.js';

import memberStore from './store/modules/memberStore.js';// member 관리 store
import jobStore from './store/modules/JobStore.js';

Vue.use(Vuex, axios)

export default new Vuex.Store({

    modules: {
        memberStore: memberStore,
        jobStore: jobStore
    },
    state: {
        pboard: [],
        pboardone: [],
        msg: '',
        attachment: [],
        attachment2:[],
        comment:[],
        //모임

        meeting: [],
        msubList: [],
        minfo: [],


        //주은
        communityboard: [],
        communityboardView: [],
        communityboardDelete: [],
        cbAttachment: [],
        cbAttachment2:[],
        cbcomment:[],
        noticeList:[],
        noticeView:[],
        updateData:[],
        noticeAttach:[],
        ntcomment:[],

        //현주
        qnaboard1:[],
        qnaboard2:[],
        qnaBoardDelete:[],
        qbAttachment:[],
        qbAttachment2:[],
        qnacomment:[],

        //민지
        info:[],
        /* infoList: [], */
        infoDetail: [],
        infoDelete: [],
        infoAttachment: [],
        infoAttachment2:[],


        loginStatus: false,//로그인 성공 여부
        loginError: false,

        
        //혜지
        rboard : []
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
        FETCH_PBOARDONE({ commit }, pboardNo) {
            fetchPboardOne(pboardNo)
                .then(({ data }) => commit("SET_PBOARDONE", data))
                .catch(({ error }) => console.log(error))
        },

        FETCH_PBOARDDEL({ commit }, no) {
            fetchPboardDel(no)
                .then(({ data }) => commit("SET_PBOARDDEL", data))
                .catch(({ error }) => console.log(error))
        },


        FETCH_PBOARDUP({ commit }, no) {
            fetchPboardUp(no)
                .then(({ data }) => commit("SET_PBOARDUP", data))
                .catch(({ error }) => console.log(error))
        },
        //게시판번호로 첨부파일내용 가져오가
        FETCH_ATTACHMENT({commit},no){
            fetchAttachment(no)
            .then(({data})=>commit("SET_ATTACHMENT",data))
            .catch(({ error }) => console.log(error))
        },
        //게시판 댓글 불러오기
        FETCH_COMMNET({commit},no){
            fetchcomment(no)
            .then(({data})=>commit("SET_COMMENT",data))
            .catch(({error})=>console.log(error))
        },
        //게시판 댓글 삭제
        async FETCH_COMMENTDEL(data,no){
          const response= await fetchcommentdel(no)
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

        FECH_MSUBLIST({ commit }) {
            fetchmsublist()
                .then(({ data }) => commit("SET_MSUBLIST", data))
                .catch(({ error }) => {
                    console.log(error);
                })

        },
        FECH_MOBOARDINFO({ commit }, no) {
            fetchMeetinginfo(no)
                .then(({ data }) => commit("SET_MINFO", data))
                .catch(({ error }) => {
                    console.log(error);
                })
        },
        async FECH_MEETINGAPPLY(data,email){
          const response=await fetchMeetingapply(email)
          return response;
        },
        

        //주은
        //자유게시판 list 불러오기
        FETCH_COMMUNITYBOARD({ commit }) {
            fetchCommunityBoardList()
                .then(({ data }) => commit("SET_COMMUNITYBOARD", data))
                .catch(({ error }) => {
                    console.log(error);
                })
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
        FETCH_COMMUNITYBOARD_ATTACHMENT({commit},no){
            fetchCoummunityBoardAttachment(no)
            .then(({data})=>commit("SET_COMMUNITYBOARD_ATTACHMENT",data))
            .catch(({ error }) => console.log(error))
        },
        //게시판 댓글 조회
        FETCH_CB_COMMENT_LIST({commit},cboardNo){
            fetchCboardCommentSelectList(cboardNo)
            .then(({data})=>commit("SET_CB_COMMENT_SELECTLIST",data))
            .catch(({error})=>console.log(error))
        },
        //게시판 댓글 삭제
        FETCH_COMMENT_DELETE(data,no){
            console.log(no)
            fetchCboardCommentDelete(no)
            .then((data)=>{console.log(data)
            })
            .catch(({error})=>console.log(error))
        },


        //공지사항  list 조회 
        FETCH_NOTICE({commit}){
            fetchNoticeList()
                .then(({ data }) => commit("SET_NOTICE", data))
                .catch(({ error }) => {
                console.log(error);
                })
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
        FETCH_NOTICE_ATTACHMENT({commit},no){
            fetchNoticeAttachment(no)
            .then(({data})=>commit("SET_NOTICE_ATTACHMENT",data))
            .catch(({ error }) => console.log(error))
        },
        //게시판 댓글 조회
        FETCH_NT_COMMENT_LIST({commit},ntBoardNo){
            fetchNTboardCommentSelectList(ntBoardNo)
            .then(({data})=>commit("SET_NT_COMMENT_SELECTLIST",data))
            .catch(({error})=>console.log(error))
        },
        //게시판 댓글 삭제
        FETCH_NT_COMMENT_DELETE(data,no){
            console.log(no)
            fetchNTboardCommentDelete(no)
            .then((data)=>{console.log(data)
            })
            .catch(({error})=>console.log(error))
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
        FETCH_QNABOARD_ATTACHMENT({commit},qboardNo){
            fetchQnaBoardAttachment(qboardNo) 
                .then(({data})=>commit("SET_QNABOARD_ATTACHMENT",data))
                .catch(({ error }) => console.log(error))
        },
        //qna 게시판 댓글 불러오기
        FETCH_QNABOARD_COMMENT({commit},qboardNo){
            fetchqnacomment(qboardNo)
            .then(({data})=>commit("SET_QNABOARD_COMMENT",data))
            .catch(({error})=>console.log(error))
        },

        //qna 게시판 댓글 삭제
        FETCH_QNABOARD_COMMENTDEL(data,qboardNo){
            console.log(qboardNo)
            fetchqnacommentdel(qboardNo)
            .then((data)=>{console.log(data)
            })
            .catch(({error})=>console.log(error))
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
        FETCH_INFO_ATTACHMENT({commit},no){
            fetchInfoAttachment(no)
            .then(({data})=>commit("SET_INFO_ATTACHMENT",data))
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
        SET_ATTACHMENT(state,data){
            state.attachment2=data;
        },
        //모임
        SET_MEETING(state, data) {
            state.meeting = data;
        },
        SET_MINFO(state, data) {
            state.minfo = data;
        },
        SET_COMMENT(state,data){
            state.comment=data;
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
        SET_COMMUNITYBOARD_ATTACHMENT(state,data){
            state.cbAttachment2=data;
        },
        //자유게시판 댓글 불러오기
        SET_CB_COMMENT_SELECTLIST(state,data){
            state.cbcomment=data;
        },

        //공지사항 LIST 불러오기
        SET_NOTICE(state,noticeList){
            state.noticeList=noticeList;
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
        SET_NOTICE_ATTACHMENT(state,data){
            state.noticeAttach=data;
        },
        //공지사항 댓글 불러오기
        SET_NT_COMMENT_SELECTLIST(state,data){
            state.ntcomment=data;
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
        SET_QNABOARD_ATTACHMENT(state,data){
            state.qbAttachment2=data;
        },
        //qna게시판 댓글
        SET_QNABOARD_COMMENT(state,data){
            state.qnacomment=data;
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
          SET_INFO_ATTACHMENT(state,data){
            state.infoAttachment2=data;
        },

        //혜지
        //이력서 게시판 리스트
        SET_RBOARD(state, rboard) {
            state.rboard = rboard;
        }


    }//mutations 끝


})