<template>

<div class="container">
  <h2 class="st_title">게시글 수정</h2><hr>

    <form @submit.prevent="Submit" @reset="onReset" v-if="show">
     
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
          v-model="category"
          :options="infoCategory"
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
        <vue-editor /> 
    <!--   <vue-editor id="vue-editor" v-model="infoContent"
      name="infoContent"/> -->
    </b-form-group>

    <!-- 등록/취소 버튼 -->
    <div class="btn_sr">
      <v-btn type="submit" id="submit"  >수정 완료</v-btn>
      <v-btn type="reset" to="/infoList" exact id="cancel">취소</v-btn>
      </div>
    </form>
  </div>
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
            category:null,
            infoCategory :[
          { value: null, text: '분류를 선택해주세요' },
          { value: '설명회', text: '설명회' },
          { value: '박람회', text: '박람회' },
          { value: '상담회', text: '상담회' },
        ],
            infoDate : '',
            infoTime : '',
            infoAddress : '',
            infoContent: "",           
            }
      },

      computed:{
        //mapState를 통해서 store에 저장된 객체를 가져온다
       ...mapState({
        infoDetail:state=>state.infoDetail,
        cbAttachment:state=>state.cbAttachment,    
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
         if(!this.infoAddress){
          this.infoAddress=this.infoDetail.infoAddress;
        }
        if(!this.infoContent){
          this.infoContent=this.infoDetail.infoContent;
        }
         

        let formData = new FormData();
        formData.append('infoTitle',this.infoTitle);
        formData.append('infoCategory',this.category);
        formData.append('infoSq',this.$route.params.id);
        formData.append('infoDate',this.infoDate);
        formData.append('infoTime',this.infoTime);
        formData.append('infoAddress',this.infoAddress);
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
