<template>

  <div class="container">
    <div class="container-fluid">
        <h2 class="st_title">채용설명회 일정</h2><hr>
      <div class="row">

        <!-- side bar -->
     <!--    <div class="col-sm-3 col-md-2 sidebar">
          <b-list-group>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <a @click="$router.push({name: 'home'}).catch(()=>{});" exact><b>Q&A</b></a>
              <b-badge variant="primary" pill>14</b-badge>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <a @click="$router.push({name: 'reference'}).catch(()=>{});" exact><b>설명회</b></a>
              <b-badge variant="primary" pill>2</b-badge>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <small>Category</small>
            </b-list-group-item>
          </b-list-group>
        </div> -->

        <div class="container detail_">
        <!-- 
        <h7 class="detail_top">작성자 : 관리자 </h7>
          <h7 class="detail_top">조회수 : 0</h7> 
        -->
            <div>
                  기업 : <h5></h5>            
                <hr>
                  구분 : <h5></h5>            
                <hr>
                  날짜 :<h5></h5>
                <hr>
                  시간 :<h5></h5>
                  <hr/>
            </div>
                <div class="detail_write" >
                 주소 :
                </div>
                <hr>
                <div class="file" >
                 첨부 파일 :
                </div>
                <div class="detail_btn_div">
                  <v-btn to="/boardform" exact id="modify">수정</v-btn>
                  <v-btn to="/" exact id="delete">삭제</v-btn>
                  <v-btn to="/info" exact id="list">목록</v-btn>
                <!--  <b-button v-on:click="link1" class="detail_btn" id="modify" variant="primary">수정</b-button> -->
                <!-- <b-button class="detail_btn" id="delete" variant="primary">삭제</b-button> -->
                <!--   <b-button class="detail_btn" id="list" variant="primary" onclick="history.back(-1);">목록</b-button> -->
               <!--  <b-button v-on:click="link" class="detail_btn" id="list" variant="primary" onclick="history.back(-1);">목록</b-button> -->
                </div>
            </div>
        </div> 
      </div>
    </div>
</template>

<script>
export default {

 /* 목록버튼 */
  methods: {
    link: function (){
                   this.$router.push('/info')
      },
      //삭제버튼
    link1: function (){
                   this.$router.push('/boardform')
      }
    
    }
}
 
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@800&display=swap');
* {
   font-family: 'Nanum Gothic', sans-serif;
}
.detail_{
    margin-top:2%;
}
.detail_write{
    height: 50px;
}
.detail_top{
    margin-left: 12px;
}
.detail_btn{
    margin-left: 10px;
}
.detail_btn_div{
    text-align: center;
    margin-top: 3%;
}
.file{
     height: 450px;
}
#modify{
  width:5px;
  margin-bottom: 5px;
  right: -40px;
  margin-right: 1%;
  background-color: #424874;
  border:5px;
  color:white;
}
#delete{
  width:5px;
  margin-bottom: 5px;
  right: -40px;
  margin-right:1%;
  background-color:#9BA4B4;
  border:5px;
  color:white;
}
#list{
  width:5px;
  margin-bottom: 5px;
  right: -40px;
  margin-right: 0%;
  background-color: #9BA4B4;
  border:5px;
  color:white;
}
</style>
