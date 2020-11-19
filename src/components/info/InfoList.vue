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

        <div class="overflow-auto">
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
          ></v-data-table>
        </v-card>
        
        </div>
       </div>
      </div>
    </div>
  </body>
</template>

<script>
//import axios from 'axios';
  export default {

    created : function(){
       this.$store.dispatch("FETCH_INFO")
      
  /*     axios
      .get('http://localhost:8082/itjobgo/info/infoList')
      .then(Response=>{
        this.info=Response.data;
        console.log(Response);
      })
    }, 
  */
    },
    computed:{
        ...mapState({
            info:state=>state.info
        })
    },
   methods: {
    handleClick(value){
      // alert(value.infoSq);
      this.$router.push({name:'InfoDetail',params:{id:value.infoSq}});
      console.log(value);
      console.log(value.infoSq);
    
    }
  },


    data() {
      return {
    /*   info:[], */
      search: '',
        headers: [
          
          {
            text: '분류',
            align: 'start',
            filterable: false,
            value: 'infoCategory', 
          },
          { text: '기업명', value: 'infoTitle' },          
          { text: '날짜', value: 'infoDate' },
          { text: '시간', value: 'infoTime' },
          { text: '주소', value: 'infoAddress' },
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