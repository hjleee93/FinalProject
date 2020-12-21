<template>
<div class="container-fluid">
      <div class="row">
      
      <!-- 메인 이미지 -->
      <div class="submenuimage ">
        <p class="subtitle" id="subtitle">포트폴리오 게시글 생성</p>
      </div>
  <b-container>

     <b-form role="form"  @submit.prevent="test">
    <b-input-group   prepend="제목" class="mb-2" >
     
        <b-form-input
        required
          id="input-1"
          name="pboardTitle"
          type="text"
          placeholder="제목"
          v-model="pboardTitle"
        ></b-form-input>
</b-input-group>
<b-input-group  prepend="분류" class="mb-2">
        <b-form-select
          id="input-3"
          v-model="category"
          :options="pboardDivision"
          required
        ></b-form-select>
         </b-input-group>
   
     
       <b-input-group  prepend="작성자" class="mb-2">
        <b-form-input
          id="input-2"
          name="pboardWriter"
        
          placeholder="작성자"
         readonly
          v-model="userData.memberName"
        ></b-form-input>
       </b-input-group>
   
       <b-form-file id="files" ref="upfiles" v-on:change="handleFile"
      placeholder="첨부파일" required
     
    ></b-form-file> 
      <b-form-group id="input-group-3"  label-for="input-3">
        <b-form-textarea
          id="textarea-content"
          v-model="pboardContent"
          required
          placeholder="내용을 입력해주세요"
          rows="10"
        ></b-form-textarea>
    </b-form-group>
  <!-- <b-form-group id="input-group-3" label="상세내용:" label-for="input-3">
   <vue-editor id="input-3" required name="pboardContent" v-model="pboardContent" />
   </b-form-group> -->
      <!-- <b-button type="submit" class="s-btn">확인</b-button> -->
      <b-row align-h="center"><b-col cols="1">
        <b-button type="submit" class="s-btn"> 확인 </b-button></b-col>
     <b-col cols="2"><b-button @click="reset()"  class="r-btn">돌아가기</b-button></b-col>
       </b-row>
       

    
    </b-form> 
 </b-container>
 </div>
</div>
  
</template>

<script>
import axios from 'axios';
import { createNamespacedHelpers } from "vuex";
//import { VueEditor } from "vue2-editor";
const { mapState } = createNamespacedHelpers("memberStore");
export default {
 
  data() {
      return {
        pboardTitle:'',
        pboardContent:'',
        files:'',
        tt:true,
        category:null,
        pboardDivision:[
           { value: null, text: '분류를 선택해주세요' },
          { value: '백엔드', text: '백엔드' },
          { value: '프론트', text: '프론트' },
          { value: '퍼블리셔', text: '퍼블리셔' },
          { value: '디자인', text: '디자인' },
        ],
       
      }
    },
    computed: {
        ...mapState(['userData'])
    },
    components:{
     // VueEditor,  
    },
    methods: {
      reset(){
        let check=confirm("작성된 글은 저장되지 않습니다. 돌아가시겠습니까?")
        if(check==true){
          this.$router.push({name:'portlist'})
        }else return
      },
      test(){
        let formData=new FormData();
        formData.append('pboardWriter',this.userData.memberName);
        formData.append('pboardTitle',this.pboardTitle);
        formData.append('memberSq',this.userData.memberSq)
        formData.append('pboardContent',this.pboardContent.replace(/(<([^>]+)>)/ig,""));
        formData.append('pboardDivision',this.category)
        formData.append('file',this.files);
        for(let key of formData.entries()){
          console.log(`${key}`);
        }
      axios.post("http://localhost:8082/itjobgo/portfolio/portfolioenroll.do",formData
       ,{ headers:{
          'Content-Type':'multipart/form-data'
        }}).then(()=>this.$router.push({name:'portlist'})
          )
        .catch((error)=>
        console.log(error))

      
        console.log(formData);

      },
      handleFile(){
        console.log(this.$refs.upfiles.$refs.input.files[0]);
        this.files=this.$refs.upfiles.$refs.input.files[0];
        console.log(this.files);
      },
      
     
    }
}
</script>

<style scoped>
.submenuimage {
  background-image: url("../../assets/images/computer-2583383_1920.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.subtitle {
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px #4e515763;
  font-size: 50px;
}
.s-btn{
  background-color: #424874;
}
.r-btn{
  background-color: #9BA4B4;
}




</style>

