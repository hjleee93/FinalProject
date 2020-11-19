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
          :placeholder="pboardone.pboardTitle"
          v-model="pboardTitle"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="작성자" label-for="input-2">
        <b-form-input
          id="input-2"
          name="pboardWriter"
          readonly
         :placeholder="pboardone.pboardWriter"
         
        ></b-form-input>
       
      </b-form-group>
       <b-form-file ref="upfiles" v-on:change="handleFile" :placeholder="attachment.originalFilename"
    ></b-form-file> 
    
  <b-form-group id="input-group-3" label="상세내용:" label-for="input-3">
   <vue-editor id="input-3" name="pboardContent" v-model="pboardContent" :placeholder="pboardone.pboardContent" />
   </b-form-group>
      <!-- <b-button type="submit" class="s-btn">확인</b-button> -->
       <b-button @click="test" class="s-btn">확인</b-button>
      <b-button @click="back" class="r-btn">취소</b-button>
    </form>
    <div>{{attachment}}</div>
   
 </b-container>

 </div>
</div>
  
</template>

<script>

import { VueEditor } from "vue2-editor";
import { mapState } from 'vuex';
import axios from 'axios'
export default {
 
  data() {
      return {
        pboardTitle:'',  
        pboardContent:'',
        files:'',
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
       if(!this.pboardTitle){
         this.pboardTitle=this.pboardone.pboardTitle;
       }
       if(!this.pboardContent){
         this.pboardContent=this.pboardone.pboardContent;
       }
        if(!this.files){
         this.files=this.attachment.renamedFilename;
       }
      
        let formData=new FormData();
        formData.append('pboardTitle',this.pboardTitle);
        formData.append('pboardNo',this.$route.params.id);
        formData.append('pboardContent',this.pboardContent.replace(/(<([^>]+)>)/ig,""));
        formData.append('filen',this.files);
    
         for(let key of formData.entries()){
          console.log(`${key}`);
        }
         axios.post("http://localhost:8082/itjobgo/portfolio/portfolioupdataend.do",formData
       ,{ headers:{
          'Content-Type':'multipart/form-data'
        }})
          .then((data)=>console.log(data))
          .catch((error)=>console.log(error))
          this.$router.push({name:'portlist'})
      },
      handleFile(){
        console.log(this.$refs.upfiles.$refs.input.files[0]);
        this.files=this.$refs.upfiles.$refs.input.files[0];
        console.log(this.files);
      },
      back(){
         this.$router.push({name:'portlist'})
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

