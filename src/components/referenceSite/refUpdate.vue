<template>
<b-container>
<div class="container">
  <div>
		<h2 class="st_title">사이트 수정 및 삭제</h2>
    <div class="info">
          * 참고 사이트 등록은 관리자 승인 후 업로드 됩니다. (작성일 기준 1-2일 소요)
    </div><hr>
    
    <b-form role="form" @submit.prevent="updateForm"
      enctype="multipart/form-data">
        <b-form-group
            label="사이트명"
            >
          <b-form-input
            type="text"
            name="refTitle"
            required
            v-model="refListView.refTitle"
            placeholder="사이트 명을 입력해주세요"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="분류"
            label-for="input-3">
          <b-form-select
            v-model="category"
            :options="refCategory"
            required
          ></b-form-select>
        </b-form-group>
        
        <b-form-group
            label="사이트 주소"
            >
          <b-form-input
            id="address"
            v-model="refListView.refSiteAddr"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="내용" >
          <b-form-textarea
            id="content"
            placeholder="사이트 소개 및 정보를 입력해주세요"
            rows="5"
            max-rows="10"
            v-model="refListView.refContent"
            required
          ></b-form-textarea>
        </b-form-group>

      <!-- 첨부파일 -->
      <b-form-group>
        <b-form-file id="files" ref="upfiles" v-on:change="handleFile"
        :placeholder="refAttachment.originalfilename" ></b-form-file> 
      </b-form-group>

      <!-- 등록버튼  -->
      <div class="btn_sr2">
      <b-button id="btn_write2" type="submit" >수정 완료</b-button>
      </div>

  </b-form>

  </div>
</div>



</b-container>


</template>


<script>
import { mapState } from 'vuex';
import axios from 'axios';

  export default {
    data() {
      return {
          reftitle:"",
          category:null,
          refSiteAddr:"",
          refCategory :[
            { value: null, text: '분류를 선택해주세요' },
            { value: '백엔드', text: '백엔드' },
            { value: '프론트엔드', text: '프론트엔드' },
            { value: '기타', text: '기타' },
          ],
          refContent:"",
          files : "",

      }
    },

    created() {
    const refNo=this.$route.params.id;
      this.$store.dispatch("FETCH_REF_UPDATE",refNo)
    },

    components:{
    },

    computed: {
    ...mapState({
        //mapState를 통해서 store에 저장된 (객체) data를 가져다 쓸수있다
        refListView:state=>state.refListView,    
        refAttachment:state=>state.refAttachment,
      })
    },

    methods: {
      updateForm() {
        //새로고침 1초컷
        setTimeout(() => {
        //새롭게 수정된 내용이 없다면 원래 객체의 컬럼값을 가져가도록
        if(!this.refTitle){
          this.refTitle=this.refListView.refTitle;
        }
        if(!this.refContent){
          this.refContent=this.refListView.refContent;
        }
        if(!this.refCategory){
          this.refCategory=this.refListView.refCategory;
        }
        if(!this.refSiteAddr){
          this.refSiteAddr=this.refListView.refSiteAddr;
        }
        if(!this.files){
          this.files=this.refAttachment.renamedfilename;
        }
        
        let formData = new FormData();
        formData.append('refTitle',this.refTitle);
        formData.append('refSiteAddr',this.refSiteAddr);
        formData.append('refCategory',this.category);
        formData.append('refNo',this.$route.params.id);
        formData.append('refContent',this.refContent.replace(/(<([^>]+)>)/ig,""));
        formData.append('file',this.files);
        
        for(let key of formData.entries()){
        console.log(`${key}`);
        }

      axios.post("http://localhost:8082/itjobgo/ref/updateEnd",
        formData,
        { headers:{
          'Content-Type':'multipart/form-data'
        }}).then((data)=>console.log(data))
        .catch((error)=>
        console.log(error))
        console.log(formData);
        //수정 후 게시판 리스트로 이동
        this.$router.push({name:'refSite'});
           }, 1000)
      },
      
        handleFile(){
        console.log(this.$refs.upfiles.$refs.input.files[0]);
        this.files=this.$refs.upfiles.$refs.input.files[0];
        console.log(this.files);
        },
    }
    

  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@1,600&display=swap');

* {
  font-family: "Noto Sans KR", sans-serif;
}
.info{
  margin-left: 0%;
  margin-top: 2%;
  color: red;
}
.st_title{
  margin-top:5%;
  margin-bottom: 1%;
}
.btn_sr2{
  padding-left: 37%;
  margin: 5%;
  margin-bottom: 5%;
}
.btn-space2{
  margin-right: 13px;
}
#btn_write2{
  margin-left: 7%;
  background-color:  #424874;
  border: 1px  #424874 solid;
  color:white;
}

</style>