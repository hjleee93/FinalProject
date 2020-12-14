<template>

<b-container fluid>
  
      <!-- 메인 이미지 -->
      <b-row>
          <div class="submenuimage">
             <p class="subtitle">Reference</p>
          </div>
      </b-row>
            
        <div class="container">          

            <!-- 탭 -->   
            <v-tabs
            centered
            color="grey darken-3"
            >
              <v-tab><b>ALL</b></v-tab>
              <v-tab><b>FrontEnd</b></v-tab>
              <v-tab><b>BackEnd</b></v-tab>
              <v-tab><b>ETC 기타</b></v-tab>
              <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
            </v-tabs>

          <div>
            <h4 class="sub-header-ref">분야별 웹 사이트</h4>
            <v-btn to="/refWrite" exact  id="st_write_ref">글쓰기</v-btn>
          </div>
    <div class="overflow-auto">


    <div class="site_ect">
    <!-- /.row -->
    <div class="row card-align">
    <!-- card -->

      <v-card
          class="mx-auto"
          max-width="330"
          v-for="ref in refList" :key="ref.id"
        >
          <!-- @click="cardclick(ref)" -->

        <!-- 이미지 -->
        <v-img
          class="white--text align-end"
          height="200px"
          :src="`http://localhost:8082/itjobgo/ref/selectsiteImg${ref.refNo}`"
        >
        <!-- 수정필요(조회수) -->
        <v-card-title>{{ref.refReadCount}}</v-card-title>
        </v-img>

        <v-card-text class="text--primary">
          <div id="title"><b>{{ref.refTitle}}</b></div>
          <div id="content">{{ref.refContent}}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="blue"
            text
            >
            사이트 바로가기??
          </v-btn>
          <!-- 등록일 -->
          <h6 id="date">{{formatDate(ref.refDate)}}</h6>
        </v-card-actions>
      </v-card>
      
      </div>

          <!-- search bar -->
          <!-- <div class="search-align">
          <b-navbar-nav class="ml-auto st_search">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit" id=searchbtn>Search</b-button>
            </b-nav-form>
          </b-navbar-nav>
          </div> -->

    </div>



        </div>

      </div>

</b-container>
</template>

<script>
  import { mapState } from 'vuex';
  import Vue from 'vue'
  import vueMoment from 'vue-moment';
  const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
  import { createNamespacedHelpers } from "vuex";

  Vue.use(vueMoment);

  export default {
    
    data() {
      return {
        perPage: 4,
        currentPage: 1,
      }
    },
    computed:{
      ...mapState({
      refList:state=>state.refList
     }),
      ...loadUserState(['userData'])
    },
    created() {
       this.$store.dispatch("FECH_REF_LIST")
    },
    methods: {
      // cardclick(value){
      //     this.$router.push({name:'refSiteView',params:{id:value.refNo}})
      // },
      //링크 새로 열기
      openWindow: function (link) {
       window.open(link);
      },

      //https:// 아닐때도 링크 연결====테스트중====
      movePage: function() {
      if (
        this.it.newsRefSite.includes("http") == false
      ) {
      var url = "https://" + this.it.newsRefSite._text;
      } else {
        url = this.it.newsRefSite._text;
      }
      document.getElementById("homePage").setAttribute("href", url);
    },


        // 날짜변환 함수
    formatDate(value) {
      // console.log(value);
      return this.$moment(value).format("YYYY-MM-DD");
    },

    },

}
</script>



<style scoped >
* {
   font-family: 'Nanum Gothic', sans-serif;
}
.site_ect{
  margin-bottom:20px;
  margin-left: 20px;
  margin-right: 50px;
  margin-top: 20px;
}
.st_search{
  position:absolute;
  left:67%;
}
.sub-header-ref{
  position: relative;
  left:18px;
  top:70px;
  margin-bottom: 3%;
}
#st_write_ref{
  left:990px;
  position: relative;
  top: 5px;
  background-color: #424874;
  border:none;
  color:white;
}
#searchbtn{
  background-color: #9BA4B4;
  border: 1px  #9BA4B4 solid;
}
.search-align{
    margin-top: 2%;
    margin-bottom: 12%;
}
#title{
  margin-top: 2%;
  margin-bottom: 5%;
  font-size: 22px;
  color :#424874
}
#content{
  font-size: 18px;
}
#date{ 
  color: #9BA4B4;
  margin-top: 2%;
  font-size: 15px;
  margin-left: 25%;
}
 .mx-auto{
  margin: 1.5%;
}
.submenuimage{
    width: 100%;
    height:180px;
    background-color:#F4EEFF;
    text-align: center;
    line-height: 180px;
}
.subtitle{
  font-family: 'Barlow Semi Condensed', sans-serif;
  color:#4e5157 ;
  font-size: 50px;
}

</style>