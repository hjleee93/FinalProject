<template>
<b-container>
<div class="container">
  <div>
		<h2 class="st_title">사이트 등록하기</h2>
    <div class="info">
          * 참고 사이트 등록은 관리자 승인 후 업로드 됩니다. (작성일 기준 1-2일 소요)
    </div><hr>

    <b-form role="form"  @submit.prevent="enrollref"
                          @reset="onReset" enctype="multipart/form-data">
        <b-form-group
            label="사이트명"
            >
          <b-form-input
            v-model="reftitle"
            type="text"
            required
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
            v-model="refaddress"
            required
            placeholder="ex) https://www.itjobgo.com"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="내용" >
          <b-form-textarea
            id="content"
            placeholder="사이트 소개 및 정보를 입력해주세요"
            rows="5"
            max-rows="10"
            v-model="refcontent"
            required
          ></b-form-textarea>
        </b-form-group>

        <b-col
          cols="12"
          md="12"
        >
        <v-file-input
          label="대표 이미지를 등록해주세요"
          filled
          accept=".gif,.jpg,.png"
          ref="upfiles"
          prepend-icon="mdi-camera"
          v-on:change="handleFile"
          required
        >
        </v-file-input>
        </b-col>

      <!-- 등록버튼  -->
      <div class="btn_sr2">
      <b-button type="submit" id="btn_write2" class="btn-space2">등록하기</b-button>
      <b-button type="button" id="btn_write2" class="btn-space2" to="/refSite">등록취소</b-button>
      </div>
  </b-form>

  </div>
</div>



</b-container>


</template>


<script>
import axios from 'axios';
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");

  export default {
    data() {
      return {
          reftitle:"",
          category:null,
          value: null,
          refaddress: "https://",
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

      components:{
      },

    computed: {
    ...mapState(['userData'])
      },

    methods: {
      enrollref() {
        //새로고침 1초컷
        setTimeout(() => {
        let formData = new FormData();
        formData.append('boardWriter',this.userData.memberName);
        formData.append('MemberNum',this.userData.memberSq);
        formData.append('refTitle',this.reftitle);
        formData.append('refCategory',this.category);
        formData.append('refContent',this.refcontent.replace(/(<([^>]+)>)/ig,""));
        formData.append('refSiteAddr',this.refaddress);
        formData.append('upfile',this.files);
        
        for(let key of formData.entries()){
        console.log(`${key}`);
        }
          console.log(this.category);

      axios.post("http://localhost:8082/itjobgo/ref/insertsite.do",
        formData,
        { headers:{
          'Content-Type':'multipart/form-data'
        }}).then((data)=>console.log(data))
        .catch((error)=>
        console.log(error))
        console.log(formData);
        this.$router.push({name:'refSite'});
           }, 1000)
      },
      
        handleFile(){
        console.log(this.$refs.upfiles.$refs.input.files[0]);
        this.files=this.$refs.upfiles.$refs.input.files[0];
        console.log(this.files);
        },

      onReset(evt) {
        evt.preventDefault()
        this.boardTitle = ''
        this.category = null
        this.boardContent=''
        this.files.name=''
      }
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
  background-color:  #424874;
  border: 1px  #424874 solid;
  color:white;
}

</style>