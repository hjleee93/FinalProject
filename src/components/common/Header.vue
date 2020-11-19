<template>
  <div>
    <div class="header_image">
      <div>
        <a href="/"><img class="main-img" src="../../assets/images/main.png" alt="Vue logo"/></a>
      </div>
    </div>

        <b-navbar id="menu" toggleable="md" type="dark" variant="">
          <b-navbar-brand href="/">IT-JOB-GO</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
               <b-nav-item-dropdown class="nav-link" text="JOB">
                <b-dropdown-item to="/jobList">구인 정보</b-dropdown-item>
                <b-dropdown-item to="/infoList">취업 정보</b-dropdown-item>
               </b-nav-item-dropdown>
              <b-nav-item-dropdown class="nav-link" text="RESUME">
                <b-dropdown-item to="/resume/insertresume">입사지원서 등록</b-dropdown-item>
                <b-dropdown-item to="/resume/resume">입사지원서 보기</b-dropdown-item>
                <b-dropdown-item to="/resume/updateresume">입사지원서 수정 </b-dropdown-item>
                <b-dropdown-item to="/resume/consultresume">입사지원서 컨설팅</b-dropdown-item>
                <b-dropdown-item to="/resume/consult">컨설팅전문가 등록</b-dropdown-item>
              </b-nav-item-dropdown>
             <b-nav-item-dropdown class="nav-link" text="PORTFOLIO" >
                <b-dropdown-item to="/meetingList/meeting" >모임목록</b-dropdown-item>
                <b-dropdown-item to="/enrollmeeting">모임개설</b-dropdown-item>
                <b-dropdown-item to="/portfolioList">포폴게시판</b-dropdown-item>
              
             </b-nav-item-dropdown>
              
              <b-nav-item-dropdown class="nav-link" text="STUDY">
                <b-dropdown-item to="/qnaBoard">Q&A</b-dropdown-item>
                <b-dropdown-item to="/refSite">레퍼런스 사이트</b-dropdown-item>
              </b-nav-item-dropdown>

              <!-- Commnunity -->
              <b-nav-item-dropdown class="nav-link" text="COMMUNITY">
                <b-dropdown-item to="/noticeList">공지사항</b-dropdown-item>
                <b-dropdown-item to="/itNewsList">IT소식</b-dropdown-item>
                <b-dropdown-item to="/communityBoardList">자유게시판 </b-dropdown-item>
              </b-nav-item-dropdown>

           
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              
              
              <div v-if="loginStatus" class="user">
                <!-- Using 'button-content' slot -->
<!--                 
                <template #button-content>
                  <em>User</em>
                </template> -->
                <b-nav-item href="/myPage">MY PAGE</b-nav-item>
                </div>
                <div v-if="loginStatus" class="user">
                <b-nav-item @click="logout()">LOGOUT</b-nav-item>
                </div>

              <b-nav-item v-else><router-link class="nav-link" to="/login">LOGIN</router-link></b-nav-item>
              
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        
      </div>


      
</template>

<script>
import{ mapState, mapActions} from "vuex"
export default {

  computed:{
    
    ...mapState(["loginStatus","userData"]),
  
  },
  methods: {
    
      ...mapActions(["logout"])
    }

}
</script>

<style>

 .header_image{
    background-color: #394867; 
    text-align: center;
    width: 100%;
 }
.user{
  display: inline-block;
}
#menu{
    background-color: #394867;
 }
.submenuimage{
  width: 100%;
}
.navbar-dark .navbar-nav .nav-link, .navbar-dark .navbar-brand {
  color: white !important;
  font-weight: 500;
}
</style>