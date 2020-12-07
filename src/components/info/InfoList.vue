<template>
<b-container fluid>

  <!--서브 이미지-->    
  <b-row>
    <div class="submenuimage ">
      <p class="subtitle" id="subtitle">Job Information</p>
    </div>
  </b-row>

  <div class="container">

  <!--서브 제목-->
  <h4 class="sub-header">취업설명회 일정</h4> 

  <b-button v-if="userData.memberEmail === 'admin@kh.com'" to="/infoForm" exact id="st_write1">
    글쓰기
  </b-button>

  <div class="overflow-hidden">

  <!--테이블-->
  <v-card>
  <v-card-title class="search-bar">
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
      :items="info"
      :search="search"
      item-key="infoSq" 
      single-line
      hide-details
    >

    <template v-slot:item="props">
    <tr @click="handleClick(props.item.infoSq)">
      <td class="text-xs-right">{{props.item.infoSq }}</td>
      <td class="text-xs-right">{{props.item.infoCategory }}</td>
      <td class="text-xs-right">{{props.item.infoTitle }}</td>
      <td class="text-xs-right">{{props.item.infoDate }}</td>
      <td class="text-xs-right">{{props.item.infoTime }}</td>
      <td class="text-xs-right">{{props.item.infoContent }}</td>
      <td class="text-xs-right">{{props.item.infoCount }}</td>
    </tr>
  </template>

    </v-data-table>
  </v-card>
  </div>
  </div>
</b-container>
</template>

<script>
import { mapState } from 'vuex';
import { createNamespacedHelpers } from "vuex";
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");

  export default {
    created : function(){
      this.$store.dispatch("FETCH_INFO")
    },
    computed:{
      ...mapState({
          info:state=>state.info,
        /*    infoList:state=>state.infoList,  */  
      }),
        ...loadUserState(['userData'])     
    },
    methods: {
      handleClick(value){
        this.$router.push({name:'InfoDetail',params:{id:value}});
      }
    },
    data() {
      return {
      search: '',
        headers: [        
          {
            text: '번호',
            align: 'start',
            filterable: false,
            value: 'infoSq', 
          },
          { text: '분류', value: 'infoCategory'}, 
          { text: '기업명', value: 'infoTitle' },          
          { text: '날짜', value: 'infoDate' },
          { text: '시간', value: 'infoTime' },
          { text: '주소', value: 'infoContent' },
          { text: '조회수', value: 'infoCount' } 
        ],
      }
    },
  }
</script>

<style scoped >
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@1,600&display=swap');
  * {
    font-family: 'Nanum Gothic', sans-serif;
  }
  .submenuimage{
  width: 100%;
  height:180px;
  background-color:#F4EEFF;
  text-align: center;
  line-height: 180px; 
  }
  #subtitle{
  font-family: 'Barlow Semi Condensed', sans-serif;
  }
  .subtitle{
  font-family: 'Masque';
  color:#4e5157 ;
  font-size: 50px;
  }
  #st_write1{
  position: relative;
  top: 9px;
  left:1035px;
  width:73px;
  margin-bottom: 10px;
  right: -40px;
  margin-right: 3.5%;
  background-color: #424874;
  border:none;
  color:white;
  }
  .search-bar {
  width: 30%;
  margin-left: 72%;
  }
</style>