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

//현주 //qnaBoard(qna게시판)
//조회
function fetchQnaBoardList() {
    return axios.get(`${config.Url}qna/qnaboardlist`)
}
//qna게시판 상세화면
function fetchQnaBoardView(QnaSeq){
    return axios.get(`${config.Url}qna/qnaBoardView${QnaSeq}`)
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

export {
    fetchPboardList,
    fetchPboardOne,
    fetchPboardUp,
    fetchPboardDel,
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

    //현주
    //qna게시판
    fetchQnaBoardList,
    fetchQnaBoardView,

     //민지
    //info 취업정보 
    fetchInfoList,
    fetchInfoDetail,
    fetchInfoDelete,
    fetchInfoUpdate,


}