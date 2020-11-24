<template>

<b-container fluid>
      <b-row >
         <div class="submenuimage ">
        <p class="subtitle" id="subtitle">qna subtitle</p>
        </div>
      </b-row>
      <b-row id="writecontain" align-h="end"><b-button to="/qnaBoard">목록으로 </b-button></b-row>
      <b-row>
        <b-col><b-card class="text-center"><b-form>
        <b-row>
          <b-col cols="2"><b-form-group  label="제목"/></b-col>
          <b-col> <b-form-input v-model="qnaBoardView.qnaTitle" readonly/></b-col>
        </b-row>
          <b-row>
          <b-col cols="2"><b-form-group  label="작성자"/></b-col>
          <b-col> <b-form-input v-model="qnaBoardView.qnaWriter" readonly/></b-col>
        </b-row>
          <b-row>
          <b-col cols="2"><b-form-group  label="작성내용" readonly/></b-col>
          <b-col> <b-form-textarea v-model="qnaBoardView.qnaContent" readonly/></b-col>
        </b-row>
        <b-row v-if="attachmentq">
          <b-col cols="2"><b-form-group  label="첨부파일" readonly/></b-col>
          <b-col cols="2"><b-button @click="qbattachmentdown(attachmentq)">{{attachmentq.originalfilename}}</b-button></b-col>
        </b-row>
          </b-form>

          </b-card>
          </b-col>

          <!-- <b-row v-if="userData.memberSq===communityboardView.memberNum"><b-col>
          <b-button @click="updateqna">수정</b-button>
          <b-button @click="deleteqna">삭제</b-button>
          
  </b-col></b-row></b-card></b-col> -->
      </b-row>
      

      <!-- <b-form v-if="userData.memberSq!=null"><b-row ><b-col><b-card class="text-center"><b-row><b-col cols="2"><b-form-group label="답글"/></b-col>
      <b-col><b-form-textarea v-model="pcomment" /></b-col>
      <b-col cols="1"><b-button @click="comment">전송</b-button></b-col>
      </b-row></b-card></b-col></b-row></b-form> -->

      <!-- <b-container>
      <b-row ><b-col><b-card class="text-center"><b-row><b-col cols="2"><b-form-group label="답글"/></b-col>
      <b-col><b-form-textarea readonly /></b-col>
      <b-col cols="1"><b-button>삭제</b-button></b-col>
      <b-col cols="1"><b-button>수정</b-button></b-col>
      </b-row></b-card></b-col>
      </b-row> -->


    <!-- 삭제 모달 -->
    <ModalView v-if="showModal" @close="showModal=false">
    <template>
        <div slot="header">
            정말 삭제하시겠습니까?
        </div>
        <div slot="body" class="modalf">
            <b-button @click="yesDeleteqna">
                삭제하기
            </b-button>
            <b-button @click="noDeleteqna">
                취소하기
            </b-button>
        </div>
        <div slot="footer"></div>
    </template>
    </ModalView>

</b-container>



</template>

<script>

import vueMoment from 'vue-moment';
import Vue from 'vue'
import { mapState } from 'vuex';
import ModalView from '../common/ModalView.vue';

Vue.use(vueMoment);

export default {

    data(){
        return{
            showModal:false,
            qnaBoardNo:0,
        }
    },

    //첨부파일 다운로드
    qbattachmentdown(attachmentq){
        location.href="http://localhost:8082/itjobgo/qna/qnafiledownload?oriName="+attachmentq.originalfilename+"&reName="+attachmentq.renamedfilename;
    },

    created(){
        const qnaBoardNo=this.$route.params.id;
        console.log(qnaBoardNo);
        this.$store.dispatch("FETCH_QNABOARD_VIEW",qnaBoardNo)
    },

    computed:{
        ...mapState({
            qnaBoardView:state=>state.qnaBoardView,
            qbAttachment2:state=>state.qbAttachment2
        })
    },

    methods:{

        //삭제버튼~~
        deleteqna(){
            this.showModal=!this.showModal;
        },
            //삭제버튼(네)
        yesDeleteqna(){
            let no=this.$route.params.id   
            console.log(no);
            this.$store.dispatch("FETCH_QNABOARD_DELETE",no);
            //삭제 후 페이지 이동
            this.$router.push({name:'qnaBoard'});
        },
        noDeleteqna(){
            //삭제버튼(아니오)
            this.showModal=!this.showModal;
        },

        //수정버튼~~
        updateqna(){
            //alert("수정버튼")
            //수정도 router.js에 등록됨. name값을 이용해서 페이지 전환
            let no=this.$route.params.id
        console.log("수정버튼(params) :"+ no);
        // console.log("글번호 :  : " + communityBoardNo)
        this.$router.push({name:'qnaModify',params:{id:no}})
        }
    },

    components :{
        ModalView,
    }

}

</script>

<style>
.content_font{
    margin-left: 1%;
}
.detail_{
    margin-top:6%;
    margin-right: 2%;
}
.detail_write{
    height: 400px;
}
.detail_top_right{
    text-align: right;
}
.detail_btn{
    margin-left: 10px;
}
.detail_btn_div{
    text-align: center;
    margin-top: 3%;
    margin-bottom: 5%;
}
#detailbtn1{
  background-color:  #424874;
  border: 1px  #424874 solid;
}
.modalf{
  display: flex;
  justify-content: space-around;
}
</style>