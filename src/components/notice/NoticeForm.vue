<template>
  <b-container>

    <div class="container" id="header-container">
      <h4 id="h4-title">공지사항 작성</h4>
      <b-button type="button" id="list-btn2" to="/noticeList" exact>목록</b-button>
    </div>

    <form @submit.prevent="enrollBoard" 
    @reset="onReset" enctype="multipart/form-data">
<b-input-group 

                  prepend="제목">

        <b-form-input
        
          id="input-1"
          v-model="noticeTitle"
          type="text"
          required
          placeholder="제목을 입력해주세요(최소5글자 이상)"
          :state="noticeTitle.length >= 10"
        ></b-form-input>
</b-input-group>

    <!-- <b-form-group id="input-group-2" label="작성자" label-for="input-2">
        <b-form-input
          id="input-2"
          name="boardWriter"
          required
          placeholder="작성자"
          readonly
          
          v-model="userData.memberName"
        ></b-form-input>
      </b-form-group> -->

        
      <b-input-group 

                  prepend="분류">

        <b-form-select
          id="input-3"
          v-model="category"
          :options="noticeDivision"
          required
        ></b-form-select>
      </b-input-group>



      <!-- 에디터 창 -->
      <!-- <b-form-group id="input-group-3" label="상세내용:" label-for="input-3">
        <vue-editor  id="input-3" v-model="boardContent" 
        name="boardContent"/>
     </b-form-group> -->

    <b-form-textarea
      id="textarea-content"
      v-model="noticeContent"
      :state="noticeContent.length >= 10"
      placeholder="내용을 입력해주세요(최소 10글자)"
      rows="10"
    ></b-form-textarea>

      <!-- 첨부파일 -->
     
        <b-form-file id="files" ref="upfiles" v-on:change="handleFile"
        placeholder="첨부파일을 선택해주세요"></b-form-file> 
     
      <!-- <b-form-file id="file2" ref="upfiles" v-on:change="handleFile"
    placeholder="첨부파일을 선택해주세요"></b-form-file>  -->

      <b-button id="submit-btn2"  @click="enrollBoard2">완료</b-button>
      <b-button type="reset" id="reset-btn2">취소</b-button>
      
    </form>


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
        noticeTitle:"",
        category:null,
        noticeDivision :[
          { value: null, text: '분류를 선택해주세요' },
          { value: '공지', text: '공지' },
          { value: '긴급', text: '긴급' }
      
        ],
        noticeContent:"",
        files :""
      }
    },

    components:{
      // VueEditor,
    },

    computed: {
    ...mapState(['userData'])
    },

    methods: {
      //글쓰기 버튼
      enrollBoard2() {
        
        let formData = new FormData();
        formData.append('memberNum',this.userData.memberSq)
        formData.append('noticeTitle',this.noticeTitle);
        formData.append('noticeDivision',this.category);
        formData.append('noticeContent',this.noticeContent.replace(/(<([^>]+)>)/ig,""));
        formData.append('file',this.files);
        
        for(let key of formData.entries()){
        console.log(`${key}`);
        }
          console.log(this.category);

      axios.post("http://localhost:8082/itjobgo/notice/insertNotice",
        formData,
        { headers:{
          'Content-Type':'multipart/form-data'
        }}).then((data)=>console.log(data))
        .catch((error)=>
        console.log(error))
        console.log(formData);
        this.$router.push({name:'NoticeList'});
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
        this.noticeTitle = ''
        this.category = null
        this.noticeContent=''
        this.files.name=''
      }
    }
  }
</script>

<style>
@import '../../assets/css/BoardForm.css';
</style>