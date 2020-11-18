import axios from 'axios'

//HTTP Request & Response와 관련된 기본 설정
const config ={
    Url:"http://localhost:8082/itjobgo/"
}

//2.API 함수들을 정리
function fetchPboardList(){
    return axios.get(`${config.Url}portfolio/portfolioList.do`)
    //백틱 es6사용
    //return 해주는것이 핵심
}
function fetchPboardOne(pboardNo){
    return axios.get(`${config.Url}portfolio/pboardinfo${pboardNo}.do`)
}
function fetchPboardDel(no){
    return axios.post(`${config.Url}portfolio/pboarddel${no}.do`)
}
function fetchPboardUp(no){
    return axios.get(`${config.Url}portfolio/pbaordupdate${no}.do`)
}


//주은
//communityBoard

//자유게사판 조회
function fetchCommunityBoardList(){
    return axios.get(`${config.Url}community/communityBoardList`)
}

// 자유게시판 상세화면
function fetchCommunityBoardView(boardSq){
    return axios.get(`${config.Url}community/communityBoardView${boardSq}`)
}

//자유게시판 삭제하기
function fetchCommunityBoardDelete(boardSq){
    return  axios.post(`${config.Url}community/communityBoardDelete${boardSq}`)
}

export {
    fetchPboardList,
    fetchPboardOne,
    fetchPboardUp,
    fetchPboardDel,

    //주은
    //자유게사판CommunityBoard
    fetchCommunityBoardList,
    fetchCommunityBoardView,


    fetchCommunityBoardDelete,

}