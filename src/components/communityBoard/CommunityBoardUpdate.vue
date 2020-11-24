<template>
  <b-container>

    <div class="container" id="header-container">
      <h4 id="h4-title">자유게시판 작성</h4>
      자유게시판 객체(테스트) : {{communityboardView}} <br>
      자유게시판 제목(테스트) : {{communityboardView.boardTitle}} <br>
      첨부파일(테스트) : {{cbAttachment}}
    </div>

    <form @submit.prevent="updateForm" 
     enctype="multipart/form-data">
      <b-form-group
        id="input-group-1"
        label="제목"
        label-for="input-1"
        label-align="left"
      >
        <b-form-input
          id="input-1"
          name="boardTitle"
          type="text"
          required
          placeholder="제목"
          v-model="communityboardView.boardTitle"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" 
      label="분류선택" label-for="input-2" label-align="left">
        <b-form-select
          id="input-2"
          v-model="category"
          :options="boardDivision"
          required
        ></b-form-select>
      </b-form-group>


      <!-- 에디터 창 -->
      <b-form-group id="input-group-3" label="상세내용:" label-for="input-3">
        <vue-editor  id="input-3" v-model="communityboardView.boardContent" 
        name="boardContent"/>
     </b-form-group>

      <!-- 첨부파일 -->
      <b-form-group>
        <b-form-file id="files" ref="upfiles" v-on:change="handleFile"
        :placeholder="cbAttachment.originalfilename" ></b-form-file> 
      </b-form-group>
      <!-- <b-button @click="clearFiles" class="mr-2">Clear files</b-button> -->
 

      <b-button id="submit-btn2"  @click="updateForm" >완료</b-button>
      <!-- <b-button id="submit-btn2"  @click="onReset" >취소</b-button> -->
      <b-button type="button" id="list-btn2" to="/communityBoardList" exact>목록</b-button>
      
    </form>
  </b-container>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapState } from 'vuex';
import axios from 'axios'

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
        
      }
    },

    created() {
    const boardSq=this.$route.params.id;
      this.$store.dispatch("FETCH_COMMUNITYBOARD_UPDATE",boardSq)
      console.log("지금하고있는 로그 " + boardSq);
    },

    computed:{
      ...mapState({
        //mapState를 통해서 store에 저장된 (객체) data를 가져다 쓸수있다
        communityboardView:state=>state.communityboardView,    
        cbAttachment:state=>state.cbAttachment,
      })
    },


    components:{
      VueEditor,
    },
    
    methods: {
      updateForm() {
        //새롭게 수정된 내용이 없다면 원래 객체의 컬럼값을 가져가도록
        if(!this.boardTitle){
          this.boardTitle=this.communityboardView.boardTitle;
        }
        if(!this.boardContent){
          this.boardContent=this.communityboardView.boardContent;
        }
        if(!this.boardDivision){
          this.boardDivision=this.communityboardView.boardDivision;
        }
        if(!this.files){
          this.files=this.cbAttachment.renamedfilename;
        }
        
        let formData = new FormData();
        formData.append('boardTitle',this.boardTitle);
        formData.append('boardDivision',this.category);
        formData.append('boardSq',this.$route.params.id);
        formData.append('boardContent',this.boardContent.replace(/(<([^>]+)>)/ig,""));
        formData.append('file',this.files);
        
        for(let key of formData.entries()){
        console.log(`${key}`);
        }

      axios.post("http://localhost:8082/itjobgo/community/communityBoardUpdateEnd",
        formData,
        { headers:{
          'Content-Type':'multipart/form-data'
        }}).then((data)=>console.log(data))
        .catch((error)=>
        console.log(error))
        console.log(formData);
        //등록후 게시판 리스트로 이동
        this.$router.push({name:'CommunityBoardList'})
      },

      handleFile(){
        console.log(this.$refs.upfiles.$refs.input.files[0]);
        this.files=this.$refs.upfiles.$refs.input.files[0];
        console.log(this.files);
      },

      // onReset(evt) {
      //   evt.preventDefault()
      //   // Reset our form values
      //   // this.form.email = ''
      //   this.boardTitle = ''
      //   this.category = null
      //   this.boardContent=''
      //   this.files.name=''
      // },
    // clearFiles() {
    //   this.$refs['file-input'].reset()
    // }
    }
  }
</script>

<style>
@import '../../assets/css/BoardUpdate.css';
</style>