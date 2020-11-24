<template>
  <section class="banner-area relative" id="home">
    <div class="container main-top">
      <div
        class="row fullscreen d-flex align-items-center justify-content-center"
      >
      
      <!-- serach 바 -->
        <div class="banner-content col-lg-12">
          <b-form action="" class="serach-form-area">
            <div class="row justify-content-center form-wrap">
              <div class="col-lg-4 form-cols ">
                <b-form-input                
                  type="text"
                  class="form-control"
                  name="search"
                  v-model="keyword"
                  placeholder="검색어를 입력해주세요"/>
              </div>
              <div class="col-lg-3 form-cols">
                <div>
                  <b-button
                  
                    
                    v-b-toggle.collapse-1 
                    class="form-control"
                    v-model="selectedLocation"
                    
                  >수정수정</b-button>
                  <b-collapse id="collapse-1" class="mt-2">
                  <b-card>
      <p class="card-text">Collapse contents Here</p>
                  </b-card>
                  </b-collapse>
                </div>
              </div>
              
              <div class="col-lg-3 form-cols ">
                <div>
                  <b-form-select
                    class="form-control"
                    v-model="selectedJob"
                    :options="options2"
                  ></b-form-select>
                </div>
              </div>

              <div class="col-lg-2 form-cols">
                <b-button type="button" class="btn btn-info" @click="jobSearch()">
                  <span class="lnr lnr-magnifier"></span> Search
                </b-button>
              </div>
            </div>
          </b-form>
        </div>

        <!-- 메인 -->
        <div class="col-4 pl-0">
          <b-carousel
            id="carousel-1"

            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
          >
            <!-- Text slides with image -->
            <b-carousel-slide
              caption="First slide"
              text="Nulla vitae elit libero, a pharetra augue mollis interdum."
              
            ><p>뉴스제목뉴스제목뉴스제목뉴스제목뉴스제목뉴스제목뉴스제목뉴스제목</p>
            </b-carousel-slide>

          </b-carousel>
        </div>
        <!-- 자유게시판  -->
        <div class="col-4 pl-0">
          
          <div class="row">
            <template v-if="communityboard">
            <div class="card col-6 m-0 p-0 info-card"  >
            
              <div class="m-2">
                <b-btn class="ntc-btn">공지</b-btn><span></span>
                
                <p class="text-muted m-b-0"></p>
              </div>
            </div>
            </template>
            <template v-if="communityboard">
            <div class="card col-6 m-0 p-0 info-card"  >
            
              <div class="m-2">
                <b-btn class="com-btn">자유</b-btn>
                <router-link :to="{name:'CommunityBoardView', params:{id:communityboard[0].boardSq}}" class="commu-router">
                <span>{{communityboard[0].boardTitle}}</span>
                <p class="text-muted m-b-0">{{communityboard[0].boardContent}}</p>
                </router-link>
              </div>
            </div>
            </template>
            
           
            <!-- qna -->
            <template v-if="qnaboard">
            <div class="card col-6 m-0 p-0 info-card"  v-for="i in 2" :key="i">
              
              <div class="m-2">
                <router-link :to="{name:'qnaView', params:{id:qnaboard[i].qnaSeq}}" class="qna-router">
                <div class="qst"><b-btn class="qna-btn">질문</b-btn>
                <span>{{qnaboard[i].qnaTitle}}</span>
                </div>
                <p class="text-muted m-b-0">{{qnaboard[i].qnaContent}}</p>
                <div class="ans"><b-btn class="ans-btn">답변</b-btn><span>{{qnaboard[i].qnaAnswerYn}}</span></div>
                </router-link>
              </div>
              
            </div>
            </template>
          </div>
        </div>

        <div class="col-4 p-0 collab">
          <div class="card table-card collab">
            <div class="card-header " >
              <h5 class="text-center" >최근 등록된 모임</h5>
            </div>
            <table>
              <tr v-for="i in 4" :key="i">
                <td>
                  <div class="table-content">
                    <router-link :to="{name:'meetinginfo', params:{id:meeting[i].collabSq}}" class="collab-router">
                    <p class="m-2"><b>{{meeting[i].collabTitle}}</b></p>
                    <p class="m-2 txt">{{meeting[i].collabSimcontent}}</p></router-link>
                  </div>
                </td>
              </tr>
              
            </table>
          </div>
        </div>
      </div>
    </div>

    
    <!-- 추천채용정보 : 로그인한 회원 정보와 연동됨-->
    <div class="container">
      <h3 class="m-3"><strong class="tit_cont">추천 채용 정보</strong></h3>
      <div class="row">
        <div class="col-xl-3 col-sm-6 col-12" v-for="(item, i) in rcmJson.wantedRoot.wanted" :key="i">
           <div class="card h-100">
                <router-link :to="{name:'jobInfoDtl', params:{wantedNo: item.wantedAuthNo._text}}" class="job-card" >
                <div class="card-body">
                    <div class="card-title">{{ item.company._text }}</div>
                    <div>
                      <b-card-text>{{ item.title._text }}</b-card-text>
                    </div>

                    </div>
                    <div class="card-footer">
                     <small> <b-card-text>등록 일자: {{ item.regDt._text }}</b-card-text></small>
                    </div>                    
                
              </router-link>  
            </div>
          
        </div>
      </div>
    </div>
<!-- 최신채용정보 -->
    <div class="container">
      <h3 class="m-3"><strong class="tit_cont">최신 채용 정보</strong></h3>
      <div class="row">
        <div class="col-xl-3 col-sm-6 col-12"  v-for="(item, i) in jobs.wantedRoot.wanted" :key="i">
           <div class="card h-100">
             <router-link :to="{name:'jobInfoDtl', params:{wantedNo: item.wantedAuthNo._text}}" class="job-card" >
                <div class="card-body">
               
                    <div class="card-title">{{ item.company._text }}</div>
                    <div>
                      <b-card-text>{{ item.title._text }}</b-card-text>
                </div>
                    </div>
                    <div class="card-footer">
                      <small><b-card-text>등록 일자: {{ item.regDt._text }}</b-card-text></small>
                    </div>
                                      
                
                </router-link>  
            </div>
          
        </div>
      </div>
    </div>
    
  </section>
  
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { mapState } from "vuex";
const { mapState:jobState } = createNamespacedHelpers("jobStore");
const { mapState:memberState } = createNamespacedHelpers("memberStore");


var convert = require('xml-js')

//로그인한 사람에 따라 추천 parmeter 수정하기
let rcm = "http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=30&occupation=024"



export default {
  data() {
    return {
      // inputSearch,//search bar 검색어 
      rcmJson:[],//추천 채용정보 
      selectedLocation: null,
      selectedJob: null,
      keyword:'',
   
      options2: [
        { value: null, text: "직무를 선택해주세요" },
        { value: "aa", text: "Web developer" },
        { value: "bb", text: "Selected Option" },
        { value: { CC: "3PO" }, text: "This is an option with object value" },
        { value: "dd", text: "This one is disabled", disabled: true },
      ],
    };
  },
  methods: {
    //서치바 
    jobSearch: function(){
      let keyword= this.keyword;
       this.$router.push({ 
              name: "jobSearchDtl",
              params: { keyword: keyword }//검색 keyword pass
            }); 
    },
  },
    created () {
      
    this.$http.get(rcm)//추천 채용정보
      .then((response) => {
        var xml = response.data
        var json = convert.xml2json(xml, { compact: true })
        this.rcmJson = JSON.parse(json);        
        
      })
  
  },
  mounted(){
    //action에 있는 loadXml 호출용 
    this.$store.dispatch('jobStore/loadXml'),
    this.$store.dispatch("FETCH_QNABOARD"),
    this.$store.dispatch("FETCH_COMMUNITYBOARD"),
    this.$store.dispatch("FECH_MEETINGLIST")
  },
  computed:{
    //구직정보 데이터
    ...jobState([
      //매핑값
      'jobs'
    ]),
    //유저데이터 호출
    ...memberState([
      'userData'
    ]),
    ...mapState([
      'qnaboard','communityboard','meeting'
    ])
  }
  
};
</script>
<style scoped>
/* 상단 박스 css */

.collab-router,.qna-router,.commu-router{
  text-decoration: none;
  color:black;
}

.qna-btn, .ans-btn,.com-btn,.ntc-btn{
    height: 26px !important;
    width: 45px !important;
    font-size: 13px;
    padding: 0px;
    display: inline-block;
    cursor: auto !important;
    pointer-events: none;
}
.qna-btn{
  border-color: #ee6f57;
  color:#ee6f57;
  background-color: white;
}
.ans-btn{
  border-color: #16a596;
  color:#16a596;
  background-color: white;
}
.com-btn{
   border-color: #424874;
  color:#424874;
  background-color: white;
  
}
.ntc-btn{
   border-color: #a20a0a;
  color:#a20a0a;
  background-color: white;
}
.job-card{
  text-decoration: none;
  color:black;
}
.card.table-card {
  border-radius: 0px !important;
  
}

.job-card:hover{
  cursor: pointer;
}

.card-title{
  text-align:center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1.75rem !important;
}
.table-content {
  height: 75px;
  border-bottom:1px solid #ededed
}
.card-header+table tr:last-child .table-content{
  border-bottom:none;
}
.info-card {
  border: 1px solid #ededed;
  height: 130px;
  border-radius: 0px !important;
}
.card-title{
  height:60px;
}
.card-footer{
  height:45px;
}
.card-text{
  height:50px;
}

.main-top {
  height: 500px;
  
}
.banner-content .form-wrap {
  border: 3px solid  #424874;
}
.banner-content .form-wrap .btn-info {
  background-color: #424874;
  width: 100%;
  height: 100%;
  color: #fff;
  border-radius: 0;
  border: none;
  text-transform: uppercase;
}
.banner-content .form-wrap .form-control {
  height: 40px;
  border-radius: 0;
  font-size: 14px;
}
.card.table-card {
  height: 385px;
}
div[role="region"] {
  height: 385px;
}
.info-card[data-v-8dc7cce2]{
  height: 193px;
}

.main-top[data-v-8dc7cce2]{
  height:auto;
}
.qst+.text-muted{
    max-height: 68px;
    overflow: hidden;
}
.ans{
  width: 100%;
  min-height: 50px;
  position: absolute;
  bottom: 0;
    
}
.txt{
  width:365px;    
  height:30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  }
  .card.table-card[data-v-8dc7cce2]{
    overflow:hidden;
  }
  .card-header+table tr td:hover{
    background-color: #f4eef4;
  }
  .card:not(.collab):hover{
    background-color: #f4eef4;
  }
  
</style>
