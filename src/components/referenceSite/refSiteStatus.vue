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
              <v-tab to='/refSite'><b>ALL</b></v-tab>
              <v-tab to='/refSitefront'><b>FrontEnd</b></v-tab>
              <v-tab to='/refSiteback'><b>BackEnd</b></v-tab>
              <v-tab to='/refSiteEtc'><b>ETC 기타</b></v-tab>
              <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
            </v-tabs>

 <!-- 서브제목 -->
      <h4 class="sub-header">사이트 미승인 리스트</h4>

    <div class="overflow">

         <!-- 테이블 -->
        <v-card>
        <v-card-title>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
        </v-card-title>
        
          <v-data-table
            :headers="headers"
            :items="refList"
            :search="search"
            item-key="refNo"
            single-line
            hide-details
          >

          <template v-slot:item="props">
                <tr @click="handleClick(props.item.refNo)">
                  <td v-if="props.item.status.includes('N')" class="text-xs-right">{{props.item.refNo}}</td>         
                  <td v-if="props.item.status.includes('N')" class="text-xs-right">{{props.item.refCategory}}</td>
                  <td v-if="props.item.status.includes('N')" class="text-xs-right">{{props.item.refTitle}}</td>
                  <td v-if="props.item.status.includes('N')" class="text-xs-right">{{props.item.refContent}}</td>
                  <td v-if="props.item.status.includes('N')" class="text-xs-right">
                    <v-btn class="mx-2 answerbtn3" dark small>승인대기</v-btn></td>
                  <td v-if="props.item.status.includes('N')" class="text-xs-right">{{formatDate(props.item.qnaDate)}}</td>
                </tr>
          </template>  
          <!-- <td v-if="props.item.deadline.includes('채용시까지')"> -->
        </v-data-table>

        </v-card>
       
      </div>
    </div>
</b-container>




</template>





<script>

  import { mapState } from 'vuex';
  import Vue from 'vue';
  import vueMoment from 'vue-moment';
  Vue.use(vueMoment);
  const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
  import { createNamespacedHelpers } from "vuex";
  
  export default {

    created() {
       this.$store.dispatch("FECH_REF_LIST")
    },
    computed:{
      ...mapState({
      refList:state=>state.refList,
     }),
      ...loadUserState(['userData'])
    },

    methods:{
      handleClick(value){
        this.$router.push({name:'refSiteView',params:{id:value}});
      },

    formatDate(value){
      return this.$moment(value).format("YYYY-MM-DD");
    }

    },
    
    data() {
      return { 
      
      search: '',
        headers: [
          { 
            text: 'NO',
            align: 'start',
            filterable: false,
            value: 'refNo', //spring vo값 !
          },
          { text: '분류', value: 'refCategory' },     
          { text: '사이트 명', value: 'refTitle' },
          { text: '내용', value: 'refContent' },
          { text: '승인여부', value: 'status' },
          { text: '작성일', value: 'refDate' },

        ],
      }
    },

  }


</script>

<style scoped >
* {
   font-family: 'Nanum Gothic', sans-serif;
}
.overflow .v-card{
  box-shadow: 0 0 black !important;
  margin-bottom: 12%;
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
  margin-bottom: 5%;
}
.sub-header{
  margin-top: 5%;
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
.answerbtn3 {
  background-color: #777a7e !important;
}
</style>