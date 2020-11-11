<template>
  <div>
    <div class="header_image">
      <div>
        <a href="/"><img class="main-img" src="../../assets/images/main.png" alt="Vue logo"/></a>
      </div>
    </div>

        <b-navbar id="menu" toggleable="sm" type="dark" variant="">
          <b-navbar-brand href="/">IT-JOB-GO</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
               <b-nav-item-dropdown class="nav-link" text="JOB">
                <b-dropdown-item to="/job">구인 정보</b-dropdown-item>
                <b-dropdown-item to="/info">취업 정보</b-dropdown-item>
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
                <b-dropdown-item to="/portfolioenroller">게시글작성</b-dropdown-item>
             </b-nav-item-dropdown>
              
              <b-nav-item-dropdown class="nav-link" text="STUDY">
                <b-dropdown-item to="/board">Q&A</b-dropdown-item>
                <b-dropdown-item to="/reference">레퍼런스 사이트</b-dropdown-item>
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
              <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form>

              <b-nav-item><router-link class="nav-link" to="/login">LOGIN</router-link></b-nav-item>
              <b-nav-item><router-link class="nav-link" to="/register">JOIN</router-link></b-nav-item>

              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <em>User</em>
                </template>
                <b-dropdown-item href="/myPage">MY PAGE</b-dropdown-item>
                <b-dropdown-item href="#">LOGOUT</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>


      
</template>

<script>
export default {

}
</script>

<style>
 .header_image{
    background-color: #394867; 
    text-align: center;
    width: 100%;
 }

#menu{
    background-color: #394867;
 }
.submenuimage{
  width: 100%;
}
</style>