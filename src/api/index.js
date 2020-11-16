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

export {
    fetchPboardList,
    fetchPboardOne,
    fetchPboardDel
}