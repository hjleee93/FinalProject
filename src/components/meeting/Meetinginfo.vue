<template>
 <div class="container-fluid">
     <div class="submenuimage">
        <p class="subtitle">모임상세내용</p>
      </div>

  <b-container class="cont">
    
    <b-row  class="justify-content-md-center"><h1>{{minfo.collabTitle}}</h1></b-row>
    <b-row>
      <b-col>
       <v-img :src="`http://localhost:8082/itjobgo/meeting/imagesrequest${minfo.collabSq}`"   min-height="200" max-height="300"  max-width="500" min-width="400" aspect-ratio="1.7"></v-img>
     </b-col>
      <b-col >
        <b-card> 
           <b-row>
          <div class="f-box">일시:{{new Date(minfo.rdate).toLocaleDateString()}}</div>
        </b-row>
           <b-row><div  class="f-box"> 정원:{{minfo.collabBack+minfo.collabFront+minfo.collabDesgin}}명</div></b-row>
           <b-row><div  class="f-box"> 장소:{{minfo.address}}</div></b-row>
           <b-row><div  class="f-box"> 개발언어:{{minfo.collabLang}}</div></b-row>
           </b-card>
           
           </b-col>
           </b-row>
           <b-row><b-col>찾아오시는 길</b-col></b-row>
          <b-row><b-col><div id="map"></div></b-col></b-row>
      <b-card> <b-row><b-col>개설자정보</b-col></b-row>
      <b-row><b-col>개설자성명:{{minfo.collabWriter}}</b-col></b-row>
      <b-row><b-col>개설자번호:{{minfo.collabPhone}}</b-col></b-row>
      <b-row><b-col>개설자이메일:{{minfo.collabEmail}}</b-col></b-row>
   
      </b-card>
     
       <b-card title="모집정보">
         <b-card>{{minfo.collabContent}}</b-card>
       </b-card>
    <b-row v-if="minfo.collabEmail!=userData.memberEmail">
        <b-col align-self="center"><b-button  id="m-btn" @click="apbtn">신청하기</b-button><b-button @click="debtn">취소하기</b-button></b-col>
    </b-row>
    
    <ModalView v-if="showModal" @close="showModal = false">
    <template>
      <div slot="header">
       <h3>신청하기</h3>
      </div>
      <div slot="body" class="modalf"> 
        <b-card>
          <b-row>신청자:{{userData.memberName}}</b-row>
          <b-row>
            <b-form>
            <b-form-radio v-model="selected"  name="postion" value="back">백엔드</b-form-radio>
            <b-form-radio v-model="selected"  name="postion" value="front">프론트</b-form-radio>
            <b-form-radio v-model="selected"  name="postion" value="desgin">디자인</b-form-radio>
       
            </b-form>
          </b-row>
        </b-card>
      </div>
      <div slot="footer">
        <b-button @click="applybtn(selected)">
          YES
        </b-button>
      <b-button @click="ndele">NO</b-button>
      </div>
    </template>
  </ModalView>
    </b-container>  
    </div>
    
</template>
 <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=5b349346bb95bb8e5b3f00ce10d2072e&libraries=services"></script>
<script>

import axios from "axios"
const { mapState:loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";
import { mapState } from 'vuex'
import ModalView from '../common/ModalView.vue';
export default {
  components: { ModalView },
  data(){
    return{
    showModal:false,
    selected:'',
    applycheck:false,
    }
  },
    mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
  },
 
  methods: {
    initMap(){
       setTimeout(() => {
      let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
let map = new kakao.maps.Map(mapContainer, mapOption); 

// 주소-좌표 변환 객체를 생성합니다
let geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
geocoder.addressSearch(this.minfo.address, function(result, status) {

    // 정상적으로 검색이 완료됐으면 
     if (status === kakao.maps.services.Status.OK) {

        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        let marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        let infowindow = new kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">모임장소</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
    } 
}); 
       }, 500);  

    },
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=5b349346bb95bb8e5b3f00ce10d2072e&libraries=services";
      document.head.appendChild(script);
      },
    apbtn(){
       if(this.userData.length==0){
          alert("로그인후 이용해주세요")
          return 
        }
      this.showModal=!this.showModal;
    },
    ndele(){
        this.showModal=!this.showModal;
      },
      debtn(){
        let delform=new FormData
        delform.append("memberSq",this.userData.memberSq)
        delform.append("collabSq",this.minfo.collabSq)
        axios.post("http://localhost:8082/itjobgo/meeting/delapplymeeting.do",delform)
        .then((data)=>{
          console.log(data)
          if(data.data>0){
            alert("삭제 성공")
          }else {
            alert("삭제 오류")
          }
        })
      },
      applybtn(value){
       
        let applyform=new FormData
        applyform.append("memberSq",this.userData.memberSq)
        applyform.append("postion",value)
        applyform.append("collabSq",this.minfo.collabSq)
        applyform.append("writerNo",this.minfo.memberSq)
       axios.post("http://localhost:8082/itjobgo/meeting/applymeeting.do",applyform)
       .then((data)=>{
         console.log(data)
         if(data.data==0){
                alert("중복된 신청입니다.")
                this.showModal=!this.showModal;
             
         }else {
            alert("신청완료")
            this.applycheck=true;
           this.showModal=!this.showModal;
           }
       
       })
          
        .catch((error)=>
        console.log(error))
      }
  },
  created() {
    const no=this.$route.params.id
    this.$store.dispatch("FECH_MOBOARDINFO",no)
  },
  computed: {
    ...mapState({
      minfo:state=>state.minfo
    }),
     ...loadUserState(['userData'])  
  },

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
#map {
  width: 100%;
  height: 400px;
}


</style>