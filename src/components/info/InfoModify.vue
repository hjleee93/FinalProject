<template>
<b-container>

<div class="container"  id="header-container">
  <h2 class="st_title">게시글 수정</h2><hr>
</div>

    <form @submit.prevent="updateForm" 
       enctype="multipart/form-data">
      <b-form-group
      id="input-group-1" 
      label="기업명" 
      label-for="input-1"
      label-align="left">

      <b-form-input
        id="input-1"
        name="infoTitle"
        type="text"
        required
        placeholder="기업명을 작성하세요"
        v-model="infoDetail.infoTitle"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" 
     label="분류"  label-for="input-2" label-align="left">
        <b-form-select
          id="input-2"
          v-model="category"
          :options="infoCategory"
          required
        ></b-form-select>
    </b-form-group>

 	  <b-form-group 
     id="input-group-3" 
     label="날짜" 
     label-for="input-3">
      <input type="date" v-model="infoDetail.infoDate" >
     
    <b-form-date
        id="input-3"
        name="infoDate"
        v-model="infoDetail.infoDate"
        :options="date"
        required 
      ></b-form-date>
    </b-form-group> 

    <b-form-group  label="시간" >
        <input type="time"  
        v-model="infoDetail.infoTime">
    </b-form-group>
    <!--   <p><input type="submit" value="Submit"></p> -->

  <!--   <b-form-group label="주소" >
      <textarea  style="resize: none" type="text" class="form-control" placeholder="주소를 작성하세요"
      select="address" maxlength="150" v-model="infoDetail.infoAddress">></textarea>
    </b-form-group> -->

    <!--Vue2Editor 작성--> 
     <b-form-group  label="내용" >
        <vue-editor 
          id="input-4"
          v-model="infoDetail.infoContent" 
          name="infoContent" />
      </b-form-group>

    <!-- 첨부파일 -->
    <b-form-group>
      <b-form-file 
        id="files" 
        ref="upfiles" 
        v-on:change="handleFile"
        :placeholder="infoAttachment.originalfilename" >
      </b-form-file> 
    </b-form-group>
 
    <!-- 등록/취소 버튼 -->
        <b-button  id="btn_write" @click="updateForm" class="btn-space">수정완료</b-button>
        <b-button type="button" id="btn_write"  to="/infoList" exact>목록으로</b-button>

    </form>

</b-container>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from 'axios'
import { mapState } from 'vuex';

  /*  Vue2Editor 작성 */
    export default {
      data() {
        return {
            infoTitle: '',
            category:"null",
            infoCategory :[
          { value: null, text: '분류를 선택해주세요' },
          { value: '설명회', text: '설명회' },
          { value: '박람회', text: '박람회' },
          { value: '상담회', text: '상담회' },
        ],
            infoDate : '',
            infoTime : '',
            infoContent: "",    
            files :"",       
            }
      },
      created() {
        const infoSq=this.$route.params.id;
          this.$store.dispatch("FETCH_INFO_UPDATE",infoSq)
          console.log("지금하고있는 로그 " + infoSq);
        },

      computed:{
        //mapState를 통해서 store에 저장된 객체를 가져온다
       ...mapState({
        infoDetail:state=>state.infoDetail,
        infoAttachment:state=>state.infoAttachment,    
        })
      },
      components:{
          VueEditor,
        },

    methods: {
         updateForm() {
       
        if(!this.infoTitle){
          this.infoTitle=this.infoDetail.infoTitle;
        }
        if(!this.category){
          this.category=this.infoDetail.category;
        }
        if(!this.infoDate){
          this.infoDate=this.infoDetail.infoDate;
        }
         if(!this.infoTime){
          this.infoTime=this.infoDetail.infoTime;
        }
        if(!this.infoContent){
          this.infoContent=this.infoDetail.infoContent;
        }
        if(!this.files){
          this.files=this.infoAttachment.renamedfilename;
        }
         

        let formData = new FormData();
        formData.append('infoSq',this.$route.params.id);
        formData.append('infoTitle',this.infoTitle);
        formData.append('infoCategory',this.category);
        formData.append('infoDate',this.infoDate);
        formData.append('infoTime',this.infoTime);
        formData.append('infoContent',this.infoContent.replace(/(<([^>]+)>)/ig,""));
        formData.append('file',this.files);

        for(let key of formData.entries()){
        console.log(`${key}`);
        }

      axios.post("http://localhost:8082/itjobgo/info/infoUpdateEnd",
        formData,
        { headers:{
          'Content-Type':'multipart/form-data'
        }}).then((data)=>console.log(data))
        .catch((error)=>
        console.log(error))
        console.log(formData);
        //등록하면 게시판 목록으로
        this.$router.push({name:'infoList'})
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
</style>
