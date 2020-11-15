<template>
  <b-container>

    <div class="container" id="header-container">
    <h4 id="h4-title">자유게시판 작성</h4>
    </div>

    <b-form @submit.prevent="enrollBorad" @reset="onReset" enctype="multipart/form-data">
      <b-form-group
        id="input-group-1"
        label="제목"
        label-for="input-1"
        label-align="left"
      >
        <b-form-input
          id="input-1"
          v-model="boardTitle"
          type="text"
          required
          placeholder="제목을 입력해주세요"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" 
      label="분류선택" label-for="input-2" label-align="left">
        <b-form-select
          id="input-2"
          v-model="category"
          :options="boardDivision"
          required
        ></b-form-select>
      </b-form-group>

      <!-- 에디터 창 -->
      <vue-editor  id="vue-editor" v-model="boardContent" name="content"/>

      <!-- 첨부파일 -->

    <b-form-file id="file1" ref="upfiles" v-on:change="handleFile"
    placeholder="첨부파일을 선택해주세요"></b-form-file> 

      <!-- <b-form-file id="file2" ref="upfiles" v-on:change="handleFile"
    placeholder="첨부파일을 선택해주세요"></b-form-file>  -->

      <b-button type="submit" id="submit-btn2"  @click="enrollBorad" >완료</b-button>
      <b-button type="reset" id="reset-btn2">취소</b-button>
      <b-button type="button" id="list-btn2" to="/communityBoardList" exact>목록</b-button>
      
    </b-form>
  </b-container>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from 'axios';

  export default {

    data() {
      return {
  
        boardTitle:"",
        category:"",
        boardDivision: [{ text: '분류(필수사항)', value: null }, '질문', '추천', '일반'],
        boardContent:"",
        file1 :""
      }
    },

    components:{
      VueEditor,
    },

    methods: {
      enrollBorad() {
        
        let formData = new FormData();
        formData.append('boardTitle',this.boardTitle);
        formData.append('boardDivision',this.boardDivision);
        formData.append('content',this.content.replace(/(<([^>]+)>)/ig,""));
        formData.append('file1',this.file1);
        
        for(let key of formData.entries()){
        console.log(`${key}`);
        }

      axios.post("http://localhost:8082/itjobgo/community/communityBoardForm",formData
       ,{ headers:{
          'Content-Type':'multipart/form-data'
        }}).then((data)=>console.log(data))
        .catch((error)=>
        console.log(error))

      
        console.log(formData);

      },

      handleFile(){
      console.log(this.$refs.upfiles.$refs.input.file1[0]);
      this.file1=this.$refs.upfiles.$refs.input.file1[0];
      console.log(this.file1);
      },


      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        // this.form.email = ''
        this.name = ''
        this.category = null
        this.content=''
        this.file1.name=''
      }
    }
  }
</script>

<style>
@import '../../assets/css/BoardForm.css';
</style>