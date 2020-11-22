<template>
  <section class="banner-area relative" id="home">
    <div class="container main-top">
      <div
        class="row fullscreen d-flex align-items-center justify-content-center"
      >
      
      <!-- serach 바 -->
        <div class="banner-content col-lg-12">
          <form action="" class="serach-form-area">
            <div class="row justify-content-center form-wrap">
              <div class="col-lg-4 form-cols ">
                <input
                
                  type="text"
                  class="form-control"
                  name="search"
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
                <b-button type="button" class="btn btn-info" @click="jobSearch(inputSearch)">
                  <span class="lnr lnr-magnifier"></span> Search
                </b-button>
              </div>
            </div>
          </form>
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
        <!-- 자유게시판같은 게시판 글 연동  -->
        <div class="col-4 pl-0">
          <div class="row">
            <div class="card col-6 m-0 p-0 info-card">
              <div class="col-8 p-l-0">
                <h5>자유게시판~~~</h5>
                <p class="text-muted m-b-0">자유게시판</p>
              </div>
            </div>
            <div class="card col-6 m-0 p-0 info-card">
              <div class="col-8 p-l-0">
                <h5>회사이름</h5>
                <p class="text-muted m-b-0">직무</p>
              </div>
            </div>
            <div class="card col-6 m-0 p-0 info-card">
              <div class="col-8 p-l-0">
                <h5>QNA</h5>
                <p class="text-muted m-b-0">QNA</p>
              </div>
            </div>
            <div class="card col-6 m-0 p-0 info-card">
              <div class="col-8 p-l-0">
                <h5>10K</h5>
                <p class="text-muted m-b-0">Visitors</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-4 p-0">
          <div class="card table-card">
            <div class="card-header ">
              <h5>최근협업</h5>
            </div>
            <table>
              <tr>
                <td>
                  <div class="table-content">
                    <p>
                      뉴스제목뉴스제목뉴스제목뉴스제목뉴스제목뉴스제목뉴스제목뉴스제목
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-content">
                    <p>뉴스제목</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-content">
                    <p>뉴스제목</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="table-content">
                    <p>뉴스제목</p>
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
              <a @click="moveDetailPage(item.wantedAuthNo._text)"  class="job-card">
                <div class="card-body">
                    <div class="card-title">{{ item.company._text }}</div>
                    <div>
                      <b-card-text>{{ item.title._text }}</b-card-text>
                    </div>

                    <div>
                      <b-card-text>등록 일자: {{ item.regDt._text }}</b-card-text>
                    </div>                    
                </div>
              </a>
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
             <router-link :to="{name:'jobInfo', params:{wantedNo: item.wantedAuthNo._text}}" class="job-card" >
                <div class="card-body">
               
                    <div class="card-title">{{ item.company._text }}</div>
                    <div>
                      <b-card-text>{{ item.title._text }}</b-card-text>
                    </div>
                    <div>
                      <b-card-text>등록 일자: {{ item.regDt._text }}</b-card-text>
                    </div>
                                      
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
const { mapState } = createNamespacedHelpers("jobStore");


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
    
    moveDetailPage: function(e){
       this.$router.push({
        name: 'jobInfo',
        params: {wantedNo:e}});
    },
    //서치바 
    jobSearch: function(e){
       this.$router.push({ 
              name: "jobList",
              params: { keyword: e },
            }); //이메일 찾음 -> 페이지 이동
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
    this.$store.dispatch('jobStore/loadXml')
  },
  computed:{
    ...mapState([
      //매핑값
      'jobs'
    ])
  }
  
};
</script>
<style scoped>

.job-card{
  text-decoration: none;
  color:black;
}

.job-card:hover{
  cursor: pointer;
}

.card-title{
  text-align:center;
  font-size: 20px;
  font-weight: bold;
}
.table-content {
  height: 50px;
}
.info-card {
  border: 1px solid #ededed;
  height: 130px;
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
</style>
