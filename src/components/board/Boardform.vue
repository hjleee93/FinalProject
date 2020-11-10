<template>

<div class="container">
  <h2 class="st_title">채용설명회 일정</h2><hr>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-2" label="기업명" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="기업명을 작성하세요"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="분류" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.select"
            :options="select"
            required
          ></b-form-select>
      </b-form-group>

 	 <b-form-group id="input-group-4" label="날짜" label-for="input-4">
        <input type="date" v-model="date" >
          <b-form-date
            id="input-4"
            v-model="form.date"
            :options="date"
            required 
          ></b-form-date>
   </b-form-group> 

     <!--Vue2Editor 작성-->
    <b-form-group  label="시간" >
        <input type="time">
    </b-form-group>
    <!--   <p><input type="submit" value="Submit"></p> -->

    <b-form-group label="주소" >
      <textarea  style="resize: none" type="text" class="form-control" placeholder="주소를 작성하세요"
      select="address" maxlength="150"></textarea>
    </b-form-group>

    <b-form-group label="첨부파일" >
      <vue-editor id="vue-editor" v-model="form.content"/>
    </b-form-group>

      <!-- 등록/취소/리셋 버튼 -->
      <div class="btn_sr">
        <v-btn to="/detail" exact id="submit">등록</v-btn>
        <v-btn to="/detail" exact id="cancel">취소</v-btn>

      </div>
    </b-form>
</div>
</template>

<script>
import { VueEditor } from "vue2-editor";
    /*  Vue2Editor 작성 */
  export default {
    components: { VueEditor },
    data() {
      return {
        form: {
          name: '',
          select : null,
          date : '',
          time : '',
          address : '',
          content: "",
        },
        select: [{ text: '카테고리 선택', value: null }, '설명회', '상담회', '박람회'],
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
        this.form.name=''
        this.form.select=''
        this.form.date=''
        this.form.time=''
        this.form.address=''
        this.form.content=''
       /*  this.form.checked = [] */
      // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      clearFiles() {
        this.$refs['file-input'].reset()
      },
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
      /*  background-color:#424874;
   border: 1px  #424874 solid;
   top: 0px;
   left:1050px; */
  width:5px;
  margin-bottom: 5px;
  /* right: -10px;  */
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
