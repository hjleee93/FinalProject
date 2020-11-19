<template>

<div class="container">
  <div>
			<h2 class="st_title">QnA 질문등록</h2><hr>

    <!-- 데이터 넘기기 form 시작-->
    <form @submit.prevent="writeQna" @reset="onReset" enctype="multipart/form-data">

      <b-form-group
          id="input-group-2"
          label="제목"
          label-for="input-2"
      > <b-form-input
          id="input-2"
          v-model="qnaTitle"
          type="text"
          required
          placeholder="제목을 입력해주세요"
        ></b-form-input>
      </b-form-group>

      <!-- 카테고리 선택 -->
      <b-form-group id="input-group-2" 
      label="분류" label-for="input-2" label-align="left">
        <b-form-select
          id="input-2"
          v-model="qnacategory"
          :options="categories"
          required
        ></b-form-select>
      </b-form-group>

      <!-- 에디터창, 내용 -->
      <b-form-group  label="내용" >
        <vue-editor 
          id="vue-editor"
          v-model="qnaContent" 
          name="qnaContent" />
      </b-form-group>

      <div>
        <p class="mt-2">첨부 파일<b>{{ file ? file.name : '' }}</b></p>
        <b-form-file
            id="qnafiles"
            v-model="file"
            ref="upfiles"
            v-on:change="handleFile"
            placeholder="첨부파일을 선택해주세요"
        >
        </b-form-file>
        <b-button @click="clearFiles" id="file_btn" class="mr-2">Clear files</b-button>
        <!-- <b-button @click="file = null">Reset via v-model</b-button> -->

      </div>
      <div class="btn_sr">
      <b-button type="submit" id="btn_write" @click="writeQna" class="btn-space">등록하기</b-button>
      <b-button type="reset" id="btn_write" class="btn-space">등록취소</b-button>
      </div>

    </form>


  </div>
  
</div>

</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from 'axios';
// import { component } from 'vue/types/umd';

  export default {
    
    data() {
      return{
        qnaTitle:"",
        qnacategory:"",
        categories: [{ text: '항목을 선택해주세요', value: null },
                    '백엔드', '프론트엔드'
        ],
        qnaContent:"",
        qnafiles:""
      }
    },

    components:{
      VueEditor
    },

    methods: {
      writeQna(){
        
        let formData = new FormData();
        formData.append('qnaTitle',this.qnaTitle);
        formData.append('categories',this.qnacategory);
        formData.append('qnaContent',this.qnaContent.replace(/(<([^>]+)>)/ig,""))
        formData.append('file',this.qnafiles);

        for(let key of formData.entries()){
        console.log(`${key}`);
        }

        console.log(this.qnacategory);

      
      axios.post("http://localhost:8082/itjobgo/qna/qnaBoardWrite",
        formData,
        { headers:{
          'Content-Type':'multipart/form-data'
        }}).then((data)=>console.log(data))
        .catch((error)=>
        console.log(error))
        console.log(formData);
      },

      handleFile(){
        console.log(this.$refs.upfiles.$refs.input.qnafiles[0]);
        this.qnafiles=this.$refs.upfiles.$refs.input.qnafiles[0];
        console.log(this.qnafiles);
      },

      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        // this.form.email = ''
        this.qnaTitle = ''
        this.qnacategory = null
        this.qnaContent=''
        this.qnafiles.name=''
      },

      clearFiles() {
        this.$refs['upfiles'].reset()
      },

    }
  }
</script>

<style>
.st_title{
  margin-top:5%;
  margin-bottom: 1%;
}
.btn_sr{
  padding-left: 37%;
  margin: 5%;
  margin-bottom: 5%;
}
.btn-space{
  margin-right: 13px;
}
#btn_write{
  background-color:  #424874;
  border: 1px  #424874 solid;
  color:white;
}
#file_btn{
  margin-top: 1%;
}
</style>