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
           <label for="title">모임명 </label> <b-form-input id="title" required v-model.lazy="mtitle" placeholder="모임명"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card title="개설자정보" >
    <b-card-text>
      <label for="name">개설자 이름:</label> <b-form-input id="name" readonly v-model="userData.memberName" placeholder="이름"></b-form-input>
      </b-card-text>
     
      <b-card-text>
     <label for="email">개설자 이메일:</label> <b-form-input id="email" readonly  v-model="userData.memberEmail" type="email" placeholder="이메일"></b-form-input>
      </b-card-text>
    <b-card-text><label for="phone">개설자 전화번호:</label> <b-form-input readonly v-model="userData.memberPhone" type="tel" id="phone" placeholder="번호"></b-form-input></b-card-text>
  </b-card>
        </b-col>
      </b-row>
       <b-card title="개설내용"> <b-row>
       
        <b-col class="d-flex center" cols="4" sm="4">
          <b-form-group
      label-cols-sm="4"
      label-cols-lg="4"
      label="신청 날짜"
      label-for="example-datepicker"
    >
             <b-form-datepicker id="example-datepicker" required  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" :min="min" v-model.lazy="sdate"  class="mb-3"></b-form-datepicker>
          </b-form-group>
        </b-col  > 
       <b-col class="d-flex" cols="4" sm="4"><b-form-group
      label-cols-sm="4"
      label-cols-lg="4"
      label="마감 날짜"
      label-for="example-datepicker2"
    >
             <b-form-datepicker id="example-datepicker2" required :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" :min="fday" :disabled="disabled" v-model.lazy="fdate" class="mb-3"></b-form-datepicker>
          </b-form-group></b-col>
          <b-col class="d-flex center" cols="4" sm="4">
          <b-form-group
      label-cols-sm="4"
      label-cols-lg="4"
      label="시작 날짜"
      label-for="example-datepicker3"
    >
             <b-form-datepicker id="example-datepicker3" required  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" :min="startday" :disabled="disabled" v-model.lazy="rdate" class="mb-3"></b-form-datepicker>
          </b-form-group>
        </b-col  > 
      </b-row>
       <b-row>
         <b-col> <b-form-group class="slabel" label="백엔드" label-for="back"><b-form-spinbutton id="back" v-model.lazy="back" min="1" max="100"/></b-form-group>  </b-col>
       <b-col> <b-form-group class="slabel" label="프론트" label-for="front"> <b-form-spinbutton id="front" v-model.lazy="front" min="1" max="100"/></b-form-group></b-col>
       <b-col> <b-form-group class="slabel" label="디자이너" label-for="design"> <b-form-spinbutton id="design" v-model.lazy="desgin" min="1" max="100"/></b-form-group></b-col>
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
       required
      v-model.lazy="simcontent"
    ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row>
      <b-col
          cols="12"
          md="12"
        >
         <v-file-input
    :label="vfile"
    filled
    required
    
   
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
         required
        max-rows="8"
        v-model.lazy="mcontent"
      ></b-form-textarea></b-card>
      <b-row>
         <b-col><b-card> <v-combobox
  label="사용할 언어"
  multiple
  small-chips
  
   v-model.lazy="langs"
></v-combobox></b-card> </b-col>
       </b-row>
       <b-row><b-col>
    <b-button type="button" @click="address">주소검색</b-button>
  <modal-view v-if="showModal" @close="showModal = false" @raddress="printaddress">      
   <h3 slot="header">주소검색하기 <i class="fas fa-times" @click="showModal=false" ></i></h3>
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
    <b-row><b-col>  <b-input required readonly  :placeholder="raddress" v-model="result.address"></b-input></b-col></b-row>
    <b-row><b-col>  <b-button  id="s-btn" type="submit">개설완료</b-button></b-col></b-row>
  </form>
  </b-container>
  </div>
  {{mtitle+
sdate+
fdate+
rdate+
simcontent+
mcontent+
back+
front+
desgin+
langs+
vfile+
raddress}}
  </div>
</template>

<script>
// import VueDaumMap from 'vue-daum-map'
import axios from 'axios'
import ModalView from '../common/ModalView.vue'
import { createNamespacedHelpers ,mapState} from "vuex";
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
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
  created() {
      const uno=this.$route.params.id
       this.$store.dispatch("FECH_UPDATED",uno)
       .then(({data})=>{
         this.mtitle=data[0].collabTitle
         this.sdate= this.getToday(data[0].collabUploaddate)
         this.fdate=this.getToday(data[0].collabDeadline)
         this.rdate=this.getToday(data[0].rdate)
         this.simcontent=data[0].collabSimcontent
         this.mcontent=data[0].collabContent
         this.back=data[0].collabBack
         this.front=data[0].collabFront
         this.desgin=data[0].collabDesgin
         this.langs=data[0].collabLang
         this.vfile=data[1].originalFilename
         this.raddress=data[0].address
       })

 console.log("created")

       
      
  },
  computed: {
      ...mapState(  {uminfo:state=>state.uminfo}),
      ...loadUserState(['userData'])  ,
      startday(){
       let startday=new Date(this.fdate)
        startday.setDate(startday.getDate()+1)
        return startday;
      },
       fday(){
       let deadline=new Date(this.sdate)
        deadline.setDate(deadline.getDate()+1)
        return deadline;
      },
        disabled() {
          if(this.sdate===""){
             return this.state
          }else{
            return !this.state;
          }
       
      },
      
     
    
    
      
  },
  methods: {
    getToday(data){
    let date = new Date(data);
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
},
    
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
          if(this.result.address==undefined){
            alert("값이 비여있습니다.")
            return 
          }
          let formData=new FormData();
          formData.append('mtitle',this.mtitle);
          formData.append('mwriter',this.userData.memberName);
          formData.append('memail',this.userData.memberEmail);
          formData.append('mphone',this.userData.memberPhone);
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
          formData.append('rdate',this.rdate);
          formData.append('memberSq',this.userData.memberSq)
          for(let key of formData.entries()){
          console.log(`${key}`);
            }
           axios.post("http://localhost:8082/itjobgo/meeting/enrollmeeting.do",formData
    ,{ headers:{
       'Content-Type':'multipart/form-data'
     }})
     .then(()=>this.$router.push({name:'meeting'}))
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
    
  
 data(){
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    console.log("data")
   return{
     mdata:{
      tname:''
     },
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
      rdate:'',
      memail:'',
      mphone:'',
      files:'',
      mcontent:'',
      vfile:'',
      langs:[],
      min:minDate,
      state:"disabled",
      raddress:'',
    
      
       
       
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
      // items: ["1","2","3","4","5","6"],
        lang:[
          'JAVA',
          'JAVASCRIPT',
          'VUE',
          'C++',
          'C',

        ],
    }
   }
 }
    // appKey: 'b87477b7ea45a3fb35e3fe159f0d8976', // 테스트용 appkey
    // center: {lat:33.4555555, lng:126.570667}, // 지도의 중심 좌표
    // level: 3, // 지도의 레벨(확대, 축소 정도),
    // mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
    // libraries: [], // 추가로 불러올 라이브러리
    // map: null, // 지도 객체. 지도가 로드되면 할당됨.,
     
       
       
       
   

</script>

<style scoped>
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
#subtitle{
font-family: 'Barlow Semi Condensed', sans-serif;
}
.submenuimage{
  width: 100%;
  height:180px;
  background-color:#F4EEFF;
  text-align: center;
  line-height: 180px; 
}
.subtitle{
  font-family: 'Masque';
  color:#4e5157 ;
  font-size: 50px;
}
</style>