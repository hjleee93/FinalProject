<template>

  <body>
    <div class="container-fluid">
      <div class="row">
      <div class="submenuimage">
        <p class="subtitle">Counsult Resume</p>
      </div>
      <div>
          <b-nav tabs fill>
              <b-nav-item to="/resume/insertresume">입사지원서 등록</b-nav-item>
              <b-nav-item to="/resume/resume">입사지원서 보기</b-nav-item>
              <b-nav-item to="/resume/updateresume">입사지원서 수정</b-nav-item>
              <b-nav-item active to="/resume/consultresume">입사지원서 컨설팅</b-nav-item>
              <b-nav-item to="/resume/consult">컨설팅 전문가 등록</b-nav-item>
          </b-nav>
      </div>

        <div class="container">
          <h2 class="sub-header"></h2>
        <br>

        <!-- 버튼 -->
        <div>
          <h4 class="sub-header">취업설명회 일정</h4>
          <v-btn to="/boardform" exact  id="st_write1">글쓰기</v-btn>
        </div>

        <div class="overflow-auto">
         <!-- 테이블 -->
        <v-card>
        <v-card-title>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
        </v-card-title>
          <v-data-table
            :headers="headers"
            :items="tableList"
            :search="search"
          ></v-data-table>
        </v-card>
        
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
      search: '',
        headers: [
          {
            text: '분류',
            align: 'start',
            filterable: false,
            value: 'category',
          },
          { text: '기업명', value: 'name' },
          { text: '날짜', value: 'date' },
          { text: '시간', value: 'time' },
          { text: '주소', value: 'address' },
        ],
        tableList: [

          {
            category: '박람회',
            name:'카카오프렌즈',
            date: '2020-10-01',
            time: '15:00',
            address:'라이브 채용설명회<사전신청 : https://docs.google.cXV-Q/viewform>'
          },

         {
            category: '박람회',
            name:'티몬',
            date: '2020-10-01',
            time: '15:00',
            address:'강릉원주대학교 강릉캠퍼스 교육지원센터(C9) 520호 / 참석방법 : 현장방문 접수'
          },
          {
            category: '상담회',
            name:'롯데푸드',
            date: '2020-10-01',
            time: '11:00',
            address:'오프라인 채용설명회 캐치카페 한양대'
          },
          {
            category: '설명회',
            name:'크레프톤',
            date: '2020-11-11',
            time: '10:00',
            address:'오프라인 채용설명회 캐치카페 한양대'
          },
          {
            category: '설명회',
            name:'카카오프렌즈',
            date: '2020-10-01',
            time: '15:00',
            address:'오프라인 채용설명회 캐치카페 한양대'
          },
          {
            category: '상담회',
            name:'위메프',
            date: '2020-10-02',
            time: '11:30',
            address:'오프라인 채용설명회 캐치카페 한양대'
          },
          {
            category: '설명회',
            name:'쿠팡 주식회사',
            date: '2020-10-21',
            time: '15:00',
            address:'유튜브를 통한 온라인 실시간 중계<유튜브 주소 : httpcom/kepconewmedia'
          },
          {
            category: '설명회',
            name:'(주)우아한형제들',
            date: '2020-10-31',
            time: '15:00',
            address:'오프라인 채용설명회 캐치카페 한양대'
          },

        
        ],
      }
    },
  }
</script>

<style scoped >
#subtitle{
 font-family: 'Barlow Semi Condensed', sans-serif;
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
#st_write1{
  position: relative;
  top: 0px;
  left:1050px;
  width:70px;
  margin-bottom: 10px;
  right: -40px;
  margin-right: 3.5%;
  background-color: #424874;
  border:none;
  color:white;
}
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@800&display=swap');
* {
   font-family: 'Nanum Gothic', sans-serif;
}
</style>