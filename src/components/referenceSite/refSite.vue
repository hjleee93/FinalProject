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
        >
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        <v-card-title>Title</v-card-title>
        </v-img>
        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>
          <div>Whitsunday Island, Whitsunday Islands</div><h6 id="ref_date">등록일 : 20/10/31</h6>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue"
            text
            >
            사이트 바로가기
          </v-btn>
        </v-card-actions>
      </v-card>
      
      <!-- <v-card
        class="mx-auto"
        max-width="330"
        >
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        <v-card-title>Title</v-card-title>
        </v-img>
        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>
          <div>Whitsunday Island, Whitsunday Islands</div><h7 id="ref_date">등록일 : 20/10/31</h7>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue"
            text
            >
            사이트 바로가기
          </v-btn>
        </v-card-actions>
      </v-card> -->

      </div>

          <!-- search bar -->
          <div class="search-align">
          <b-navbar-nav class="ml-auto st_search">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit" id=searchbtn>Search</b-button>
            </b-nav-form>
          </b-navbar-nav>
          </div>

    </div>



        </div>

      </div>

</b-container>


</template>

<script>
  export default {
    data() {
      return {
        perPage: 4,
        currentPage: 1,
      }
    }
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
#ref_date{
  color: #9BA4B4;
  margin-top: 1%;
  font-size: 12px;
}
 .mx-auto{
  margin: 1.5%;
}
.ref_title{
    font-family: 'Masque';
    color:#4e5157 ;
    font-size: 50px;
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