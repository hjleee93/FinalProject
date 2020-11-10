<template>

  <body>
    <div class="container-fluid">
      <div class="row">

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
        
          <h2 class="sub-header">IT소식</h2>
          <br>
          <div>
            <b-nav class="st_nav4">
              <b-nav-item active>최신순</b-nav-item>
              <b-nav-item>조회순</b-nav-item>
              <b-nav-item>작성일순</b-nav-item>
              <b-nav-item disabled>댓글순</b-nav-item>
              <!-- 글쓰기 버튼 -->
            </b-nav>
          </div>

          <div align="right">
              <b-button variant="primary" class="st_write"
              to="/itNewsForm" exact>글쓰기</b-button>
          </div>  

          <div class="overflow-auto">
 
  <!-- table -->
    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
      class="table table-hover"
    ></b-table>
        

          <!-- search bar -->
          <div>
          <b-navbar-nav class="ml-auto st_search">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
          </b-navbar-nav>
          </div>

          <!-- page bar-->
           <!-- <p class="mt-3">Current Page: {{ currentPage }}</p> -->
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
             pills 
          ></b-pagination>


  </div>
         

        </div>

      </div>
    </div>
  </body>

</template>

<script>
  export default {
    data() {
      return {
        perPage: 3,
        currentPage: 1,
        items: [
          {분류: '컨퍼런스', 내용: '삼성직무 설명회 입니다', 주최자 :'이재용',작성일: '2020/10/09' },
          {분류: '강의', 내용: '자신감 얻기', 작성자 : '저커버그',주최자: '2020/10/09' },
          {분류: '모집', 내용: '컨퍼런스행사 봉사자 모집합니다',주최자:'구글' ,작성일: '2020/10/09' },
          {분류: '강의', 내용: '스타트 기업에 들어가기',주최자:'스티브 잡스', 작성일: '2020/10/09' },
          {분류: '뉴스', 내용: 'IT분야  2021년 미리보기 ', 주최자 :'강호동',작성일: '2020/10/09' },
          {분류: '강의', 내용: '자신감 얻기', 주최자 : '저커버그',작성일: '2020/10/09' },
        ]
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    }
  }
</script>

<style>
@import '../assets/css/BoardList.css';


</style>