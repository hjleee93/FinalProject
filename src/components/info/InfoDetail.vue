<template>

  <div class="container">
    <div class="container-fluid">
        <h2 class="st_title">채용설명회 일정</h2><hr>
      <div class="row">

        <div class="container detail_">
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
                  <v-btn to="/infoForm" exact id="modify"  @click="updateInfo">수정</v-btn>
                  <v-btn to="/" exact id="delete" @click="deleteinfo">삭제</v-btn>
                  <v-btn to="/infoList" exact id="list">목록</v-btn>
                </div>
            </div>

          <!-- 삭제확인 modal-->
            <ModalView v-if="showModal" @close="showModal = false">
            <template>
              <div slot="header">
                삭제하시겠습니까?
              </div>

              <div slot="body">
                <b-button @click="Delete">삭제</b-button>
                <b-button @click="cancel">취소</b-button>
              </div>

              <div slot="footer"></div>
            </template>
          </ModalView>

          
          <div class="overflow-auto">
            <div id="content-div">
              
              게시판 내용(임시) : {{infoDetail.InfoContent}}

            <br>
            (임시)게시판 객체 : {{infoDetail}}

            <br><br>
            게시판 객체(임시) : {{infoDetail}}

   <!-- 
            </div>
              <div id="date">작성날짜(날짜변환해야함) : {{communityboardView.boardDate}}</div>
            <b-button type="button" id="list-btn" to="/communityBoardList" exact>목록으로</b-button>
        </div>
 -->
            </div>
        </div> 
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ModalView from '../common/ModalView.vue';

export default {

  data(){
      return{
        showModal:false,
        infoNo:0,
      }
    },
   created(){
      const infoNo=this.$route.params.id;
      console.log(infoNo);
      this.$store.dispatch("FETCH_INFO_DETAIL",infoNo)
    },

    computed:{
      ...mapState({
        infoDetail:state=>state.infoDetail       
      })
    },

  methods: {
     /* 목록버튼 */
    link: function (){
                   this.$router.push('/infoList')
      },
      //삭제버튼
    link1: function (){
                   this.$router.push('/infoForm')
       },
       
      updateInfo(){
        let no=this.$route.params.id
        console.log("수정버튼(params) :"+ no);
        this.$router.push({name:'InfoUpdate',params:{id:no}})
      },
     //삭제버튼
      deleteInfo(){
        this.showModal=!this.showModal;  
      }, 
      //삭제버튼(네)
      Delete(){
        let no=this.$route.params.id
        console.log(no);
        this.$store.dispatch("FETCH_INFO_DELETE",no);
      //삭제후 페이지 이동
        this.$router.push({name:'infoList'});
      },
      //삭제버튼(아니오)
      cancel(){
        this.showModal=!this.showModal;
      }
    },//methods 끝

    components :{
      ModalView,

    }
  }//export


</script>

<style scoped>
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
