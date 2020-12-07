import axios from 'axios'

//HTTP Request & Response와 관련된 기본 설정
const config = {
    Url: "http://localhost:8082/itjobgo/"
}

//2.API 함수들을 정리
function fetchPboardList() {
    return axios.get(`${config.Url}portfolio/portfolioList.do`)
    //백틱 es6사용
    //return 해주는것이 핵심
}
function fetchPboardOne(pboardNo) {
    return axios.get(`${config.Url}portfolio/pboardinfo${pboardNo}.do`)
}
function fetchPboardDel(no) {
    return axios.post(`${config.Url}portfolio/pboarddel${no}.do`)
}
function fetchPboardUp(no) {
    return axios.get(`${config.Url}portfolio/pbaordupdate${no}.do`)
}
//첨부파일내용가져오기
function fetchAttachment(no){
    return axios.get(`${config.Url}portfolio/attachment${no}.do`)
}
function fetchcomment(no){
    return axios.get(`${config.Url}portfolio/commentList${no}.do`)
}
function fetchcommentdel(no){
    return axios.post(`${config.Url}portfolio/commentdel${no}.do`)
}

//모임
function fetchMeeting() {
    return axios.get(`${config.Url}meeting/meetingList.do`);
}
function fetchmsublist(){
    return axios.get(`${config.Url}meeting/meetingsubList.do`);
}
function fetchMeetinginfo(no){
    return axios.get(`${config.Url}meeting/meetinginfo${no}.do`)
}





//주은
//1.communityBoard(자유게시판)
//자유게사판 조회
function fetchCommunityBoardList() {
    return axios.get(`${config.Url}community/communityBoardList`)
}
// 자유게시판 상세화면
function fetchCommunityBoardView(boardSq) {
    return axios.get(`${config.Url}community/communityBoardView${boardSq}`)
}
//자유게시판 삭제하기
function fetchCommunityBoardDelete(boardSq) {
    return axios.post(`${config.Url}community/communityBoardDelete${boardSq}`)
}
//자유게시판 수정하기(게시판번호로 객체 값 불러오기 )
function fetchCommunityBoardUpdate(boardSq) {
    return axios.get(`${config.Url}community/communityBoardUpdate${boardSq}`)
}
//첨부파일 가져오기(파일 다운로드)
function fetchCoummunityBoardAttachment(boardSq){
     return axios.get(`${config.Url}community/communityBoardAttachment${boardSq}`)
}
//댓글 조회하기
function fetchCboardCommentSelectList(cboardNo){
    return axios.get(`${config.Url}community/commentSelectOne${cboardNo}`)
}
//댓글  삭제하기
function fetchCboardCommentDelete(cboardNo){
    return axios.post(`${config.Url}community/commentDelete${cboardNo}`)
}


//공지사항 조회
function fetchNoticeList(){
   return axios.get(`${config.Url}notice/noticeList`)
}
// 공지사항 상세화면
function fetchNoticeView(noticeSq) {
    return axios.get(`${config.Url}notice/noticeView${noticeSq}`)
}
//공지사항 삭제하기
function fetchNoticeDelete(noticeSq) {
    return axios.post(`${config.Url}notice/noticeDelete${noticeSq}`)
}
//공지사항 수정하기(게시판번호로 객체 값 불러오기 )
function fetchNoticeBoardUpdate(noticeSq) {
    return axios.get(`${config.Url}notice/noticeUpdate${noticeSq}`)
}
//첨부파일 가져오기(파일 다운로드)
function fetchNoticeAttachment(noticeSq){
     return axios.get(`${config.Url}notice/noticeAttachment${noticeSq}`)
}
//댓글 조회하기
function fetchNTboardCommentSelectList(ntBoardNo){
    return axios.get(`${config.Url}notice/commentSelectOne${ntBoardNo}`)
}
//댓글  삭제하기
function fetchNTboardCommentDelete(ntCommentNo){
    return axios.post(`${config.Url}notice/commentDelete${ntCommentNo}`)
}


//현주 //qnaBoard(qna게시판)
//qna 게시판 조회
function fetchQnaBoardList() {
    return axios.get(`${config.Url}qna/qnaboardlist`)
}
//qna게시판 상세화면
function fetchQnaBoardView(qboardNo){
    return axios.get(`${config.Url}qna/qnaBoardView${qboardNo}`)
}
//qna게시판 삭제하기
function fetchQnaBoardDelete(qboardNo){
    return axios.post(`${config.Url}qna/qnaBoardDelete${qboardNo}`)
}
//qna게시판 수정하기(게시판번호로 객체 값 불러오기 )
function fetchQnaBoardUpdate(qboardNo) {
    return axios.get(`${config.Url}qna/qnaBoardUpdate${qboardNo}`)
}
//qna게시판 첨부파일 가져오기(파일 다운로드)
function fetchQnaBoardAttachment(qboardNo){
    return axios.get(`${config.Url}qna/qnaBoardAttachment${qboardNo}`)
}
//qna게시판 댓글 가져오기
function fetchqnacomment(qboardNo){
    return axios.get(`${config.Url}qna/commentSelectOne${qboardNo}`) 
}
//qna게시판 댓글 삭제
function fetchqnacommentdel(qboardCommentNo){
    return axios.post(`${config.Url}qna/commentDelete${qboardCommentNo}`)
}


// 민지
// info(취업정보)
// 조회 리스트
function fetchInfoList(){
    return axios.get(`${config.Url}info/infoList`)
}
// 상세화면
function fetchInfoDetail(infoSq){
    return axios.get(`${config.Url}info/infoDetail${infoSq}`)
}
// 삭제하기
function fetchInfoDelete(infoSq){
    return  axios.post(`${config.Url}info/infoDelete${infoSq}`)
}
// 수정하기(게시판번호로 객체 값 불러오기 )
function fetchInfoUpdate(infoSq){
    return axios.get(`${config.Url}info/infoUpdate${infoSq}`)
}
//첨부파일 다운로드
function fetchInfoAttachment(infoSq){
    return axios.get(`${config.Url}info/infoAttachment${infoSq}`)
}


//혜지
//이력서 게시판 리스트
function fetchRboardList() {
    return axios.get(`${config.Url}resume/rboardList.do`)

}
export {
    fetchPboardList,
    fetchPboardOne,
    fetchPboardUp,
    fetchPboardDel,
    fetchAttachment,
    fetchcomment,
    fetchcommentdel,
    //모임
    fetchMeeting,
    fetchMeetinginfo,
    fetchmsublist,
  

    //주은
        //자유게사판CommunityBoard
    fetchCommunityBoardList,
    fetchCommunityBoardView,
    fetchCommunityBoardDelete,
    fetchCommunityBoardUpdate,
    fetchCoummunityBoardAttachment,
    fetchCboardCommentSelectList,
    fetchCboardCommentDelete,
        //공지사항 Notice
    fetchNoticeList,
    fetchNoticeView,
    fetchNoticeDelete,
    fetchNoticeBoardUpdate,
    fetchNoticeAttachment,
    fetchNTboardCommentSelectList,
    fetchNTboardCommentDelete,


    //현주
    //qna게시판
    fetchQnaBoardList,
    fetchQnaBoardView,
    fetchQnaBoardDelete,
    fetchQnaBoardUpdate,
    fetchQnaBoardAttachment,
    fetchqnacomment,
    fetchqnacommentdel,

     //민지
    //info 취업정보 
    fetchInfoList,
    fetchInfoDetail,
    fetchInfoDelete,
    fetchInfoUpdate,
    fetchInfoAttachment,


    //혜지
    //이력서게시판
    fetchRboardList,

}

    
    

