<template>
  <b-container>

    <div class="container" id="header-container">
      <h4 id="h4-title">IT소식 수정</h4>
    </div>

    <form  role="form" @submit.prevent="updateForm" 
     enctype="multipart/form-data">
  <b-input-group   prepend="제목" class="mb-2" >
        <b-form-input
          id="input-1"
          name="newsTitle"
          type="text"
          required
          placeholder="제목"
          v-model="itNewsView.newsTitle"
        ></b-form-input>
      </b-input-group>

       <b-input-group  prepend="분류" class="mb-2">
          <b-form-select
            id="input-2"
            v-model="category"
            :options="newsDivision"
            required
          ></b-form-select>
        </b-input-group>

  <b-form-group id="input-group-3"  label-for="input-3">
      <b-form-textarea
        id="textarea-content"
        v-model="itNewsView.newsContent"
      required
        rows="10"
      ></b-form-textarea>
  </b-form-group>

  
       <b-input-group   prepend="연결 사이트" class="mb-2" >
        <b-form-input
          required
          id="input-1"
          v-model="itNewsView.newsRefSite"
          type="text"
          placeholder="연결하실 사이트를 입력해주세요"
        ></b-form-input>
    </b-input-group>

      <!-- 첨부파일 -->
      <b-form-group>
        <b-form-file id="files" ref="upfiles" v-on:change="handleFile"
        :placeholder="ITAttachment.originalfilename" ></b-form-file> 
      </b-form-group>
      <!-- <b-button @click="clearFiles" class="mr-2">Clear files</b-button> -->
 

      <b-button id="submit-btn2" type="submit" >완료</b-button>
      <!-- <b-button id="submit-btn2"  @click="onReset" >취소</b-button> -->
      <b-button type="button" id="list-btn2" to="/itNewsList" exact>목록</b-button>
      
    </form>
  </b-container>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import { mapState } from 'vuex';
import axios from 'axios'

  export default {

    data() {
      return {
        newsTitle:"",
        category:null,
        newsRefSite:"",
        newsDivision :[
          { value: null, text: '분류를 선택해주세요' },
          { value: '일반', text: '일반' },
          { value: '홍보', text: '홍보' }
        ],
        newsContent:"",
        files :"",
        
      }
    },

    created() {
    const newsSq=this.$route.params.id;
      this.$store.dispatch("FETCH_ITNEWS_UPDATE",newsSq)
    },

    computed:{
      ...mapState({
        //mapState를 통해서 store에 저장된 (객체) data를 가져다 쓸수있다
        itNewsView:state=>state.itNewsView,    
        ITAttachment:state=>state.ITAttachment,
      })
    },


    components:{
      // VueEditor,
    },
    
    methods: {
      updateForm() {
        //새롭게 수정된 내용이 없다면 원래 객체의 컬럼값을 가져가도록
        if(!this.newsTitle){
          this.newsTitle=this.itNewsView.newsTitle;
        }
        if(!this.newsContent){
          this.newsContent=this.itNewsView.newsContent;
        }
        if(!this.newsDivision){
          this.newsDivision=this.itNewsView.newsDivision;
        }
        if(!this.newsRefSite){
          this.newsRefSite=this.itNewsView.newsRefSite;
        }
        if(!this.files){
          this.files=this.ITAttachment.renamedfilename;
        }
        
        let formData = new FormData();
        formData.append('newsTitle',this.newsTitle);
        formData.append('newsRefSite',this.newsRefSite);
        formData.append('newsDivision',this.category);
        formData.append('newsSq',this.$route.params.id);
        formData.append('newsContent',this.newsContent.replace(/(<([^>]+)>)/ig,""));
        formData.append('file',this.files);
        
        for(let key of formData.entries()){
        console.log(`${key}`);
        }

      axios.post("http://localhost:8082/itjobgo/notice/updateEnd",
        formData,
        { headers:{
          'Content-Type':'multipart/form-data'
        }}).then((data)=>console.log(data))
        .catch((error)=>
        console.log(error))
        console.log(formData);
        //등록후 게시판 리스트로 이동
        this.$router.push({name:'ItNewsList'})
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
* {
  font-family: "Noto Sans KR", sans-serif;
}
</style>