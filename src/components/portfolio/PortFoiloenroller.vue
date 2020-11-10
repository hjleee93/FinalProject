<template>
  <b-container>
      <form  @submit.prevent="test"  enctype="multipart/form-data">
      <b-form-group
        id="input-group-1"
        label="제목"
        label-for="input-1"
     
      >
        <b-form-input
          id="input-1"
          name="boardTitle"
          type="text"
          required
          placeholder="제목"
          v-model="boardTitle"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="작성자" label-for="input-2">
        <b-form-input
          id="input-2"
          name="boardWriter"
          required
          placeholder="작성자"
          v-model="boardWriter"
        ></b-form-input>
       
      </b-form-group>
       <b-form-file id="files" ref="upfiles" v-on:change="handleFile"
      placeholder="첨부파일"
     
    ></b-form-file> 
    
  <b-form-group id="input-group-3" label="상세내용:" label-for="input-3">
   <vue-editor id="input-3" name="boardContent" v-model="boardContent" />
   </b-form-group>
      <!-- <b-button type="submit" class="s-btn">확인</b-button> -->
       <b-button @click="test" class="s-btn">확인</b-button>
      <b-button type="reset" class="r-btn">취소</b-button>
    </form>
 </b-container>
</template>

<script>
import axios from 'axios';
import { VueEditor } from "vue2-editor";
export default {
 
  data() {
      return {
        boardTitle:'',
        boardWriter:'',
        boardContent:'',
        files:'',
       
      }
    },
    components:{
      VueEditor,
    },
    methods: {
      test(){
        let formData=new FormData();
        formData.append('boardWriter',this.boardWriter);
        formData.append('boardTitle',this.boardTitle);
        formData.append('boardContent',this.boardContent);
        formData.append('file',this.files);
        for(let key of formData.entries()){
          console.log(`${key}`);
        }
      axios.post("http://localhost:8082/itjobgo/portfoilo/portfoiloenroll.do",formData
       ,{ headers:{
          'Content-Type':'multipart/form-data'
        }}).then((response)=>{
        console.log(response);
      }).catch((error)=>{
        console.log(error);
      })

      
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
</style>

