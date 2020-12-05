<template>
<div class="container-fluid">
      <div class="row">
      
      <!-- 메인 이미지 -->
      <div class="submenuimage ">
        <p class="subtitle" id="subtitle">portfolio</p>
      </div>
  <b-container>
     <b-form role="form"  @submit.prevent="test">
    <b-input-group   prepend="제목" class="mb-2" >
     
        <b-form-input
        required
          id="input-1"
          name="pboardTitle"
          type="text"
          placeholder="제목"
          v-model="pboardTitle"
        ></b-form-input>
</b-input-group>
     
       <b-input-group  prepend="작성자" class="mb-2">
        <b-form-input
          id="input-2"
          name="pboardWriter"
          required
          placeholder="작성자"
          
          v-model="userData.memberName"
        ></b-form-input>
       </b-input-group>
   
       <b-form-file id="files" ref="upfiles" v-on:change="handleFile"
      placeholder="첨부파일"
     
    ></b-form-file> 
    
  <b-form-group id="input-group-3" label="상세내용:" label-for="input-3">
   <vue-editor id="input-3" required name="pboardContent" v-model="pboardContent" />
   </b-form-group>
      <!-- <b-button type="submit" class="s-btn">확인</b-button> -->
       <b-button type="submit" class="s-btn">확인</b-button>
      <b-button type="reset" class="r-btn">취소</b-button>

    
    </b-form> 
 </b-container>
 </div>
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
        pboardTitle:'',
        pboardContent:'',
        files:'',
        tt:true
       
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
        formData.append('pboardWriter',this.userData.memberName);
        formData.append('pboardTitle',this.pboardTitle);
        formData.append('memberSq',this.userData.memberSq)
        formData.append('pboardContent',this.pboardContent.replace(/(<([^>]+)>)/ig,""));
        formData.append('file',this.files);
        for(let key of formData.entries()){
          console.log(`${key}`);
        }
      axios.post("http://localhost:8082/itjobgo/portfolio/portfolioenroll.do",formData
       ,{ headers:{
          'Content-Type':'multipart/form-data'
        }}).then(()=>this.$router.push({name:'portlist'})
          )
        .catch((error)=>
        console.log(error))

      
        console.log(formData);

      },
      handleFile(){
        console.log(this.$refs.upfiles.$refs.input.files[0]);
        this.files=this.$refs.upfiles.$refs.input.files[0];
        console.log(this.files);
      },
      
     
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

