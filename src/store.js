import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {fetchPboardList} from './api/index.js';
Vue.use(Vuex,axios)

var convert = require('xml-js')

export default new Vuex.Store({
    state: {
        data: [],
        jobs:[],
        pboard:[],
        
    },
    actions: {
        loadXml({ commit }) {
            //최신 채용 정보 xml
            axios.get("http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=20&occupation=214200|214201|214202|214302|022|023|024|025|056")
                .then((response) => { 
                    let data = response.data
                    //xml to json
                    let json = convert.xml2json(data, { compact: true })
                    this.jobs = JSON.parse(json)
                    commit('SET_POST', this.jobs) 
                    
              });
        },
        FETCH_PBOARD({commit}){
            //인자로 centext가 제공 centext.commit
            fetchPboardList()
            .then(({data})=>commit("SET_PBOARD",data))
            .catch(({error}) =>{
                console.log(error);
              }) 

        }
        
    },
    mutations: {
        SET_POST(state, jobs) {
            state.jobs = jobs
        },
        SET_PBOARD(state,pboard){
            state.pboard=pboard;
        }
    }
   
})