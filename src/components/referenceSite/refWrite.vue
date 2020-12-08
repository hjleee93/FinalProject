<template>
<b-container>
<div class="container">
  <div>
			<h2 class="st_title">사이트 등록하기</h2>

    <b-row class="info">
          * 참고 사이트 등록은 관리자 승인 후 업로드 됩니다. (작성일 기준 1-2일 소요)
    </b-row><hr>

    <form @submit.prevent="enroller"  enctype="multipart/form-data">

        <b-form-group
            label="사이트명"
            >
          <b-form-input
            id="title"
            v-model="reftitle"
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
  </form>

  </div>
</div>
</b-container>

</template>

<script>
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
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.site = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      clearFiles() {
        this.$refs['file-input'].reset()
      }
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