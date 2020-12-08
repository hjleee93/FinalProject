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
        <v-tab to="/noticeList"><b>신청자승인</b></v-tab>
          <v-tab to="/noticeList"><b>신청한모임</b></v-tab>
          <v-tab to="/itNewsList"><b>참여한모임</b></v-tab>
          <v-tab to="/communityBoardList"><b>생성한모임</b></v-tab>
          <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
        </v-tabs>
      </div>
  </div>
  {{apply}}
  <b-row>
<b-col> 
<v-data-table :headers="headers">
    <!-- <template v-slot:item.status="{item}">
        <button></button>
         <button></button>
    </template> -->
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
            value: 'pboardNo',
          },
          // 그리고 spring에서 넘겨주는 json타입의 변수에 매칭시켜서 테이블의 row행의 value값을 동일하게 해준다
          { text: '포지션', value: 'pboardTitle'},
          { text: '신청자', value: 'pboardWriter'},
          { text: '모임제목', value: 'pboardStatus' },
          { text: '답변', value: 'pboardStatus' },
        
        ]
    }
    },
    created() {
        //로컬 사용해서 로그인한 사용자 이메일 가져오기
       let email=localStorage.getItem('memberEmail')
       console.log(email)
        this.$store.dispatch('FECH_MEETINGAPPLY',email)
        
    },
     computed: {
         ...loadUserState(['userData'])  ,
         ...mapState({
           apply:state=>state.apply
         })
    },
       

}
</script>

<style>

</style>