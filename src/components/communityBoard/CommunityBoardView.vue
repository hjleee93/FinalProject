<template>
  <b-container fluid>
    <b-row>
      <div class="submenuimage3 ">
        <p class="subtitle" id="subtitle1">자유게시판</p>
      </div>

      <!-- 탭 -->
      <div class="container">
        <!-- <v-tabs
          centered
          color="grey darken-3"
          >
            <v-tab to="/noticeList"><b>공지사항</b></v-tab>
            <v-tab to="/itNewsList"><b>IT소식</b></v-tab>
            <v-tab to="/communityBoardList" ><b>자유게시판</b></v-tab>
            <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
          </v-tabs> -->
      </div>
    </b-row>
    <b-row>
      <b-col
        ><b-card class="text-center" id="text-card">
          <b-container>
            <b-form>
              <b-row>
                <b-col id="title">{{ communityboardView.boardTitle }}</b-col>
              </b-row>
              <b-row>
                <b-col id="boardDate">
                  작성일 : {{ formatDate(communityboardView.boardDate) }}</b-col
                >
                <b-col id="writer">
                  작성자 : {{ communityboardView.boardWriter }}</b-col
                >
              </b-row>
              <b-row> </b-row>

              <b-row>
                <b-col>
                  <pre id="content">{{
                    communityboardView.boardContent
                  }}</pre></b-col
                >
              </b-row>

              <b-row v-if="attachment">
                <b-col cols="2" id="attachment-title"
                  ><b-form-group label="첨부된 파일" readonly
                /></b-col>
                <b-col cols="2" id="attachment"
                  ><b-button
                    id="attachment-btn"
                    @click="attachmentdown(attachment)"
                    >{{ attachment.originalfilename }}</b-button
                  ></b-col
                >
              </b-row>
            </b-form>
          </b-container>

          <b-row>
            <b-col>
              <b-button
                v-if="userData.memberSq === communityboardView.memberNum"
                @click="update"
                id="update-btn2"
                >수정</b-button
              >
              <b-button
                v-if="
                  userData.memberSq === communityboardView.memberNum ||
                    userData.memberEmail === 'admin@kh.com'
                "
                @click="pdelete"
                id="delete-btn2"
                >삭제</b-button
              >
            </b-col>
          </b-row>

          <b-row id=" writecontain" align-h="end">
            <b-col>
              <!-- <b-button to="/communityBoardList" id="prev">이전 </b-button>
          <b-button to="/communityBoardList" id="next">다음 </b-button> -->
              <b-button to="/communityBoardList" id="list4">목록 </b-button>
            </b-col>
          </b-row>
        </b-card></b-col
      >
    </b-row>

    <!-- 댓글 영역 -->
    <b-container>
      <b-row v-for="comment in commentlist" :key="comment.id">
        <b-col>
          <b-card class="text-center">
            <b-row>
              <b-col cols="2" id="nameAndDate"
                >{{ comment.memberName }} <br />{{
                  comment.cbCommentDate | moment("YYYY.MM.DD HH:mm:ss")
                }}
              </b-col>
              <!-- 쓴사람과 아닐떄는 일반 댓글로 보여주지않기 -->
              <b-col v-if="comment.memberSq != userData.memberSq">{{
                comment.cbCommentContent
              }}</b-col>

              <!-- 자기 댓글은 수정할수있는 input 박스로 보여주기 -->
              <b-form
                v-if="
                  userData.memberSq === comment.memberSq ||
                    userData.memberEmail === 'admin@kh.com'
                "
              >
                <b-col>
                  <b-row>
                    <b-col>
                      <b-form-textarea
                        :disabled="commentcheck"
                        :value="comment.cbCommentContent"
                        @input="updateInput"
                        id="commentUptxt"
                        v-if="
                          userData.memberSq === comment.memberSq ||
                            userData.memberEmail === 'admin@kh.com'
                        "
                      />
                    </b-col>

                    <template>
                      <b-col>
                        <b-button
                          v-if="userData.memberSq === comment.memberSq"
                          @click="upclick($event)"
                          id="update-btn"
                          >수정</b-button
                        >
                        <b-button
                          v-if="
                            userData.memberSq === comment.memberSq ||
                              userData.memberEmail === 'admin@kh.com'
                          "
                          @click="declick(comment.cbCommentNo)"
                          id="deltet-btn"
                          >삭제</b-button
                        >
                        <b-button
                          v-if="
                            userData.memberSq === comment.memberSq ||
                              userData.memberEmail === 'admin@kh.com'
                          "
                          @click="upendclick(comment.cbCommentNo, $event)"
                          id="updateEnd-btn"
                          >확인</b-button
                        >
                      </b-col>
                    </template>
                  </b-row>
                </b-col>
              </b-form>
            </b-row></b-card
          ></b-col
        >
      </b-row>
      <!-- 댓글쓰기 -->
      <b-form v-if="userData.memberSq != null">
        <b-row>
          <b-col>
            <b-card class="text-center">
              <b-row>
                <b-col
                  ><b-form-textarea
                    rows="8"
                    ref="comment"
                    v-model="cbcomment"
                    placeholder="댓글을 남겨보세요"
                /></b-col>
                <b-col cols="1"
                  ><b-button @click="comment" id="comment_insert_btn"
                    >등록</b-button
                  ></b-col
                >
              </b-row>
            </b-card></b-col
          ></b-row
        ></b-form
      >
    </b-container>

    <!-- 게시판 삭제 모달 -->
    <ModalView v-if="showModal" @close="showModal = false">
      <template>
        <div slot="header">
          정말 게시판 글을 삭제하시겠습니까?
        </div>
        <div slot="body" class="modalf">
          <b-button id="modal-yes" @click="ydele">네</b-button>
          <b-button id="modal-no" @click="ndele">아니오</b-button>
        </div>
        <div slot="footer"></div>
      </template>
    </ModalView>
  </b-container>
</template>

<script>
import ModalView from "../common/ModalView.vue";
import { mapState } from "vuex";
import axios from "axios";
const { mapState: loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

import Vue from "vue";
import vueMoment from "vue-moment";
Vue.use(vueMoment);

var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

export default {
  data() {
    return {
      showModal: false,
      pboardno: 0,
      cbcomment: "",
      commentModal: false,
      commentcheck: true,
      changeval: "",
      boolcheck: false,
      updatetext: "",
    };
  },
  // watch:{
  //   commentlist:{
  //     handler(newValue){
  //       this.changeval=newValue[0].cbCommentContent;
  //     },deep:true,
  //   }
  // },
  components: {
    ModalView,
  },
  methods: {
    // 날짜변환 함수
    formatDate(value) {
      // console.log(value);
      return this.$moment(value).format("YYYY년 MM월 DD일");
    },

    update() {
      //수정버튼 눌렸을때 처리하는 로직
      //새로운 수정 컴포넌트로 이동
      let no = this.$route.params.id;
      this.$router.replace({
        name: "CommunityBoardUpdate",
        params: { id: no },
      });
    },

    updateInput(event) {
      this.updatetext = event;
    },

    pdelete() {
      this.showModal = !this.showModal;
    },

    ydele() {
      let no = this.$route.params.id;
      this.$store.dispatch("FETCH_COMMUNITYBOARD_DELETE", no);
      this.$router.replace({ name: "CommunityBoardList" });
    },
    comment() {
      let formData2 = new FormData();

      formData2.append("cboardNo", this.communityboardView.boardSq);
      formData2.append("cbCommentContent", this.cbcomment);
      formData2.append("memberSq", this.userData.memberSq);
      formData2.append("memberName", this.userData.memberName);

      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/community/comment",
          formData2
        )
        .then((data) => {
          console.log(data);
          (this.cbcomment = ""),
            this.$store.dispatch(
              "FETCH_CB_COMMENT_LIST",
              this.$route.params.id
            );
        })

        .catch((error) => console.log(error));
    },
    //게시판 삭제 모달 취소
    ndele() {
      this.showModal = !this.showModal;
    },
    //코멘트 모달 취소
    cancleModal() {
      this.commentModal = !this.commentModal;
    },
    //첨부파일 다운로드
    attachmentdown(attachment) {
      location.href =
        "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/community/filedownload?oriName=" +
        attachment.originalfilename +
        "&reName=" +
        attachment.renamedfilename;
    },
    //댓글삭제
    declick(commentno) {
      let delfirm = confirm("댓글을 삭제 하시겠습니까?");
      if (delfirm) {
        const cno = commentno;
        this.$store.dispatch("FETCH_COMMENT_DELETE", cno).then(() => {
          this.$store.dispatch("FETCH_CB_COMMENT_LIST", this.$route.params.id);
        });
      }
    },
    //   //댓글수정
    //   handleInput: function (event) {
    //   // 할당 전에 어떤 처리하기
    //   this.comment.cbCommentContent = event.target.value;
    //   this.updateComment=this.comment.cbCommentContent;

    // },

    //댓글수정
    handleInput: function(event) {
      // 할당 전에 어떤 처리하기
      this.comment.ntCommentContent = event.target.value;
      this.updateComment = this.comment.ntCommentContent;
    },

    upclick(e) {
      console.log(e);
      if (
        e.target.parentElement.parentElement.children[0].children[0].disabled ==
        true
      ) {
        e.target.parentElement.parentElement.children[0].children[0].disabled = false;
      } else
        e.target.parentElement.parentElement.children[0].children[0].disabled = true;

      //console.log()//
      // this.commentcheck=false;
    },

    upendclick(commentno, e) {
      const ccno = commentno;
      e.target.parentElement.parentElement.children[0].children[0].disabled = true;
      if (this.updatetext == "")
        this.updatetext =
          e.target.parentElement.parentElement.children[0].children[0].value;
      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/community/updateComment",
          {
            cbCommentContent: this.updatetext,
            cbCommentNo: ccno,
          }
        )
        .then((data) => {
          console.log(data);
          // this.commentcheck=true;
          this.$store.dispatch("FETCH_CB_COMMENT_LIST", this.$route.params.id);
          this.updatetext = "";
        });
    },
  }, //method
  created() {
    const communityBoardNo = this.$route.params.id;
    this.$store.dispatch("FETCH_COMMUNITYBOARD_VIEW", communityBoardNo);
    this.$store.dispatch("FETCH_COMMUNITYBOARD_ATTACHMENT", communityBoardNo);
    this.$store.dispatch("FETCH_CB_COMMENT_LIST", this.$route.params.id);
  },
  computed: {
    ...mapState({
      communityboardView: (state) => state.communityboardView,
      attachment: (state) => state.cbAttachment2,
      commentlist: (state) => state.cbcomment,
    }),
    ...loadUserState(["userData"]),
  },
};
</script>

<style scoped>
@import "../../assets/css/BoardView.css";

* {
  font-family: "Noto Sans KR", sans-serif;
}
#list4 {
  position: relative;
  padding-top: 10px;
  left: 520px;
  height: 45px;
  width: 80px;
  align-items: center;
  font-size: 17px;
  border: none;
  font-weight: bold;
  background-color: #4975cc;
}
#subtitle1 {
  color: white;
  font-size: 50px;
  font-weight: bold;
}
.submenuimage3 {
  background-image: url("../../assets/images/communityList.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.submenuimage3 {
  width: 100%;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
</style>
