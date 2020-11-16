import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {
                //동욱
                fetchPboardList,
                fetchPboardOne,
                //주은
                fetchCommunityBoardList,
                fetchCommunityBoardView
            
            } 
            from './api/index.js';

Vue.use(Vuex,axios)

var convert = require('xml-js')
let allCategory= 'http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=20&occupation=214200|214201|214202|214302|022|023|024|025|056'
export default new Vuex.Store({
    state: {
        data: [],
        jobs:[],
        pboard:[],

        pboardone:[],

        //주은
        communityboard:[],
        communityboardView:[],

        pboardone: [],
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

        login({commit }, loginData) {
            
            axios
            .post('http://localhost:8082/itjobgo/member/login',loginData)
            .then(res=> {
                if(res.data.token === undefined){//로그인 실패 토큰값 없는 경우
                    console.log("토큰 없: " + res.data.token)
                    commit('loginFalse')
                  
                }else{//토큰값 있음
                    console.log("토큰 있: " + res.data.token)
                    document.cookie = `accessToken=${res.data.token}`;
                    //cookie를 이렇게 넣는다고..?
                    axios.defaults.headers.common['x-access-token'] = res.data.token;
                    console.log(axios.defaults.headers.common['x-access-token']);
                    commit('loginSuccess')
                  
                }
                
              })
              .catch((error) => console.log(error));
          
            
          
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
        FETCH_COMMUNITYBOARD_VIEW({commit,communityboardNo}){
            fetchCommunityBoardView(communityboardNo)
            .then(({data})=>commit("SET_COMMUNITYBOARD_VIEW",data))
            .catch(({error}) =>{
                console.log(error);
              }) 
        },


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

        //주은
        //자유게시판 리스트
        SET_COMMUNITYBOARD(state,communityboard){
            state.communityboard=communityboard;
        },
        //자유게사판 상세화면
        SET_COMMUNITYBOARD_VIEW(state,communityboardView){
            state.communityboardView=communityboardView;
        },





    }
   
})