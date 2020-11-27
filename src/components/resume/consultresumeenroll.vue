<template>
 <div class="consult_resume_enroll">
  <body>
    <div class="container-fluid">
      <div class="submenuimage">
          <p class="subtitle">Consult Resume</p>
      </div>
      <div>
          <v-tabs centered color="grey darken-3">
              <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
              <v-tab to="/resume/resume">입사지원서 보기</v-tab>
              <v-tab to="/resume/updateresume">입사지원서 수정</v-tab>
              <v-tab active to="/resume/consultresume">입사지원서 컨설팅</v-tab>
              <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
              <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
          </v-tabs>
      </div>
      
        <b-container>
        
        <form  @submit.prevent="test"  enctype="multipart/form-data">
        <b-form-group
            id="input-group-1"
            label="제목"
            label-for="input-1"
        >
            <b-form-input
            id="input-1"
            name="rboardTitle"
            type="text"
            required
            placeholder="제목"
            v-model="rboardTitle"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="작성자" label-for="input-2">
            <b-form-input
            id="input-2"
            name="rboardWriter"
            required
            placeholder="작성자"
            
            v-model="userData.memberName"
            ></b-form-input>
        
        </b-form-group>
        <b-form-file id="files" ref="upfiles" v-on:change="handleFile"
        placeholder="첨부파일"
        
        ></b-form-file> 
        
    <b-form-group id="input-group-3" label="상세내용:" label-for="input-3">
    <vue-editor id="input-3" name="rboardContent" v-model="rboardContent" />
    </b-form-group>
        <!-- <b-button type="submit" class="s-btn">확인</b-button> -->
        <b-button @click="test" class="s-btn">확인</b-button>
        <b-button type="reset" class="r-btn">취소</b-button>
        </form>
        <div>{{userData}}</div>
    </b-container>
      </div>
  </body>
 </div>
</template>

<script>
import axios from 'axios';
import { createNamespacedHelpers } from "vuex";
import { VueEditor } from "vue2-editor";
const { mapState } = createNamespacedHelpers("memberStore");
export default {
 
  data() {
      return {
        rboardTitle:'',
        rboardContent:'',
        files:'',
       
      }
    },
    computed: {
        ...mapState(['userData'])
    },
    components:{
      VueEditor,  
    },
    methods: {
      test(){
        let formData=new FormData();
        formData.append('rboardWriter',this.userData.memberName);
        formData.append('rboardTitle',this.rboardTitle);
        formData.append('memberSq',this.userData.memberSq)
        formData.append('rboardContent',this.rboardContent.replace(/(<([^>]+)>)/ig,""));
        formData.append('file',this.files);
        for(let key of formData.entries()){
          console.log(`${key}`);
        }
      axios.post("http://localhost:8082/itjobgo/resume/rboardEnroll.do",formData
       ,{ headers:{
          'Content-Type':'multipart/form-data'
        }}).then(()=>{
          this.$route.push({name:'consultresume'})
          })
        .catch((error)=>
        console.log(error))

        console.log(formData);

      },
      handleFile(){
        console.log(this.$refs.upfiles.$refs.input.files[0]);
        this.files=this.$refs.upfiles.$refs.input.files[0];
        console.log(this.files);
      }
     
    }
}
</script>

<style scoped>
.s-btn{
  background-color: #424874;
}
.r-btn{
  background-color: #9BA4B4;
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

</style>