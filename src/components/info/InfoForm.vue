<template>
<b-container>

 <div class="container">
  <h2 class="st_title">Information 작성</h2><hr>
    
    <form @submit.prevent="enrollInfo" 
    @reset="onReset"  enctype="multipart/form-data">
     
    <b-form-group
      id="input-group-2" 
      label="기업명" 
      label-for="input-2">

    <b-form-input
      id="input-2"
      v-model="infoTitle"
      required
      placeholder="기업명을 작성하세요"
    ></b-form-input>
    </b-form-group>

    <b-form-group 
      id="input-group-3" 
      label="분류" 
      label-for="input-3">
      <b-form-select
        id="input-3"
        v-model="category"
        :options="infoCategory"
        required
      ></b-form-select>
    </b-form-group> 

 	  <b-form-group 
      id="input-group-4" 
      label="날짜" 
      label-for="input-4">
    <input type="date" v-model="infoDate" >
     
    <b-form-date
        id="input-4"
        v-model="infoDate"
        :options="date"
        required 
      ></b-form-date>
    </b-form-group> 

    <b-form-group  label="시간" >
      <input type="time"  
        v-model="infoTime"
      ></b-form-group>

    <b-form-group label="주소/내용" >
      <vue-editor id="vue-editor" 
      v-model="infoContent"
      name="infoContent"/>
    </b-form-group>

    <b-form-group>
      <b-form-file 
        id="files" 
        ref="upfiles" 
        v-on:change="handleFile"
        placeholder="첨부파일 선택" >
      </b-form-file> 
    </b-form-group>

    <!--첨부파일 리셋 버튼-->
    <b-button @click="clearFiles" id="file_btn" class="mr-2">Clear files</b-button>
    <!--버튼 -->
    <div id="btn_bottom">
      <b-button id="submit" @click="enrollInfo">등록</b-button>
      <b-button type="reset" id="reset-btn">Reset </b-button>
      <b-button to="/infoList" exact id="cancel">취소</b-button>
    </div>

    </form>
  </div>
</b-container>
</template>

  <script>
  import { VueEditor } from "vue2-editor";
  import axios from 'axios';
  import { createNamespacedHelpers } from "vuex";
  const { mapState } = createNamespacedHelpers("memberStore");

    export default {
      data() {
        return {
            infoTitle: '',
            category : "null",
            infoCategory :[
          { value: null, text: '분류를 선택하세요' },
          { value: '설명회', text: '설명회' },
          { value: '박람회', text: '박람회' },
          { value: '상담회', text: '상담회' },
        ],
            infoDate : '',
            infoTime : '',
            infoContent: "",   
            files :""        
        }
      },
    components:{
      VueEditor
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

          console.log(this.category);

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
        onReset(evt) {
         evt.preventDefault()
          this.infoTitle = ''
          this.category = null
          this.infoContent=''
          this.files.name=''
        },
        clearFiles() {
          this.$refs['upfiles'].reset()
        },
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
  #reset-btn{
    width:60px;
    margin-bottom: 5px; 
    margin-right: 2%;
    background-color: #9BA4B4;
    border:5px;
    color:white; 
  }
  #btn_bottom{
  margin: 2%;
  text-align: center;
  }
</style>