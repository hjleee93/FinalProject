<template>
  <b-container fluid>
    <!-- 메인 이미지 -->
    <b-row>
      <div class="submenuimage2">
        <p id="subtitle4">IT소식</p>
      </div>
    </b-row>

    <div class="container">
      <!-- 탭 -->
      <v-tabs centered color="grey darken-3">
        <v-tab to="/noticeList"><b>공지사항</b></v-tab>
        <v-tab to="/itNewsList"><b>IT소식</b></v-tab>
        <v-tab to="/communityBoardList"><b>자유게시판</b></v-tab>
        <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
      </v-tabs>

      <b-row id="writecontain" align-h="end">
        <b-button to="/itNewsForm" exact v-if="userData.memberSq != null"
          >글쓰기</b-button
        >
      </b-row>

      <div class="overflow-hidden">
        <div class="site_ect">
          <!-- /.row -->
          <div class="row card-align">
            <!-- card -->

            <v-card
              class="mx-auto mcard"
              max-width="250px"
              max-height="300px"
              min-width="250px"
              min-height="300px"
              v-for="it in itnewsList"
              :key="it.id"
              @click="cardclick(it)"
            >
              <!-- 이미지 -->
              <v-img
                class="white--text align-end"
                max-width="250"
                max-height="200px"
                min-width="250px"
                min-height="200px"
                :src="
                  `http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/itnews/imagesrequest${it.newsSq}`
                "
              >
                <v-card-title></v-card-title>
              </v-img>

              <v-card-text class="text--primary">
                <div id="title">{{ it.newsTitle }}</div>
              </v-card-text>

              <v-card-actions>
                <b-button
                  v-on:click.stop.prevent="openWindow(it.newsRefSite)"
                  id="link_a2"
                  >기사보기</b-button
                >
              </v-card-actions>
              <h4 id="ref_date">등록일 : {{ formatDate(it.newsDate) }}</h4>
            </v-card>
          </div>

          <!-- search bar -->
          <!-- <div class="search-align">
          <b-navbar-nav class="ml-auto st_search">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit" id=searchbtn>Search</b-button>
            </b-nav-form>
          </b-navbar-nav>
          </div> -->
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import vueMoment from "vue-moment";
const { mapState: loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

Vue.use(vueMoment);

export default {
  data() {
    return {
      perPage: 4,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState({
      itnewsList: (state) => state.itnewsList,
    }),
    ...loadUserState(["userData"]),
  },
  created() {
    this.$store.dispatch("FECH_ITNEWS_LIST");
  },
  methods: {
    cardclick(value) {
      this.$router.replace({
        name: "itNewsView",
        params: { id: value.newsSq },
      });
    },
    //링크 새로 열기
    openWindow: function(link) {
      window.open(link);
    },

    //https:// 아닐때도 링크 연결====테스트중====
    movePage: function() {
      if (this.it.newsRefSite.includes("http") == false) {
        var url = "https://" + this.it.newsRefSite._text;
      } else {
        url = this.it.newsRefSite._text;
      }
      document.getElementById("homePage").setAttribute("href", url);
    },

    // 날짜변환 함수
    formatDate(value) {
      // console.log(value);
      return this.$moment(value).format("YYYY-MM-DD");
    },
  },
};
</script>

<style scoped>
#writecontain > .btn {
  position: relative;
  top: 100px;
  left: -55px;
  background-color: #424874;
  border: none;
  color: white;
}
#writecontain {
  margin-bottom: 10%;
}

* {
  font-family: "Noto Sans KR", sans-serif;
}
.submenuimage2 {
  background-image: url("../../assets/images/itnewsList.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}

.submenuimage2 {
  width: 100%;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}

#title {
  position: relative;
  top: -10px;
  font-weight: bold;
  font-size: 15px;
}
#content {
  font-size: 10px;
}

#link_a2 {
  position: absolute;
  top: 265px;
  left: 5px;
  background-color: #3f4996;
  font-size: 10px;
  font-weight: bold;
  border: none;
  left: 5px;
  border-radius: 9px;
}
#subtitle4 {
  /* font-family: 'Barlow Semi Condensed', sans-serif; */
  color: white;
  font-weight: bold;
  font-size: 50px;
}
.site_ect {
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 50px;
  margin-top: 20px;
}
.st_search {
  position: absolute;
  left: 67%;
}
.sub-header-ref {
  position: relative;
  left: 18px;
  top: 70px;
  margin-bottom: 3%;
}
#st_write_ref {
  left: 990px;
  position: relative;
  top: 5px;
  background-color: #424874;
  border: none;
  color: white;
}
#searchbtn {
  background-color: #9ba4b4;
  border: 1px #9ba4b4 solid;
}
.search-align {
  margin-top: 2%;
  margin-bottom: 12%;
}
#ref_date {
  color: #9ba4b4;
  margin-top: -10px;
  font-size: 10px;
  position: absolute;
  top: 285px;

  left: 140px;
}
.mx-auto {
  margin: 1.5%;
}
.ref_title {
  /* font-family: 'Masque'; */
  color: #4e5157;
  font-size: 50px;
}
</style>
