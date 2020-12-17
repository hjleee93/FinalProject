<template>

<b-container fluid>
  
      <!-- 메인 이미지 -->
      <b-row>
          <div class="submenuimage">
             <p class="subtitle">Reference테스트백</p>
          </div>
      </b-row>
            
        <div class="container">          

            <!-- 탭 -->   
            <v-tabs
            centered
            color="grey darken-3"
            >
              <v-tab to='/refSite'><b>ALL</b></v-tab>
              <v-tab to='/refSitefront'><b>FrontEnd</b></v-tab>
              <v-tab to='/refSiteback'><b>BackEnd</b></v-tab>
              <v-tab to='/refSiteEtc'><b>ETC 기타</b></v-tab>
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
          @click="cardclick(ref)"
        >
        
        <!-- 이미지 -->
        <v-img
          class="white--text align-end"
          height="200px"
          width="350px"
          :src="`http://localhost:8082/itjobgo/ref/selectsiteImg${ref.refNo}`"
        >
        <!-- 수정필요(조회수) {{ref.refReadCount}} -->
        <v-card-title></v-card-title>
        </v-img>

        <v-card-text class="text--primary">
          <div id="title"><b>{{ref.refTitle}}</b><hr></div>
          <div id="content">{{ref.refContent}}</div>
        </v-card-text>
          <!-- 등록일 -->
          <div id="date">등록일 : {{formatDate(ref.refDate)}}</div>
        <v-card-actions class="test" >         
          <v-btn
          class="btn_site"
          elevation="2"
          outlined
          rounded
          color="accent"
        >
        
          <a href="" v-on:click.stop.prevent=openWindow(ref.refSiteAddr)> go Links </a>
        </v-btn>
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
        showModal:false,
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
    components:{
      
    },

    //메소드
    methods: {

      cardclick(value){
          this.$router.push({name:'refSiteView',params:{id:value.refNo}})
      },

      pdelete(){
          this.showModal=!this.showModal;
      },

      // 삭제 
      ydele(){
        let no=this.$route.params.id
        console.log(no);
         this.$store.dispatch("FETCH_REF_DELETE",no)
          //this.$router.push({name:'refSite'})
          //this.$router.go(this.$router.currentRoute);

      },
      
      // 삭제 취소
      ndele(){
        this.showModal=!this.showModal;
      },



      //링크 새로 열기
      openWindow: function (link) {
       window.open(link);
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
  text-align: center;
  margin-top: 2%;
  margin-bottom: 5%;
  font-size: 19px;
  color :#424874
}
#content{
  margin-left: 2%;
  font-size: 15px;
  height: 80px;
}
#date{ 
  color: #9BA4B4;
  /* margin-top: 6%; */
  font-size: 14px;
  margin-left: 20px;
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
.btn_site{
  border:1px #3a74df solid;
  margin-bottom: 3%;
  margin-top: 2%; 
  margin-left: 4%;
}

</style>