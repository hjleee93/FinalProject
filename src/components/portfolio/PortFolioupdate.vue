<template>
<div class="container-fluid">
      <div class="row">
      
      <!-- 메인 이미지 -->
      <div class="submenuimage ">
        <p class="subtitle" id="subtitle">portfolioupdate</p>
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
          name="pboardTitle"
          type="text"
          required
          placeholder="제목"
          :value="pboardone.pboardTitle"
          v-model="pboardTitle"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="작성자" label-for="input-2">
        <b-form-input
          id="input-2"
          name="pboardWriter"
          required
          placeholder="작성자"
          v-model="pboardone.pboardWriter"
        ></b-form-input>
       
      </b-form-group>
       <b-form-file id="files" ref="upfiles" v-on:change="handleFile" :placeholder="attachment.originalFilename"
    ></b-form-file> 
    
  <b-form-group id="input-group-3" label="상세내용:" label-for="input-3">
   <vue-editor id="input-3" name="pboardContent" v-model="pboardone.pboardContent" />
   </b-form-group>
      <!-- <b-button type="submit" class="s-btn">확인</b-button> -->
       <b-button @click="test" class="s-btn">확인</b-button>
      <b-button type="reset" class="r-btn">취소</b-button>
    </form>
    <div>{{attachment}}</div>
    <div>{{pboardWriter}}</div>
     <div>{{pboardContent}}</div>
      <div>{{pboardTitle}}</div>
   
 </b-container>

 </div>
</div>
  
</template>

<script>
import axios from 'axios';
import { VueEditor } from "vue2-editor";
import { mapState } from 'vuex';

export default {
 
  data() {
      return {
        pboardTitle:'',
        pboardWriter:'',
        pboardContent:''
      }
    },
  
    created() {
      const pboardNo=this.$route.params.id;
       this.$store.dispatch("FETCH_PBOARDUP",pboardNo)
      
     
     
    },
 
    computed: {
        ...mapState({
            pboardone:state=>state.pboardone,
            attachment:state=>state.attachment,
         
          
           
        })
    },
    components:{
      VueEditor,
    },
    methods: {
      test(){
        console.log(this.pboardone)
        let formData=new FormData();
        formData.append('pboardWriter',this.pboardWriter);
        formData.append('pboardTitle',this.pboardTitle);
        formData.append('pboardContent',this.pboardContent.replace(/(<([^>]+)>)/ig,""));
        formData.append('file',this.files);
        for(let key of formData.entries()){
          console.log(`${key}`);
        }
      axios.post("http://localhost:8082/itjobgo/portfolio/portfolioenroll.do",formData
       ,{ headers:{
          'Content-Type':'multipart/form-data'
        }}).then((data)=>console.log(data))
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

