<template>
<b-container>
<div class="container">
  <div>
		<h2 class="st_title">사이트 수정 및 삭제</h2>
    <div class="info">
          * 참고 사이트 등록은 관리자 승인 후 업로드 됩니다. (작성일 기준 1-2일 소요)
    </div><hr>
    이거 나오냐 {{refListView}} ?,{{refAttachment}}
    
    <b-form role="form"  @submit.prevent="updateForm"
                          enctype="multipart/form-data">
        <b-form-group
            label="사이트명"
            >
          <b-form-input
            name="reftitle"
            type="text"
            required
            v-model="refListView.reftitle"
            placeholder="사이트 명을 입력해주세요"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="분류"
            label-for="input-3">
          <b-form-select
            v-model="category"
            :options="refcategory" 
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
            v-model="refListView.refcontent"
            required
          ></b-form-textarea>
        </b-form-group>

      <!-- 첨부파일 -->
      <b-form-group>
        <b-form-file id="files" ref="upfiles" v-on:change="handleFile"
        :placeholder="refListView.originalfilename" ></b-form-file> 
      </b-form-group>

      <!-- 등록버튼  -->
      <div class="btn_sr2">
      <b-button type="submit" id="btn_write2" class="btn-space2">수정완료</b-button>
      <b-button type="button" id="btn_write2" class="btn-space2">삭제하기</b-button>
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
          refSiteAddr: "",
          refcategory :[
            { value: null, text: '분류를 선택해주세요' },
            { value: '백엔드', text: '백엔드' },
            { value: '프론트엔드', text: '프론트엔드' },
            { value: '기타', text: '기타' },
          ],
          refcontent:"",
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
        //새롭게 수정된 내용이 없다면 원래 객체의 컬럼값을 가져가도록
        if(!this.reftitle){
          this.reftitle=this.refListView.reftitle;
        }
        if(!this.refcontent){
          this.refcontent=this.refListView.refcontent;
        }
        if(!this.refcategory){
          this.refcategory=this.refListView.refcategory;
        }
        if(!this.refSiteAddr){
          this.refSiteAddr=this.refListView.refSiteAddr;
        }
        if(!this.files){
          this.files=this.refAttachment.renamedfilename;
        }
        
        let formData = new FormData();
        formData.append('refNo',this.$route.params.id);
        formData.append('refTitle',this.reftitle);
        formData.append('refCategory',this.category);
        formData.append('refContent',this.refcontent.replace(/(<([^>]+)>)/ig,""));
        formData.append('refSiteAddr',this.refaddress);
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
        this.$router.push({name:'refSite'});
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
  background-color:  #424874;
  border: 1px  #424874 solid;
  color:white;
}

</style>