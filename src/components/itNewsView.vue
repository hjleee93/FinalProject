<template>

  <body>
    <div class="container-fluid">

        <!-- <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"> -->
        <!-- 메인 이미지 -->
        <div class="submenuimage">
        <p class="subtitle"  id="subtitle">Community</p>
        </div>

        <!-- 탭 -->
        <div class="container">
        <b-nav tabs fill class="tabs" align="center">
        <b-nav-item to="/noticeList">공지사항</b-nav-item>
        <b-nav-item to="/itNewsList" active>IT소식</b-nav-item>
        <b-nav-item to="/communityBoardList">자유게시판</b-nav-item>
        </b-nav>
        </div>

        <div class="container">
        
          <h2 class="sub-header">글제목</h2>
          <br>

          <div align="right">
              <b-button variant="primary" id="st_write2"
              to="/itNewsUpdate" exact>수정하기</b-button>
          </div>  

          <div class="overflow-auto">
 
            <!-- 내용 -->

            <div id="content-div">
            안녕하세요. 카카오입니다.<br>

            항상 카카오 서비스를 이용해 주시는 고객님께 깊은 감사를 드립니다.  <br>

            더욱 안정적인 서비스를 제공해 드리기 위해 카카오계정 시스템 점검이 진행될 예정입니다. <br>

            점검 시간 동안 카카오 일부 서비스가 중단되오니 양해 부탁드립니다. <br><br>



            1. 점검 일시<br>

            : 2020년 9월 22일 새벽 2시 ~ 6시 (GMT+09:00)<br>

            (예상치 못한 문제로 작업이 지연될 경우 시간이 연장될 수 있습니다.)<br><br>



            2. 점검 영향<br>

            : 점검 시간 동안 아래 서비스 이용 불가<br>

            - 카카오계정 가입 (카카오톡 제외)<br>

            - Daum, Melon 신규 가입/통합 <br>

            - Daum 서비스 탈퇴<br>

            - Daum 서비스를 이용 중인 카카오계정 탈퇴 <br><br>



            서비스 이용에 불편을 드린 점 다시 한번 사과드리며, <br>

            보다 편하고 안정적인 서비스로 보답하겠습니다. <br><br>



            감사합니다.   

        </div>
    </div>     

        <div id="date">2020-10-20</div>
        <b-button type="button" id="list-btn" to="/itNewsList" exact>목록으로</b-button>
        </div>

</div>

</body>

</template>

<script>
  export default {
    
  }
</script>

<style>
@import '../assets/css/BoardView.css';


</style>