<template>
<!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
 <div class="insert_resume">
    <div class="submenuimage">
        <p class="subtitle">Insert Resume</p>
    </div>
    <div>
        <v-tabs centered color="grey darken-3">
            <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
            <v-tab active to="/resume/resume">입사지원서 보기</v-tab>
            <v-tab to="/resume/updateresume">입사지원서 수정</v-tab>
            <v-tab to="/resume/consultresume">입사지원서 컨설팅</v-tab>
            <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
            <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
        </v-tabs>
    </div>

    <div id="submenu">
        <b-nav pills>
            <b-nav-item active to="/resume/resume">기본 이력서</b-nav-item>
            <b-nav-item to="/resume/BlindResume">블라인드 이력서</b-nav-item>
            <b-nav-item to="/resume/LineResume">라인 이력서</b-nav-item>
            <b-nav-item to="/resume/DesignResume">디자인 이력서</b-nav-item>
        </b-nav>
    </div>


<div>
    {{resume}}
</div>

<div>
    {{this.$store.state.resume}}
</div>


</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
//import { mapState } from 'vuex';
const { mapState: memberState } = createNamespacedHelpers("memberStore");

export default {

    created() {
        const memberSq=this.userData.memberSq;
        this.$store.dispatch("FETCH_RESUME", memberSq);
    },

    // async mounted() {
    //     this.$store.dispatch("FETCH_RESUME", {
    //     memberSq: this.userData.memberSq,
    //     });
 
    // },
    computed: {
        ...memberState(["userData"]),
    //     ...mapState({
    //     resume:state=>state.resume
    //   }),
    resume() {
      let objArr = new Object(); //반환할 객체

        for (let i = 0; i < this.$store.state.resume.length; i++) {
            if (
            this.$store.state.resume[i].memberNo ==
            this.userData.memberSq
            ) {
            objArr[i] = this.$store.state.resume[i];
            }
        }
        let tem = [];
        for (let i = 0; i < 3; i++) {
            tem[i] = Object.values(objArr)[i];
        }

        return tem;
        },
    },
    data: () => ({
    //   resume:this.$store.state.resume,
    }),
}

</script>
<style scoped>
.resume{
    display : flex;
    flex-direction: column;
    justify-content: center;
}
#submenu{
    margin-top:20px;
    margin-bottom: 20px;
    display : flex;
    justify-content: center;
}
#insertresume{
    display: flex;
    align-content: center;
}

#resumetable{
    table-layout: fixed;
}
.print{
    margin-left: 80%;
}
 tr, td {
    width: 50px;
    border: 2px solid grey;
    margin : 0 auto;
    border-collapse: collapse;
    text-align: center;
 }
.personalTitle{
    width: 50px;
 }
.imagefile{
    width: 50px;
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

.saveresume{
   margin-left: 80%;
}

.savebtn{
    margin-right: 10px;
}
div .resumetitle{
 width: 250px;
 background-color:#394867;
 font-size:20px; 
 margin-top:30px;
 margin-bottom: 15px;
 margin-left: 20px;
 text-align: center;
 color: #F1F6F9;
 border-radius: 30px;
}
button{
    margin-top:20px;
    margin-bottom: 20px;
}
#submit{
    margin-left: 45%;
    background-color: #424874;
    border-color: #424874;
}
#reset{
    margin-left: 10px;
    background-color: #9BA4B4;
    border-color: #9BA4B4;
}
</style>