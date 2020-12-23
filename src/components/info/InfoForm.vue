<template>
<b-container>

 <div class="container">
  <h2 class="st_title">Information 작성</h2><hr>
    
<!--     <b-form role="form" @submit.prevent="enrollInfo" 
    @reset="onReset"  enctype="multipart/form-data"> -->
  <b-form @submit.prevent="enrollInfo" 
     enctype="multipart/form-data">

    <b-input-group prepend="기업" class="mb-2" >
      <b-form-input
        id="input-2"
        v-model="infoTitle"
        required
        placeholder="기업명을 작성하세요"
      ></b-form-input>
      </b-input-group>

    <b-input-group prepend="분류" class="mb-2" >
      <b-form-select
        id="input-3"
        v-model="category"
        :options="infoCategory"
        required
      ></b-form-select>
    </b-input-group>

  <b-input-group prepend="날짜" class="mb-2">
      <b-form-datepicker 
        label="날짜"
        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" 
        :min="min"  
        v-model="infoDate" 
        required 
        locale="ko"  
      ></b-form-datepicker>
  </b-input-group>

<!--   <b-input-group prepend="시간" class="mb-2" >
    <b-form-timepicker
      label="시간"
      type="time"  
      v-model="infoTime"
      required
      now-button
      reset-button
      locale="ko"
    ></b-form-timepicker>
    </b-input-group>
 -->

  <b-input-group prepend="시간" class="mb-2" >
      <b-form-input 
        label="시간"
        type="time"  
        v-model="infoTime"
        required
      ></b-form-input>
    </b-input-group>
   
    <b-form-group id="input-group-3" label-for="input-3" >
      <b-form-textarea
        id="textarea-content"
        v-model="infoContent"
        required
        placeholder=" 주소 또는 내용을 작성하세요"
        rows="6"
      ></b-form-textarea>
    </b-form-group>

    <b-input-group>
      <b-form-file 
        id="files" 
        ref="upfiles" 
        v-on:change="handleFile"
        placeholder="첨부파일 선택" >
      </b-form-file> 
    </b-input-group>

    <!--첨부파일 리셋 버튼-->
   <!--  <b-button @click="clearFiles" id="file_btn" class="mr-2">Clear files</b-button> -->
    <!--버튼 -->
    <div id="btn_bottom">
      <b-button type="submit" id="submit">등록</b-button>
    <!--   <b-button type="reset" id="reset-btn">Reset </b-button> -->
      <b-button to="/infoList" exact id="cancel">취소</b-button>
    </div>

    </b-form>
  </div>
</b-container>
</template>

  <script>
  /* import { VueEditor } from "vue2-editor"; */
  import axios from 'axios';
  import { createNamespacedHelpers } from "vuex";
  const { mapState } = createNamespacedHelpers("memberStore");
  
    export default {
      data() {
    /*   const now = new Date() */
    /*   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()) */
    /*   const minDate = new Date(today)
        */
       return {
            infoTitle: "",
            category : null,
            infoCategory :[
          { value: null, text: '분류를 선택하세요' },
          { value: '설명회', text: '설명회' },
          { value: '박람회', text: '박람회' },
          { value: '상담회', text: '상담회' },
        ],
            infoDate : "",
            infoTime : "",
            infoContent: "",   
            files : "",  
           /*  min:minDate,  */
            state:null    
        }
      },
     components:{
     /*  VueEditor */
    }, 
    computed: {
    ...mapState(['userData'])
    },
    methods: {
        enrollInfo() {
          let formData = new FormData();
          formData.append('memberSq',this.userData.memberSq);
          formData.append('infoTitle',this.infoTitle);
          formData.append('infoCategory',this.category);
          formData.append('infoDate',this.infoDate);
          formData.append('infoTime',this.infoTime);
          formData.append('infoContent',this.infoContent.replace(/(<([^>]+)>)/ig,""));
          formData.append('file',this.files);

          for(let key of formData.entries()) {
          console.log(`${key}`);
          }

        axios.post("http://localhost:8082/itjobgo/info/infoForm",
          formData,
          { headers:{
            'Content-Type':'multipart/form-data'
          }}).then((data)=>console.log(data))
          .catch((error)=>
          console.log(error))
          console.log(formData);
          this.$router.push({name:'InfoList'})
        },
        handleFile(){
          console.log(this.$refs.upfiles.$refs.input.files[0]);
          this.files=this.$refs.upfiles.$refs.input.files[0];
          console.log(this.files);
        },
 /*         onReset(evt) {
         evt.preventDefault()
          this.infoTitle=''
          this.category=null
          this.infoContent=''
          this.files.name=''
        },  */
    /*     clearFiles() {
          this.$refs['upfiles'].reset()
        },  */
      }
    }
</script>

<style>
  .st_title{
    margin-top:5%;
    margin-bottom: 1%;
  }
  .btn_sr{
    margin-top: 0%;
    position:absolute;
    left:44%;
  }
  .btn-space{
    margin-right: 15px;
  }
  #submit{
    width:60px;
    margin-bottom: 5px; 
    margin-right: 2%;
    background-color: #424874;
    border:1px;
    color:white; 
  }
  #cancel{
    width:60px;
    margin-bottom: 5px; 
    margin-right: 2%;
    background-color: #9BA4B4;
    border:5px;
    color:white; 
  }
 /*  #reset-btn{
    width:60px;
    margin-bottom: 5px; 
    margin-right: 2%;
    background-color: #9BA4B4;
    border:5px;
    color:white; 
  } */
  #btn_bottom{
  margin: 2%;
  text-align: center;
  }
</style>