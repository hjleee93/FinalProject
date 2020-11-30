<template>

  <body>
    <div class="container-fluid">
      <div class="row">
 
          <!-- 메인 이미지 -->
              <div class="submenuimage ">
                  <p class="subtitle" id="subtitle">Information</p>
              </div>

        <div class="container">
          <h2 class="sub-header"></h2>
        <br>

        <!-- 버튼 -->
        <div>
          <h4 class="sub-header">취업설명회 일정</h4>
          <v-btn to="/infoForm" exact  id="st_write1">글쓰기</v-btn>
        </div>
        <div class="overflow-hidden">
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
            :items="info"
            :search="search"
            :server-items-length="info.length"
             item-key="infoSq"         
          >
          <template v-slot:item="props">
          <tr @click="handleClick(props.item.infoSq)">
            <td class="text-xs-right">{{props.item.infoSq }}</td>
            <td class="text-xs-right">{{props.item.infoCategory }}</td>
            <td class="text-xs-right">{{props.item.infoTitle }}</td>
            <td class="text-xs-right">{{props.item.infoDate }}</td>
            <td class="text-xs-right">{{props.item.infoTime }}</td>
            <td class="text-xs-right">{{props.item.infoAddress}}</td>
            <td class="text-xs-right">{{props.item.infoCount }}</td>
          </tr>
        </template>

          </v-data-table>
        </v-card>
             <div>객체(임시) : {{info}}</div>
        
        </div>
       </div>
      </div>
    </div>
  </body>
</template>

<script>
import { mapState } from 'vuex';

  export default {

    created : function(){
       this.$store.dispatch("FETCH_INFO")
    },

    computed:{
        ...mapState({
            info:state=>state.info
        })
    },
    
   methods: {
    handleClick(value){
      this.$router.push({name:'infoDetail',params:{id:value.infoSq}});
    
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
          { text: '주소', value: 'infoAddress' },
          { text: '내용', value: 'infoContent' },
          { text: '조회수', value: 'infoCount' } 
        ],
      }
    },
  }
</script>

<style scoped >
#subtitle{
 font-family: 'Barlow Semi Condensed', sans-serif;
}
.submenuimage{
  width: 100%;
  height:180px;
  background-color:#ffffff;
  text-align: center;
  line-height: 180px; 
}
.subtitle{
  font-family: 'Masque';
  color:#4e5157 ;
  font-size: 50px;
}
#st_write1{
  position: relative;
  top: 0px;
  left:1050px;
  width:70px;
  margin-bottom: 10px;
  right: -40px;
  margin-right: 3.5%;
  background-color: #424874;
  border:none;
  color:white;
}
</style>