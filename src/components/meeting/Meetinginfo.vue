<template>
  <b-container class="cont">
    <b-row  class="justify-content-md-center"><h1>{{minfo.collabTitle}}</h1></b-row>
    <b-row>
      <b-col>
       <v-img src="https://picsum.photos/id/11/500/300"   min-height="200" max-height="300"  max-width="500" min-width="400" aspect-ratio="1.7"></v-img>
     </b-col>
      <b-col >
        <b-card> 
           <b-row>
          <div class="f-box">일시:{{new Date(minfo.rdate).toLocaleDateString()}}</div>
        </b-row>
           <b-row><div  class="f-box"> 정원:{{minfo.collabBack+minfo.collabFront+minfo.collabDesgin}}명</div></b-row>
           <b-row><div  class="f-box"> 장소:{{minfo.address}}</div></b-row>
           <b-row><div  class="f-box"> 개발언어:{{minfo.collabLang}}</div></b-row>
           </b-card>
           
           </b-col>
           </b-row>
      <b-card> <b-row><b-col>개설자정보</b-col></b-row>
      <b-row><b-col>개설자성명:{{minfo.collabWriter}}</b-col></b-row>
      <b-row><b-col>개설자번호:{{minfo.collabPhone}}</b-col></b-row>
      <b-row><b-col>개설자이메일:{{minfo.collabEmail}}</b-col></b-row>
      
      </b-card>
     
       <b-card title="모집정보">
         <b-card>{{minfo.collabContent}}</b-card>
       </b-card>
    <b-row v-if="minfo.collabEmail!=userData.memberEmail">
        <b-col align-self="center"><b-button id="m-btn" @click="apbtn">신청하기</b-button></b-col>
    </b-row>
    <div>{{minfo}}</div>
    <ModalView v-if="showModal" @close="showModal = false">
    <template>
      <div slot="header">
       <h3>신청하기</h3>
      </div>
      <div slot="body" class="modalf"> 
        <b-card>
          <b-row>신청자:{{userData.memberName}}</b-row>
          <b-row>
            <b-form>
            <b-form-radio v-model="selected"  name="postion" value="back">백엔드</b-form-radio>
            <b-form-radio v-model="selected"  name="postion" value="front">프론트</b-form-radio>
            <b-form-radio v-model="selected"  name="postion" value="desgin">디자인</b-form-radio>
            {{selected}}
            </b-form>
          </b-row>
        </b-card>
      </div>
      <div slot="footer">
        <b-button @click="applybtn(selected)">
          YES
        </b-button>
      <b-button @click="ndele">NO</b-button>
      </div>
    </template>


  </ModalView>
    </b-container>  
    
</template>

<script>
import axios from "axios"
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";
import { mapState } from 'vuex'
import ModalView from '../common/ModalView.vue';
export default {
  components: { ModalView },
  data(){
    return{
    showModal:false,
    selected:'',
    }
  },
 
  methods: {
    apbtn(){
      this.showModal=!this.showModal;
    },
    ndele(){
        this.showModal=!this.showModal;
      },
      applybtn(value){
        let applyform=new FormData
        applyform.append("memberSq",this.userData.memberSq)
        applyform.append("postion",value)
       axios.post("http://localhost:8082/itjobgo/meeting/applymeeting.do",applyform)
       .then(()=>{
         alert("신청완료")
           this.showModal=!this.showModal;
       })
          
        .catch((error)=>
        console.log(error))
      }
  },
  created() {
    const no=this.$route.params.id
    this.$store.dispatch("FECH_MOBOARDINFO",no)
  },
  computed: {
    ...mapState({
      minfo:state=>state.minfo
    }),
     ...loadUserState(['userData'])  
  },

}
</script>

<style scoped>
#m-btn{
  background-color: #424874;
}
.rowbox1{
  font-size: 1.5em;
}
.f-box{
  margin-bottom: 20px;
}
.cont{
  border: 1px solid black;
  margin-top:1.5rem;
}
.layout2{
  margin-top:1.5rem;
  border:1px solid black;
}


</style>