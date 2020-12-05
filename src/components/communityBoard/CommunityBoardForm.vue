<template>
  <b-container>

    <div class="container" id="header-container">
      <h4 id="h4-title">자유게시판 작성</h4>
      <b-button type="button" id="list-btn2" to="/communityBoardList" exact>목록</b-button>
    </div>

    <b-form role="form"  @submit.prevent="enrollBoard"
    @reset="onReset" enctype="multipart/form-data">
   <b-input-group   prepend="제목" class="mb-2" >

        <b-form-input
          required
          id="input-1"
          v-model="boardTitle"
          type="text"
          placeholder="제목을 입력해주세요"

        ></b-form-input>
    </b-input-group>
     

       
       <b-input-group  prepend="작성자" class="mb-2">
        <b-form-input
          id="input-2"
          name="boardWriter"
          required
          placeholder="작성자"
          readonly
          
          v-model="userData.memberName"
        ></b-form-input>
       </b-input-group>
        
        <b-input-group  prepend="분류" class="mb-2">
        <b-form-select
          id="input-3"
          v-model="category"
          :options="boardDivision"
          required
        ></b-form-select>
         </b-input-group>
   

     

      <!-- 에디터 창 -->
      <!-- <b-form-group id="input-group-3" label="상세내용:" label-for="input-3">
        <vue-editor  id="input-3" v-model="boardContent" 
        name="boardContent"/>
     </b-form-group> -->
    <b-form-group id="input-group-3"  label-for="input-3">
        <b-form-textarea
          id="textarea-content"
          v-model="boardContent"
          required
          placeholder="내용을 입력해주세요"
          rows="10"
        ></b-form-textarea>
    </b-form-group>

      <!-- 첨부파일 -->
      <b-form-group>
        <b-form-file id="files" ref="upfiles" v-on:change="handleFile"
        placeholder="첨부파일을 선택해주세요"></b-form-file> 
      </b-form-group>
      <!-- <b-form-file id="file2" ref="upfiles" v-on:change="handleFile"
    placeholder="첨부파일을 선택해주세요"></b-form-file>  -->

      <!-- <b-button id="submit-btn2"  @click="enrollBoard">완료</b-button> -->
      <b-button type="submit" id="submit-btn2">확인</b-button>
      <b-button type="reset" id="reset-btn2">취소</b-button>
      
    </b-form>
  </b-container>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import axios from 'axios';
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");

  export default {

    data() {
      return {
        boardTitle:"",
        category:null,
        boardDivision :[
           { value: null, text: '분류를 선택해주세요' },
          { value: '일반', text: '일반' },
          { value: '질문', text: '질문' },
          { value: '홍보', text: '홍보' }
        ],
        boardContent:"",
        files :"",
         tt:true
      }
    },

    components:{
      // VueEditor,
    },

    computed: {
    ...mapState(['userData'])
    },

    methods: {
      enrollBoard() {
        
        let formData = new FormData();
        formData.append('boardWriter',this.userData.memberName);
        formData.append('memberSq',this.userData.memberSq);
        formData.append('boardTitle',this.boardTitle);
        formData.append('boardDivision',this.category);
        formData.append('boardContent',this.boardContent.replace(/(<([^>]+)>)/ig,""));
        formData.append('file',this.files);
        
        for(let key of formData.entries()){
        console.log(`${key}`);
        }
          console.log(this.category);

      axios.post("http://localhost:8082/itjobgo/community/communityBoardForm",
        formData,
        { headers:{
          'Content-Type':'multipart/form-data'
        }}).then((data)=>console.log(data))
        .catch((error)=>
        console.log(error))
        console.log(formData);
        this.$router.push({name:'CommunityBoardList'});
      },
      
      handleFile(){
        console.log(this.$refs.upfiles.$refs.input.files[0]);
        this.files=this.$refs.upfiles.$refs.input.files[0];
        console.log(this.files);
      },

      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        // this.form.email = ''
        this.boardTitle = ''
        this.category = null
        this.boardContent=''
        this.files.name=''
      }
    }
  }
</script>

<style>
@import '../../assets/css/BoardForm.css';
</style>