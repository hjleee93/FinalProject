<template>
<div class="container-fluid">
      <div class="row">
      
      <!-- 메인 이미지 -->
      <div class="submenuimage ">
        <p class="subtitle" id="subtitle">portfolioupdate</p>
      </div>
  <b-container>
    
      <form  @submit.prevent="test"  enctype="multipart/form-data">
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
        
          placeholder="작성자"
         readonly
          v-model="pboardone.pboardWriter"
        ></b-form-input>
       </b-input-group>
       <b-form-file ref="upfiles" v-on:change="handleFile" :placeholder="attachment.originalFilename"
    ></b-form-file> 
    
  <b-form-group id="input-group-3" label="상세내용:" label-for="input-3">
    <b-form-textarea
          id="textarea-content"
          v-model.lazy="pboardContent"
          required
          placeholder="내용을 입력해주세요"
          rows="10"
        ></b-form-textarea>
 
   </b-form-group>
      <!-- <b-button type="submit" class="s-btn">확인</b-button> -->
      <b-row align-h="center">
<b-col cols="1"> <b-button @click="test" type="submit" class="s-btn">확인</b-button></b-col>
<b-col cols="1"><b-button @click="back" class="r-btn">취소</b-button></b-col>
      </b-row>
    </form>
 </b-container>

 </div>
</div>
  
</template>

<script>

//import { VueEditor } from "vue2-editor";
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
       .then(({data})=>{
         console.log(data)
       })
       this.$store.dispatch("FETCH_PBOARDONE",pboardNo)
       .then(({data})=>{
         this.pboardTitle=data.pboardTitle;
         this.pboardContent=data.pboardContent;
       })
      
      
     
     
    },
 
    computed: {
      
        ...mapState({
            pboardone:state=>state.pboardone,
            attachment:state=>state.attachment,
         
          
           
        })
      
    },
    components:{
     // VueEditor,
    },
    methods: {
      test(){
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
          .then(()=>{
                this.$router.push('/portfolioList').catch(()=>{})
          })
          .catch((error)=>console.log(error))
      
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

