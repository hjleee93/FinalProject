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
            :items=apply
            item-key="name"
          >
          <template v-slot:item.status="{item}">
            <b-button @click="approve(item,index)">승인</b-button>
             <b-button  @click="unapproved(item,index)">미승인</b-button>
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
          { text: '신청자', value: 'username'},
          { text: '모임제목', value: 'collname' },
         { text: '승인/미승인', value: 'status' },
        ]
    }
    },
    created() {
        //로컬 사용해서 로그인한 사용자 이메일 가져오기
       let email=sessionStorage.getItem('memberEmail')
      
       
       console.log(email)
        this.$store.dispatch('FECH_MEETINGAPPLY',email)
    },
     computed: {
       ...mapState({
           apply:state=>state.apply    
         }),
         ...loadUserState(['userData'])  ,
         
    }, 
    methods: {
      approve(no,index){
        let check=confirm("승인하시겠습니까?")
        if(check==true){
          this.$store.dispatch("FECH_APPROVE",no.no)
          .then(()=>{
          this.apply.splice(index,1);
          })
           
        }else return
       
       
      },
      unapproved(no,index){
        let check=confirm("미승인하시겠습니까?")
        if(check==true){
          this.$store.dispatch("FECH_UNAPPROVE",no.no)
          .then(()=>{
            this.apply.splice(index,1);
          })
     
        }else return
       
       
      }
    },
    unValue(){
      alert("신청목록이 없습니다")
    },
    test(){
      alert("메소드로 보내야지")
    }
       

}
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}
</style>