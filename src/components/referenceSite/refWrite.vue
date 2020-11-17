<template>

<div class="container">
  <div>
			<h2 class="st_title">사이트 등록하기<small id="sm_date">20/01/05</small></h2><hr>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <!-- <b-form-group id="input-group-2" label="작성자" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group> -->

      <b-form-group id="input-group-2" label="사이트 주소" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.site"
          required
          placeholder="Enter site"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="category" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.value"
          :options="name"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group  label="사이트 정보 및 소개" >
        <textarea type="text" class="form-control" placeholder="내용을 작성하세요"
        name="contentDetail" maxlength="1024" style="height: 200px;"></textarea>
      </b-form-group>

      <div>
        <p class="mt-2">사이트 참고 이미지<b>{{ file ? file.name : '' }}</b></p>
        <b-form-file v-model="file" ref="file-input" class="mb-2"></b-form-file>
        <b-button @click="clearFiles" class="mr-2">Clear files</b-button>
        <!-- <b-button @click="file = null">Reset via v-model</b-button> -->

      <!-- <b-form-group id="input-group-4">
      <br>
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">게시글 공개</b-form-checkbox>
          <b-form-checkbox value="that">게시글 비공개</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->

      </div>
      <div class="btn_sr">
      <b-button id="btn_sr1" type="submit" variant="primary" class="btn-space">등록하기</b-button>
      <b-button id="btn_sr1" type="reset" variant="primary" class="btn-space" onclick="history.back(-1);">목록으로</b-button>
      </div>
    </b-form>

    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</div>

</template>

<script>
  export default {
    data() {
      return {
        form: {
          file: null,
          email: '',
          name: '',
          value: null,
          checked: []
        },
        name: [{ text: 'Select One', value: null }, 'Category 2-1', 'Category 2-2', 'Category 2-3'],
        show: true
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
.st_title{
  margin-top:5%;
  margin-bottom: 1%;
}
.btn_sr{
  margin-top: 3%;
  position:absolute;
  left:44%;
}
.btn-space{
  margin-right: 15px;
}
#btn_sr1{
  background-color:  #424874;
  border: 1px  #424874 solid;
  color:white;
}
#sm_date{
  margin-left: 1%;
  font-size: 17px;
  color: #9BA4B4;
}
</style>