<template>
    <b-container>
    
    <div class="container" id="header-container">
    <h4 id="h4-title">IT소식 작성</h4>
    </div>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="제목"
        label-for="input-1"
        label-align="left"
      >
        <!-- description="분류를" -->
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          required
          placeholder="제목을 입력해주세요"
        ></b-form-input>
      </b-form-group>

      <!-- <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group> -->

      <b-form-group id="input-group-3" 
      label="분류선택" label-for="input-3" label-align="left">
        <b-form-select
          id="input-3"
          v-model="form.category"
          :options="categories"
          required
        ></b-form-select>
      </b-form-group>

      <!-- 에디터 창 -->
      <vue-editor  id="vue-editor" v-model="form.content"/>

      <!-- 첨부파일 -->
      <b-form-group
        id="input-group-4"
        label="첨부파일"
        label-for="input-4"
        label-align="left"
      >
      <b-form-file
      id="input-4"
      v-model="form.file1"
      placeholder="첨부파일을 선택해주세요"
      ></b-form-file>
            <b-form-file
      id="input-5"
      v-model="form.file2"
      placeholder="첨부파일을 선택해주세요"
      ></b-form-file>
      </b-form-group>



      <!-- <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->
      <b-button type="submit" id="submit-btn2">완료</b-button>
      <b-button type="reset" id="reset-btn2">취소</b-button>
      <b-button type="button" id="list-btn2" to="/itNewsList" exact>목록</b-button>
    </b-form>


<p>====================출력 테스트용====================</p>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </b-container>
</template>

<script>
import { VueEditor } from "vue2-editor";
  export default {
    data() {
      return {
        form: {
          // email: '',
          name: '',
          category: null,
          content : "",
          file1:'',
          file2:'',

          // checked: []
        },
        categories: [{ text: '분류(필수사항)', value: null }, '컨퍼런스', '강의', '모집', '뉴스'],
        show: true
      }
    },
    components:{
      VueEditor,
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        // this.form.email = ''
        this.form.name = ''
        this.form.category = null
        this.form.content=''
        this.form.file1.name=''
        this.form.file2.name=''
        // this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style>
@import '../../assets/css/BoardForm.css';


</style>