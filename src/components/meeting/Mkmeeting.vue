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
          <v-tab  :to="{name:'approve',params:{'memberSq':userData.memberSq}}"><b>신청한모임</b></v-tab>
          <v-tab :to="{name:'mkmeeting',params:{'memberSq':userData.memberSq}}"><b>생성한모임</b></v-tab>
          <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
        </v-tabs>
      </div>
  </div>
  


  <b-row>
<b-col> 
    <v-data-table
            :headers="headers"
            :items=mklist
            item-key="name"
          >
          <template v-slot:item="props">
              <tr>
                <td class="text-xs-right">{{props.item.collabSq }}</td>
                <td class="text-xs-right">{{props.item.title }}</td>
                <td class="text-xs-right">{{   new Date(props.item.mdate).toLocaleDateString() }}</td>
               <td class="text-xs-right"><b-button >수정</b-button><b-button @click="deltemet(props.item)">삭제</b-button></td>
              </tr>
           </template>
          </v-data-table>
</b-col>

      
  </b-row>
 {{mklist}}
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
            value: 'collabSq',
          },
          // 그리고 spring에서 넘겨주는 json타입의 변수에 매칭시켜서 테이블의 row행의 value값을 동일하게 해준다
          { text: '모임제목', value: 'title' },
           { text: '생성일', value: 'mdate'},
         { text: '수정/삭제', value: 'status' },
        ]
    }
    },
    created() {
        //로컬 사용해서 로그인한 사용자 이메일 가져오기
       const no=this.$route.params.memberSq
      this.$store.dispatch("FECH_MKLIST",no)
        
    },
     computed: {
         ...mapState({
             mklist:state=>state.mklist
         }),
            ...loadUserState(['userData'])  ,
      
         
    }, 
    methods: {
      deltemet(item){
       let check=confirm("정말삭제하시겠습니까?")
       if(check==true){
         const no=item.collabSq
        this.$store.dispatch("FECH_MEETINGDEL",no)
        const index=this.mklist.indexOf((x)=>x.no===no);
        this.mklist.splice(index,1);
       }else return 
        

      }
    }

}
</script>

<style scoped>
#approve{
    color:blue;
}
#unpprove{
    color:red
}

</style>

