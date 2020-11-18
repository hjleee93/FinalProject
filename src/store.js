import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {
                //동욱
                fetchPboardList,
                fetchPboardOne,
                fetchPboardDel,
                fetchPboardUp,
              
                //주은
                fetchCommunityBoardList,
                fetchCommunityBoardView,
                fetchCommunityBoardDelete,
            
            } 
    from './api/index.js';
            
Vue.use(Vuex, axios)

var convert = require('xml-js')
let allCategory= 'http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=20&occupation=214200|214201|214202|214302|022|023|024|025|056'
export default new Vuex.Store({
    state: {
        userData:[],
        data: [],
        jobs:[],
        pboard:[],

        pboardone:[],
        msg:'',
        attachment:[],

        //주은
        communityboard:[],
        communityboardView:[],
        

        loginStatus: false,//로그인 성공 여부
        loginError: false,
        

        
    },
    actions: {
        loadXml({ commit }) {
            //최신 채용 정보 xml
            axios.get(allCategory)
                .then((response) => { 
                    let data = response.data
                    //xml to json
                    let json = convert.xml2json(data, { compact: true })
                    this.jobs = JSON.parse(json)
                    commit('SET_POST', this.jobs) 
                    
              });
        },

        login({commit, dispatch }, loginData) {
            
            axios
            .post('http://localhost:8082/itjobgo/member/login',loginData)
                .then(res => {
                    let token = res.data.token;
                    
                if(token === undefined){//로그인 실패 토큰값 없는 경우
                    console.log("토큰 없: " + loginData)
                    commit('loginFalse')
                  
                } else {//토큰값 있음
                    
                    localStorage.setItem("memberEmail", loginData.memberEmail)
                    localStorage.setItem("access_token", token)//토큰 로컬스토리지에 저장
                    dispatch("getMemberInfo", loginData)
                    
                    // console.log("토큰 있: " + res)
                    // document.cookie = `accessToken=${res.data.token}`;
                    // //cookie를 이렇게 넣는다고..?
                    // axios.defaults.headers.common['x-access-token'] = res.data.token;               
                  
                }
                
              })
              .catch((error) => console.log(error));
          
            
          
        },
        //유저 정보 가져오기
        getMemberInfo({ commit }) {
            let memberEmail= localStorage.getItem("memberEmail")
            let token = localStorage.getItem("access_token")
            console.log(memberEmail)
            console.log(token);
            let config = {
                //헤더에 토큰값 포함해서 보내기
                headers: {
                    "access-token": token
                }
            }
            //토큰으로 member return  
            axios
            .get('http://localhost:8082/itjobgo/member/getMember?memberEmail='+ memberEmail,config)
                .then(response => {
                    var userData = {
                        memberAddr: response.data.memberAddr,
                        memberAddrDtl: response.data.memberAddrDtl,
                        memberAddrExtra: response.data.memberAddrExtra,
                        memberEmail: response.data.memberEmail,
                        memberLevel: response.data.memberLevel,
                        memberName: response.data.memberName,
                        memberPhone: response.data.memberPhone,
                        memberPostCode: response.data.memberPostCode
                    }
                commit('loginSuccess', userData)
             })
            .catch(() => {
                alert("에러")
        })
        
    },

        FETCH_PBOARD({commit}){
            //인자로 centext가 제공 centext.commit
            fetchPboardList()
            .then(({data})=>commit("SET_PBOARD",data))
            .catch(({error}) =>{
                console.log(error);
              }) 

        },
        FETCH_PBOARDONE({commit},pboardNo){
            fetchPboardOne(pboardNo)
            .then(({data})=>commit("SET_PBOARDONE",data))
            .catch(({error})=>console.log(error))
        },

        FETCH_PBOARDDEL({commit},no){
            fetchPboardDel(no)
            .then(({data})=>commit("SET_PBOARDDEL",data))
            .catch(({error})=>console.log(error))
        },


        FETCH_PBOARDUP({commit},no){
            fetchPboardUp(no)
            .then(({data})=>commit("SET_PBOARDUP",data))
            .catch(({error})=>console.log(error))
        },
        
        




        //주은
        //자유게시판 list 불러오기
        FETCH_COMMUNITYBOARD({commit}){
            fetchCommunityBoardList()
            .then(({data})=>commit("SET_COMMUNITYBOARD",data))
            .catch(({error}) =>{
                console.log(error);
              }) 
        },
        //자유게시판 상세화면
        FETCH_COMMUNITYBOARD_VIEW({commit},communityboardNo){
            fetchCommunityBoardView(communityboardNo)
            .then(({data})=>commit("SET_COMMUNITYBOARD_VIEW",data))
            .catch(({error}) =>{
                console.log(error);
              }) 
        },
        //자유게시판 삭제하기
        FETCH_COMMUNITYBOARD_DELETE({commit},communityboardNo){
            fetchCommunityBoardDelete(communityboardNo)
            .then(({data})=>commit("SET_COMMUNITYBOARD_DELETE",data))
            .catch(({error})=>{
                console.log(error);
            })
        }


    },//action
    mutations: {
        SET_POST(state, jobs) {
            state.jobs = jobs
        },
        SET_PBOARD(state,pboard){
            state.pboard=pboard;
        },
        SET_PBOARDONE(state,pboardone){
            state.pboardone=pboardone;
        },
        SET_PBOARDDEL(state,data){
            state.msg=data
            
        },
        SET_PBOARDUP(state,data){
            state.attachment=data;
        },

        //주은
        //자유게시판 리스트
        SET_COMMUNITYBOARD(state,communityboard){
            state.communityboard=communityboard;
        },
        //자유게사판 상세화면
        SET_COMMUNITYBOARD_VIEW(state,communityboardView){
            state.communityboardView=communityboardView;
        },
        //자유게시판 삭제
        SET_COMMUNITYBOARD_DELETE(state,communityboardDelete){
            state.communityboardDelete=communityboardDelete
        },




         //로그인 성공
         loginSuccess(state, payload) {
            
            state.loginStatus = true;
             state.loginError = false;
             state.userData = payload;
             console.log("로그인성공" + payload.memberEmail);
        },
        //로그인 실패
        loginFalse(state) {
            console.log("로그인실패");
            state.loginStatus = false;
            state.loginError = true;
        }


    }
   
})