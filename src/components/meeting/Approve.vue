 <template>
   <div class="container-fluid" >
   <div class="row">
    <div class="submenuimage">
        <p class="subtitle">MeetingStatus</p>
    </div>
   <div class="container">
       <v-tabs
        centered
        color="grey darken-3"
        >
        <v-tab to="/meetingapply"><b>신청자승인</b></v-tab>
          <v-tab  :to="{name:'approve',params:{'memberSq':userData.memberSq}}"><b>참여한모임</b></v-tab>
          <v-tab :to="{name:'mkmeeting',params:{'memberSq':userData.memberSq}}"><b>생성한모임</b></v-tab>
          <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
        </v-tabs>
      </div>
  </div>
  

  <b-row>
<b-col> 

    <v-data-table
            :headers="headers"
            :items=approvelist
            item-key="name"
          >
           <template v-slot:item="props">
             
              <tr>
                <td class="text-xs-right">{{props.item.no }}</td>
                <td class="text-xs-right">{{props.item.position }}</td>
                <td class="text-xs-right" @click="movepage(props.item.collsq)">{{props.item.collname}}</td>
               <td class="text-xs-right"><v-icon v-if='props.item.status=="Y"' id="approve"
          dark
          right
          color="blue darken-2"
        >
          mdi-checkbox-marked-circle
        </v-icon>
          <v-icon 
          dark
          v-if='props.item.status=="N"'
          right
          id="unpprove"
        >
          mdi-cancel
        </v-icon> </td>
<!-- </td> -->
              </tr>
           </template>
          
             

   
    
          </v-data-table>
</b-col>

      
  </b-row>
  
  </div>
</template>

<script>

import { createNamespacedHelpers, mapState } from "vuex";
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");



export default {
  
    data(){
     return{
        headers: [
          {
            text: "번호",
            align: 'start',
            filterable: false,
            value: 'no',
          },
          // 그리고 spring에서 넘겨주는 json타입의 변수에 매칭시켜서 테이블의 row행의 value값을 동일하게 해준다
          { text: '포지션', value: 'position'},
          { text: '모임제목', value: 'collname' },
         { text: '승인/미승인', value: 'status' },
        ]
    }
    },
    created() {
        //로컬 사용해서 로그인한 사용자 이메일 가져오기
       const no=this.$route.params.memberSq
      this.$store.dispatch("FECH_APPROVELIST",no)
        
    },
     computed: {
         ...mapState({
             approvelist:state=>state.approvelist
         }),
            ...loadUserState(['userData'])  ,
      
         
    }, 
    methods: {
      movepage(item){
        
         this.$router.push({name:"meetinginfo",params:{id:item}})
      }
    }

}
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}
#approve{
    color:blue;
}
#unpprove{
    color:red
}

</style>

