<template>
  <div class="container-fluid">
    <div class="row">
     <div class="submenuimage">
        <p class="subtitle">Meeting</p>
    </div>
     <div class="container">
   
  </div>
    <b-container class="main">
    <form @submit.prevent="enroller"  enctype="multipart/form-data"> 
    
      <b-row>
        <b-col
          cols="12"
          md="6"
        >
           <label for="title">모임명 </label> <b-form-input id="title" v-model="mtitle" placeholder="모임명"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card title="개설자정보" >
    <b-card-text>
      <label for="name">개설자 이름:</label> <b-form-input id="name" v-model="mwriter" placeholder="이름"></b-form-input>
      </b-card-text>
     
      <b-card-text>
     <label for="email">개설자 이메일:</label> <b-form-input id="email"   v-model="memail" type="email" placeholder="이메일"></b-form-input>
      </b-card-text>
    <b-card-text><label for="phone">개설자 전화번호:</label> <b-form-input  v-model="mphone" type="tel" id="phone" placeholder="번호"></b-form-input></b-card-text>
  </b-card>
        </b-col>
      </b-row>
       <b-card title="개설내용"> <b-row>
       
        <b-col class="d-flex center" cols="4" sm="4">
          <b-form-group
      label-cols-sm="4"
      label-cols-lg="4"
      label="신청 날짜"
      label-for="input-horizontal"
    >
             <b-form-datepicker id="example-datepicker"  v-model="sdate" class="mb-3"></b-form-datepicker>
          </b-form-group>
        </b-col  > 
       <b-col class="d-flex" cols="4" sm="4"><b-form-group
      label-cols-sm="4"
      label-cols-lg="4"
      label="신청 날짜"
      label-for="input-horizontal"
    >
             <b-form-datepicker id="example-datepicker2" v-model="fdate" class="mb-3"></b-form-datepicker>
          </b-form-group></b-col>
      </b-row>
       <b-row>
         <b-col> <b-form-group class="slabel" label="백엔드" label-for="back"><b-form-spinbutton id="back" v-model="back" min="1" max="100"/></b-form-group>  </b-col>
       <b-col> <b-form-group class="slabel" label="프론트" label-for="front"> <b-form-spinbutton id="front" v-model="front" min="1" max="100"/></b-form-group></b-col>
       <b-col> <b-form-group class="slabel" label="디자이너" label-for="design"> <b-form-spinbutton id="design" v-model="desgin" min="1" max="100"/></b-form-group></b-col>
       </b-row>
      <b-row>
     <b-col
          cols="12"
          md="12"
        >
          <b-form-textarea
      id="textarea-state"
      placeholder="간단한 모집정보"
      rows="3"
      v-model="simcontent"
    ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row>
      <b-col
          cols="12"
          md="12"
        >
         <v-file-input
    label="대표이미지"
    filled
    accept=".gif,.jpg,.png"
    ref="upfiles"
    prepend-icon="mdi-camera"
    v-on:change="handleFile"
  ></v-file-input>
      </b-col>
      </b-row></b-card>  
    <b-card title="상세모집요강"><b-form-textarea
        id="textarea-auto-height"
        placeholder="상세모집요강"
        rows="3"
        max-rows="8"
        v-model="mcontent"
      ></b-form-textarea></b-card>
      <b-row>
         <b-col><b-card> <v-combobox
  label="사용할 언어"
  multiple
  small-chips
   v-bind:items="lang"
   v-model="langs"
></v-combobox></b-card> </b-col>
       </b-row>
       <b-row><b-col>
    <b-button type="button" @click="address">주소검색</b-button>
  <modal-view v-if="showModal" @close="showModal = false" @raddress="printaddress">
            
   <h3 slot="header">주소검색하기 <i class="fas fa-times" @click="showModal=false" ></i></h3>
  
    <!-- <div slot="footer"></div> -->
  </modal-view>
  
         <!-- <VueDaumPostcode @complete="result = $event"/> -->
    
         </b-col></b-row>
       <!-- <b-row><b-col><vue-daum-map
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      @load="onLoad"
      
    
      style="width:500px;height:400px;"/> </b-col>
      </b-row> -->
    <b-row><b-col>  <b-input readonly v-model="result.address"></b-input></b-col></b-row>
    <div>{{result.address}}</div>
    <div>{{back}}</div>
    <div>{{front}}</div>
    <div>{{desgin}}</div>
    <div>{{mtitle}}</div>
    <div>{{mwriter}}</div>
    <div>{{mphone}}</div>
    <div>{{memail}}</div>
    <div>{{sdate}}</div>
    <div>{{fdate}}</div> 
      <div>{{simcontent}}</div> 
        <div>{{mcontent}}</div> 
         <div>{{langs}}</div> 
    
    <b-row><b-col>  <b-button  id="s-btn" @click="enroller">개설완료</b-button></b-col></b-row>
  </form>
  </b-container>
  </div>
  </div>
</template>

<script>
// import VueDaumMap from 'vue-daum-map'
import axios from 'axios'
import ModalView from '../common/ModalView.vue'
export default {
  // mounted() { 
  //       mapContainer = document.getElementById('map'), // 지도를 표시할 div
  //       mapOption = {
  //           center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
  //           level: 5 // 지도의 확대 레벨
  //       };

  //   //지도를 미리 생성
  //    map = new daum.maps.Map(mapContainer, mapOption);
  //   //주소-좌표 변환 객체를 생성
  //    geocoder = new daum.maps.services.Geocoder();
  //   //마커를 미리 생성
  //    marker = new daum.maps.Marker({
  //       position: new daum.maps.LatLng(37.537187, 127.005476),
  //       map,
  //   });  
  //   },
  components:{
    // VueDaumMap,
   // VueDaumPostcode,
    ModalView,
  } ,
  methods: {
    
        // 지도가 로드 완료되면 load 이벤트 발생
        onLoad (map) {
            this.map = map
        },
        address(){
          this.showModal=!this.showModal;
        },
        test(){
          console.log('tt');
        },
        printaddress(result){
          this.result=result;
          
         
        },
        enroller(){
           let formData=new FormData();
          formData.append('mtitle',this.mtitle);
          formData.append('mwriter',this.mwriter);
          formData.append('memail',this.memail);
          formData.append('mphone',this.mphone);
          formData.append('sdate',this.sdate);
          formData.append('fdate',this.fdate);
          formData.append('back',this.back);
          formData.append('front',this.front);
          formData.append('desgin',this.desgin);
          formData.append('simcontent',this.simcontent);
          formData.append('upfile',this.files);
          formData.append('mcontent',this.mcontent);
          formData.append('langs',this.langs);
          formData.append('address',this.result.address);
          for(let key of formData.entries()){
          console.log(`${key}`);
            }
           axios.post("http://localhost:8082/itjobgo/meeting/enrollmeeting.do",formData
    ,{ headers:{
       'Content-Type':'multipart/form-data'
     }})
     .then((data)=>console.log(data))
    .catch((error)=>console.log(error))
        },
        handleFile(){
          console.log(this.$refs.upfiles.$refs.input.files[0]);
        this.files=this.$refs.upfiles.$refs.input.files[0];
        console.log(this.files);
        }

        //  sample5_execDaumPostcode(){
        //         new daum.Postcode({
        //     oncomplete(data) {
        //         var addr = data.address; // 최종 주소 변수

        //         // 주소 정보를 해당 필드에 넣는다.
        //         document.getElementById("sample5_address").value = addr;
        //         // 주소로 상세 정보를 검색
        //         geocoder.addressSearch(data.address, function(results, status) {
        //             // 정상적으로 검색이 완료됐으면
        //             if (status === daum.maps.services.Status.OK) {

        //                 var result = results[0]; //첫번째 결과의 값을 활용

        //                 // 해당 주소에 대한 좌표를 받아서
        //                 var coords = new daum.maps.LatLng(result.y, result.x);
        //                 // 지도를 보여준다.
        //                 mapContainer.style.display = "block";
        //                 map.relayout();
        //                 // 지도 중심을 변경한다.
        //                 map.setCenter(coords);
        //                 console.log(coords);
        //                 // 마커를 결과값으로 받은 위치로 옮긴다.
        //                 marker.setPosition(coords)
        //             }
        //         });
        //     }
        // }).open();
    // }
    },
  
 data: () => ({
    // appKey: 'b87477b7ea45a3fb35e3fe159f0d8976', // 테스트용 appkey
    // center: {lat:33.4555555, lng:126.570667}, // 지도의 중심 좌표
    // level: 3, // 지도의 레벨(확대, 축소 정도),
    // mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
    // libraries: [], // 추가로 불러올 라이브러리
    // map: null, // 지도 객체. 지도가 로드되면 할당됨.,
    valid: false,
      result:'',
      text: '',
      tname: '',
      pname: '',
      simcontent:'',
      mtitle:'',
      mwriter:'',
      sdate:'',
      fdate:'',
      memail:'',
      mphone:'',
      files:'',
      mcontent:'',
       langs:[],
      back:1,
           front:1,
                desgin:1,
      showModal:false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
       tnameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 20 characters',
      ],
       items: ["1","2","3","4","5","6"],
        lang:[
          'JAVA',
          'JAVASCRIPT',
          'VUE',
          'C++',
          'C',

        ],
       
       
       
    }),
    } 

</script>

<style>
.slabel{
  text-align: center;
}
.container{
  max-height: auto;
}
#s-btn{
  background-color: #424874;
}
.main{
  border:1px solid black
}
</style>