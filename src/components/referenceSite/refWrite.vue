<template>
<b-container>
<div class="container">
  <div>
		<h2 class="st_title">사이트 등록하기</h2>
    <div class="info">
          * 참고 사이트 등록은 관리자 승인 후 업로드 됩니다. (작성일 기준 1-2일 소요)
    </div><hr>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
            id="input-group-1"
            label-for="input-1"
            label-align="left"
            label="사이트명"
            >
          <b-form-input
            id="title"
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
            id="category"
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
            placeholder="사이트 주소를 정확히 입력해주세요"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            label="내용" >
          <b-form-textarea
            id="content"
            placeholder="사이트 소개 및 정보를 입력해주세요"
            rows="5"
            max-rows="10"
            v-model="mcontent"
            required
          ></b-form-textarea>
        </b-form-group>

        <b-col
          cols="12"
          md="12"
        >
        <v-file-input
          label="대표 이미지 등록"
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
// import { VueEditor } from "vue2-editor";

  export default {
    data() {
      return {
          ctg: '',
          value: null,
          category:null,
          refcategory :[
            { value: null, text: '분류를 선택해주세요' },
            { value: '백엔드', text: '백엔드' },
            { value: '프론트엔드', text: '프론트엔드' },
            { value: '기타', text: '기타' },
          ],
          
      }
    },

    computed:{
      ...mapState({
        

      })
    },

    methods: {
      
              enroller(){
              let formData=new FormData();
              formData.append('mtitle',this.mtitle);
              formData.append('mwriter',this.userData.memberName);
              formData.append('memail',this.userData.memberEmail);
              formData.append('mphone',this.userData.memberPhone);
              formData.append('sdate',this.sdate);
              formData.append('fdate',this.fdate);
              formData.append('back',this.back);
              formData.append('front',this.front);
              formData.append('desgin',this.desgin);
              formData.append('simcontent',this.simcontent);
              formData.append('upfile',this.files);
              formData.append('mcontent',this.mcontent);
              formData.append('langs',this.langs);
              formData.append('address',this.result.address);
              formData.append('rdate',this.rdate);
              for(let key of formData.entries()){
              console.log(`${key}`);
                }
                
              axios.post("http://localhost:8082/itjobgo/meeting/enrollmeeting.do"
              ,formData,
              { headers:{
                'Content-Type':'multipart/form-data'
              }})
              .then((data)=>console.log(data))
              .catch((error)=>console.log(error))
              },















      clearFiles() {
        this.$refs['file-input'].reset()
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