<template>

<div class="container">
  <h2 class="st_title">채용설명회 일정</h2><hr>
    <form @submit.prevent="enrollInfo" @reset="onReset"  enctype="multipart/form-data">
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

    <b-form-group id="input-group-3" label="분류" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="infoCategory"
          :options="category"
          required
        ></b-form-select>
    </b-form-group>

 	  <b-form-group id="input-group-4" label="날짜" label-for="input-4">
      <input type="date" v-model="infoDate" >
     
    <b-form-date
        id="input-4"
        v-model="infoDate"
        :options="date"
        required 
      ></b-form-date>
    </b-form-group> 

    <b-form-group  label="시간" >
        <input type="time"  v-model="infoTime">
    </b-form-group>
    <!--   <p><input type="submit" value="Submit"></p> -->

    <b-form-group label="주소" >
      <textarea  style="resize: none" type="text" class="form-control" placeholder="주소를 작성하세요"
      select="address" maxlength="150" v-model="infoAddress">></textarea>
    </b-form-group>

    <!--Vue2Editor 작성-->
    <b-form-group label="첨부파일" >
      <vue-editor id="vue-editor" v-model="infoContent"
      name="infoContent"/>
    </b-form-group>

    <!-- 등록/취소 버튼 -->
    <div class="btn_sr">
      <v-btn type="submit" id="submit"  @click="enrollInfo">등록</v-btn>
      <v-btn to="/infoList" exact id="cancel">취소</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from 'axios';

  /*  Vue2Editor 작성 */
    export default {
      components: { VueEditor },
      data() {
        return {
          form: {
            infoTitle: '',
            infoCategory : null,
            infoDate : '',
            infoTime : '',
            infoAddress : '',
            infoContent: "",
          },
          category: [{ text: '카테고리 선택', value: null }, '설명회', '상담회', '박람회'],
      show: true
        }
      },
    methods: {
        enrollerInfo() {
          let formData = new FormData();
          formData.append('infoTitle',this.infoTitle);
          formData.append('infoCategory',this.infoCategory);
          formData.append('infoDate',this.infoDate);
          formData.append('infoTime',this.infoTime);
          formData.append('infoAddress',this.infoAddress);
          formData.append('infoContent',this.infoContent.replace(/(<([^>]+)>)/ig,""));

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
        },

        handleFile(){
          console.log(this.$refs.upfiles.$refs.input.files[0]);
          this.files=this.$refs.upfiles.$refs.input.files[0];
          console.log(this.files);
        },

        onSubmit(evt) {
          evt.preventDefault()
          alert(JSON.stringify(this.form))
        },

      onReset(evt) {
        evt.preventDefault()
          this.form.infoTitle=''
          this.form.infoCategory=''
          this.form.infoDate=''
          this.form.infoTime=''
          this.form.infoAddress=''
          this.form.infoContent=''

          this.show = false
          this.$nextTick(() => {
          this.show = true
          })
        },
      /*  clearFiles() {
          this.$refs['file-input'].reset()  
          },
      */
       cancel: function (){
              this.$router.push('/info')
      }
    },
  }
</script>

<style>
.st_title{
  margin-top:5%;
  margin-bottom: 3%;
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
  width:5px;
  margin-bottom: 5px;
  margin-right: 0%;
  background-color: #424874;
  border:1px;
  color:white; 
}
#cancel{
  width:5px;
  margin-bottom: 5px;
  right: -10px;
  margin-right: 0%;
  background-color: #9BA4B4;
  border:5px;
  color:white; 
}
/* #reset{
  width:5px;
  margin-bottom: 5px;
  right: -40px;
  margin-right: 0%;
  background-color: #9BA4B4;
  border:5px;
  color:white; 
} */
</style>
