<template>

    <div class="container">

        <div class="container detail_">

        <h6 class="detail_top_right">조회수 : (((작업중)))) / 작성일 : {{qnaBoardView.qnaDate}}</h6>
            <div>
                <hr>
                <h4 class="content_font">{{qnaBoardView.qnaTitle}}</h4>
                <hr>
                <div class="detail_write">
                    <h6 class="detail_top_right">작성자 : {{qnaBoardView.qnaWriter}}</h6>
                    <h5 class="content_font">{{qnaBoardView.qnaContent}} </h5>

                                <br><br><b>((((출력용 테스트)))){{qnaBoardView}}
                                (테스트){{qnaBoardView.qnaSeq}}</b>

                </div>

                <hr>
                <div>
                <b-row v-if="qbattachment">
                    <b-col cols="2"><b-form-group  label="첨부파일" readonly/></b-col>
                    <b-col cols="2"><b-button @click="qbattachmentdown(qbattachment)">{{qbattachment.originalfilename}}</b-button></b-col>
                </b-row>
                </div>
                <hr>

                <div class="detail_btn_div">
                <b-button class="detail_btn" variant="primary" id="detailbtn1" @click="updateqna">수정</b-button>
                <b-button class="detail_btn" variant="primary" id="detailbtn1" @click="deleteqna">삭제</b-button>
                <b-button class="detail_btn" variant="primary" id="detailbtn1" to="/qnaBoard">목록</b-button>
                </div>


            </div>

    <!-- 삭제 모달 -->
    <modal-view v-if="showModal" @close="showModal=false">
    <template>
        <div slot="header">
            정말 삭제하시겠습니까?
        </div>

        <div slot="body">
            <b-button @click="yesDeleteqna">
                삭제하기
            </b-button>
            <b-button @click="noDeleteqna">
                취소하기
            </b-button>
        </div>
        <div slot="footer"></div>
    </template>
    </modal-view>


        </div>
      </div>



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
    qbattachmentdown(qbattachment){
        location.href="http://localhost:8082/itjobgo/qna/qnafiledownload?oriName="+qbattachment.originalfilename+"&reName="+qbattachment.renamedfilename;
    },

    created(){
        const qnaBoardNo=this.$route.params.id;
        console.log(qnaBoardNo);
        this.$store.dispatch("FETCH_QNABOARD_VIEW",qnaBoardNo)
    },

    computed:{
        ...mapState({
            qnaBoardView:state=>state.qnaBoardView,
            qbattachment:state=>state.qbattachment2
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
</style>