<template>
  <b-container class="cont">
    <b-row  class="justify-content-md-center"><h1>제목</h1></b-row>
    <b-row>
      <b-col>
       <v-img src="https://picsum.photos/id/11/500/300"   min-height="200" max-height="300"  max-width="500" min-width="400" aspect-ratio="1.7"></v-img>
     </b-col>
      <b-col >
        <b-card> 
           <b-row>
          <div class="f-box">일시:</div>
        </b-row>
          <b-row><div  class="f-box"> 장소:</div></b-row>
           <b-row><div  class="f-box"> 정원:</div></b-row>
           <b-row><div  class="f-box"> 장소:</div></b-row></b-card>
           </b-col>
           </b-row>
      <b-card> <b-col><div  class="f-box">개설자정보:</div></b-col></b-card>
     
       <b-card title="모집정보">
         <b-form-textarea>모집상세내용
         </b-form-textarea>
       </b-card>
    <b-row >
        <b-col align-self="center"><b-button id="m-btn">신청하기</b-button></b-col>
    </b-row>
    </b-container>  
</template>

<script>
export default {

}
</script>

<style>
#m-btn{
  background-color: #424874;
}
.rowbox1{
  font-size: 1.5em;
}
.f-box{
  margin-bottom: 20px;
}
.cont{
  border: 1px solid black;
  margin-top:1.5rem;
}
.layout2{
  margin-top:1.5rem;
  border:1px solid black;
}


</style>