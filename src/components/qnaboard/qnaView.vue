<template>

    <div class="container">

        <div class="container detail_">

        <h7>작성일 : 20/11/02(x)</h7>
        <h7 class="detail_top">작성자 : master17(x)</h7>
        <h7 class="detail_top">조회수 : 1(x)</h7>
            <div>
                <hr>
                <h5>제목 </h5>
                <hr>
                <div class="detail_write">
                                {{qnaBoardView}}
                                {{qnaBoardView.qnaSeq}}
                </div>
                <hr>
                
                <div class="detail_btn_div">
                <b-button class="detail_btn" variant="primary" id="detailbtn1" @click="$router.push({name: 'detailpage_modify'}).catch(()=>{});">수정</b-button>
                <b-button class="detail_btn" variant="primary" id="detailbtn1">삭제</b-button>
                <b-button class="detail_btn" variant="primary" id="detailbtn1" to="/qnaBoard">목록</b-button>
                </div>
            </div>

        </div>
      </div>



</template>

<script>
import {mapState} from 'vuex';
// import ModalView from '../common/ModalView.vue';

export default {

    data(){
        return{
            // showModal:false,
            qnaBoardNo:0,
        }
    },
    created(){
        const qnaBoardNo=this.$route.params.id;
        console.log(qnaBoardNo);
        this.$store.dispatch("FETCH_QNABOARD_VIEW",qnaBoardNo)
    },

    computed:{
        ...mapState({
            qnaBoardView:state=>state.qnaBoardView
        })
    },

    // components :{
    //     ModalView,
    
    // }
    
}
</script>

<style>
.detail_{
    margin-top:6%;
    margin-right: 2%;
}
.detail_write{
    height: 400px;
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
    margin-bottom: 5%;
}
#detailbtn1{
  background-color:  #424874;
  border: 1px  #424874 solid;
}
</style>