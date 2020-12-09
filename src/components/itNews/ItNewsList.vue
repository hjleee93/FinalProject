<template>

<b-container fluid>
  
      <!-- 메인 이미지 -->
      <b-row>
          <div class="submenuimage">
             <p id="subtitle">ItNews</p>
          </div>
      </b-row>
              
        <div class="container">          
            <!-- 탭 -->   
          <v-tabs
          centered
          color="grey darken-3"
          >
            <v-tab to="/noticeList"><b>공지사항</b></v-tab>
            <v-tab to="/itNewsList"><b>IT소식</b></v-tab>
            <v-tab to="/communityBoardList"><b>자유게시판</b></v-tab>
            <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
          </v-tabs>

          <div>
            <v-btn to="/itNewsForm" exact  id="st_write_ref" v-if="userData.memberSq!=null">글쓰기</v-btn>
          </div>

    <div class="overflow-auto">


    <div class="site_ect">
    <!-- /.row -->
    <div class="row card-align">
    <!-- card -->

       <v-card
          class="mx-auto mcard"
          max-width="250"
          v-for="it in itnewsList" :key="it.id"
          @click="cardclick(it)"
        >
        <!-- 이미지 -->
        <v-img
          class="white--text align-end"
          max-width="350px"
          :src="`http://localhost:8082/itjobgo/itnews/imagesrequest${it.newsSq}`"
        >
        <v-card-title></v-card-title>
        </v-img>

        <v-card-text class="text--primary">
          <div id="title">{{it.newsTitle}}</div>
          <div id="content">{{it.newsContent}}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="blue"
            text
            >
             <!-- @mouseover="movePage" -->

          <a href="" v-on:click.stop.prevent="openWindow(it.newsRefSite)" id="link_a">링크 바로가기</a>
          

                 
              <!-- <a id="homePage"  @mouseover="movePage">{{
                it.newsRefSite._text
              }}테스트 링크</a> -->
      
          
          </v-btn>
        </v-card-actions>
          <h4 id="ref_date">등록일 : {{formatDate(it.newsDate)}}</h4>


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
      itnewsList:state=>state.itnewsList
     }),
      ...loadUserState(['userData'])
    },
    created() {
       this.$store.dispatch("FECH_ITNEWS_LIST")
    },
    methods: {
      cardclick(value){
          this.$router.push({name:'itNewsView',params:{id:value.newsSq}})
      },
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
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@1,600&display=swap');
* {
   font-family: 'Nanum Gothic', sans-serif;
}

#title{
  position: relative;
  top:-10px;
  font-weight: bold;
}
#content{
  font-size:10px;
}

#link_a{
  position: relative;
  top:20px;
}
#subtitle{
font-family: 'Barlow Semi Condensed', sans-serif;
color:#4e5157 ;
font-size: 50px;
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
#ref_date{
  color: #9BA4B4;
  margin-top: -10px;
  font-size: 10px;
  position: relative;
  left:145px;
}
 .mx-auto{
  margin: 1.5%;
}
.ref_title{
    font-family: 'Masque';
    color:#4e5157 ;
    font-size: 50px;
}

</style>