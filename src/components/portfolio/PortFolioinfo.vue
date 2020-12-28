<template>
  <b-container fluid>
    <b-row>
      <div class="submenuimage ">
        <p class="subtitle" id="subtitle">상세보기</p>
      </div>
    </b-row>

    <div class="container">
      <b-row>
        <b-col>
          <b-card class="text-center">
            <b-row align-h="between" id=" writecontain">
              <b-col cols="2"
                ><p class="division">{{ pboardone.pboardDivision }}</p></b-col
              ><b-col cols="2"
                ><b-icon icon="eye"></b-icon
                ><small class="count">{{ pboardone.pboardCount }}</small></b-col
              ></b-row
            >

            <b-row>
              <b-col
                ><h3 style="text-align:left;">{{ pboardone.pboardTitle }}</h3>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="12" style="text-align:left;"
                ><p class="content">{{ pboardone.pboardContent }}</p></b-col
              >
            </b-row>
            <b-row v-if="attachment">
              <b-col
                cols="4"
                class="filedown"
                @click="attachmentdown(attachment)"
                ><b-icon icon="file-earmark-arrow-down-fill"></b-icon
                >{{ attachment.originalFilename }}</b-col
              >
            </b-row>
            <b-row>
              <b-col style="text-align: right;"
                >작성자:<span class="h6 mb-2">{{
                  pboardone.pboardWriter
                }}</span></b-col
              >
              <b-col cols="2"
                ><b-button align-self="end" to="/portfolioList"
                  ><b-icon icon="chevron-left"></b-icon> </b-button
              ></b-col>
            </b-row>

            <b-row v-if="userData.memberSq === pboardone.pboardId"
              ><b-col>
                <b-button
                  @click="update"
                  v-if="userData.memberSq === pboardone.pboardId"
                  >수정</b-button
                >
                <b-button
                  @click="pdelete"
                  v-if="
                    userData.memberSq === pboardone.pboardId ||
                      userData.memberEmail === 'admin@kh.com'
                  "
                  >삭제</b-button
                >
              </b-col></b-row
            ></b-card
          ></b-col
        >
      </b-row>
    </div>
    <b-container>
      <b-form @submit.prevent="comment" v-if="userData.memberLevel >= 2"
        ><b-row
          ><b-col
            ><b-card class="text-center"
              ><b-row
                ><b-col cols="2">{{ userData.memberName }}</b-col></b-row
              >
              <b-row
                ><b-col
                  ><b-form-textarea required ref="comment" v-model="pcomment"
                /></b-col>
                <b-col cols="1"
                  ><b-button type="submit">전송</b-button></b-col
                ></b-row
              >
            </b-card></b-col
          ></b-row
        ></b-form
      >
      <b-container>
        <b-row
          v-for="comments in commentlist"
          :comments="comments"
          :key="comments.id"
          ><b-col
            ><b-card class="text-center"
              ><b-row
                ><b-col style="text-align:start" align-self="start">{{
                  comments.memberName
                }}</b-col>
                <b-col align-self="end" style="text-align:end">{{
                  new Date(comments.pcommentDate).toLocaleDateString()
                }}</b-col>
              </b-row>
              <!-- 인풋 박스를 조건으로 비활성화 할수 있음-->
              <b-row>
                <b-col v-if="commentcheck == true">
                  <b-form-textarea
                    :value="comments.pcommentContent"
                    @input="updateInput"
                  />
                </b-col>
                <b-col v-if="commentcheck == false"
                  ><p class="comment">{{ comments.pcommentContent }}</p></b-col
                >

                <template v-if="comments.memberSq == userData.memberSq">
                  <b-col cols="2">
                    <div
                      v-if="boolcheck == false"
                      @click="declick(comments.pcommentNo)"
                    >
                      <b-icon icon="trash-fill"></b-icon>
                    </div>
                    <div
                      v-if="boolcheck == false"
                      @click="upclick(comments.pcommentContent)"
                    >
                      <b-icon icon="pencil-square"></b-icon>
                    </div>
                    <!--v-if="commentcheck==false"-->
                    <div
                      v-if="boolcheck == true"
                      @click="upendclick(comments.pcommentNo, $event)"
                    >
                      <b-icon icon="check-circle"></b-icon>
                    </div>
                  </b-col>
                </template> </b-row></b-card
          ></b-col>
        </b-row>
      </b-container>
    </b-container>

    <b-row>
      <b-col>
        <b-card class="text-center">
          <b-row align-h="between" id=" writecontain">
            <b-col cols="2"
              ><p class="division">{{ pboardone.pboardDivision }}</p></b-col
            ><b-col cols="2"
              ><b-button align-self="end" to="/portfolioList"
                ><b-icon icon="chevron-left"></b-icon> </b-button></b-col
          ></b-row>
          <b-row>
            <b-col
              ><h3 style="text-align:left;">{{ pboardone.pboardTitle }}</h3>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" style="text-align:left;"
              ><p class="content">{{ pboardone.pboardContent }}</p></b-col
            >
          </b-row>
          <b-row v-if="attachment">
            <b-col cols="4" class="filedown" @click="attachmentdown(attachment)"
              ><b-icon icon="file-earmark-arrow-down-fill"></b-icon
              >{{ attachment.originalFilename }}</b-col
            >
          </b-row>
          <b-row>
            <b-col style="text-align: right;"
              >작성자:<span class="h6 mb-2">{{
                pboardone.pboardWriter
              }}</span></b-col
            >
          </b-row>

          <b-row v-if="userData.memberSq === pboardone.pboardId"
            ><b-col>
              <b-button
                @click="update"
                v-if="userData.memberSq === pboardone.pboardId"
                >수정</b-button
              >
              <b-button
                @click="pdelete"
                v-if="
                  userData.memberSq === pboardone.pboardId ||
                    userData.memberEmail === 'admin@kh.com'
                "
                >삭제</b-button
              >
            </b-col></b-row
          ></b-card
        ></b-col
      >
    </b-row>

    <b-form @submit.prevent="comment" v-if="userData.memberLevel >= 2"
      ><b-row
        ><b-col
          ><b-card class="text-center"
            ><b-row
              ><b-col cols="2">{{ userData.memberName }}</b-col></b-row
            >
            <b-row
              ><b-col
                ><b-form-textarea required ref="comment" v-model="pcomment"
              /></b-col>
              <b-col cols="1"
                ><b-button type="submit">전송</b-button></b-col
              ></b-row
            >
          </b-card></b-col
        ></b-row
      ></b-form
    >
    <b-container>
      <b-row
        v-for="comments in commentlist"
        :comments="comments"
        :key="comments.id"
        ><b-col
          ><b-card class="text-center"
            ><b-row
              ><b-col style="text-align:start" align-self="start">{{
                comments.memberName
              }}</b-col>
              <b-col align-self="end" style="text-align:end">{{
                new Date(comments.pcommentDate).toLocaleDateString()
              }}</b-col>
            </b-row>
            <!-- 인풋 박스를 조건으로 비활성화 할수 있음-->
            <b-row>
              <b-col v-if="commentcheck == true">
                <b-form-textarea
                  :value="comments.pcommentContent"
                  @input="updateInput"
                />
              </b-col>
              <b-col v-if="commentcheck == false"
                ><p>{{ comments.pcommentContent }}</p></b-col
              >

              <template v-if="comments.memberSq == userData.memberSq">
                <b-col cols="2">
                  <div
                    v-if="boolcheck == false"
                    @click="declick(comments.pcommentNo)"
                  >
                    <b-icon icon="trash-fill"></b-icon>
                  </div>
                  <div
                    v-if="boolcheck == false"
                    @click="upclick(comments.pcommentContent)"
                  >
                    <b-icon icon="pencil-square"></b-icon>
                  </div>
                  <!--v-if="commentcheck==false"-->
                  <div
                    v-if="boolcheck == true"
                    @click="upendclick(comments.pcommentNo, $event)"
                  >
                    <b-icon icon="check-circle"></b-icon>
                  </div>
                </b-col>
              </template> </b-row></b-card
        ></b-col>
      </b-row>
    </b-container>

    <ModalView v-if="showModal" @close="showModal = false">
      <template>
        <div slot="header">
          정말 삭제하시겠습니까?
        </div>
        <div slot="body" class="modalf">
          <b-button @click="ydele">
            YES
          </b-button>
          <b-button @click="ndele">NO</b-button>
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
export default {
  data() {
    return {
      showModal: false,
      pboardno: 0,
      pcomment: "",
      commentcheck: false,
      changeval: "",
      boolcheck: false,
      values: "",
      updatetext: "",
      comments: "",
      retext: "",
    };
  },

  components: {
    ModalView,
  },

  methods: {
    update() {
      //수정버튼 눌렸을때 처리하는 로직
      //새로운 수정 컴포넌트로 이동
      let no = this.$route.params.id;
      this.$router.push({ name: "Portup", params: { id: no } });
    },
    pdelete() {
      this.showModal = !this.showModal;
    },
    updateInput(event) {
      this.updatetext = event;
    },
    upclick(value) {
      this.boolcheck = true;
      this.commentcheck = true;
      this.retext = value;
      //  if(e.target.parentElement.parentElement.children[0].children[0].disabled==true){
      //    e.target.parentElement.parentElement.children[0].children[0].disabled = false
      //  }else e.target.parentElement.parentElement.children[0].children[0].disabled = true

      //console.log()//
      // this.commentcheck=false;
    },
    ydele() {
      let no = this.$route.params.id;
      this.$store.dispatch("FETCH_PBOARDDEL", no);
      this.$router.push({ name: "portlist" });
    },
    upendclick(commentno) {
      const ccno = commentno;
      //e.target.parentElement.parentElement.children[0].children[0].disabled = true;
      if (this.updatetext == "") this.updatetext = this.retext;
      // console.log(this.updatetext==""?'공백이야':'값이 있어')
      // console.log(this.comments.pcommentcontent)

      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/portfolio/updatecomment.do",
          {
            pcommentcontent: this.updatetext,
            pcommentNo: ccno,
          }
        )
        .then(() => {
          this.$store.dispatch("FETCH_COMMNET", this.$route.params.id);
          this.updatetext = "";
          this.boolcheck = false;
          this.commentcheck = false;
        });
    },
    declick(commentno) {
      let delfirm = confirm("삭제 하시겠습니까?");
      if (delfirm) {
        const cno = commentno;
        this.$store.dispatch("FETCH_COMMENTDEL", cno).then(() => {
          this.$store.dispatch("FETCH_COMMNET", this.$route.params.id);
        });
      }
    },

    comment() {
      let formData2 = new FormData();
      formData2.append("pboardNo", this.pboardone.pboardNo);
      formData2.append("pcommentContent", this.pcomment);
      formData2.append("memberSq", this.userData.memberSq);
      formData2.append("memberName", this.userData.memberName);
      // for(let key of formData2.entries()){
      //   console.log(`${key}`);
      // }
      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/portfolio/comment.do",
          formData2
        )
        .then((data) => {
          console.log(data);
          (this.pcomment = ""),
            this.$store.dispatch("FETCH_COMMNET", this.$route.params.id);
        })

        .catch((error) => console.log(error));
    },

    ndele() {
      this.showModal = !this.showModal;
    },
    //첨부파일 다운로드
    attachmentdown(attachment) {
      location.href =
        "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/portfolio/filedownload?oriName=" +
        attachment.originalFilename +
        "&reName=" +
        attachment.renamedFilename;
    },
  },
  created() {
    const pboardNo = this.$route.params.id;
    this.$store.dispatch("FETCH_PBOARDONE", pboardNo);
    this.$store.dispatch("FETCH_ATTACHMENT", pboardNo);
    this.$store.dispatch("FETCH_COMMNET", this.$route.params.id);
  },
  mounted() {
    //모든 화면이 렌더링된 후 호출 된다.
  },
  computed: {
    ...mapState({
      pboardone: (state) => state.pboardone,
      attachment: (state) => state.attachment2,
      commentlist: (state) => state.comment,
    }),
    ...loadUserState(["userData"]),
  },
};
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}
.submenuimage {
  width: 100%;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.subtitle {
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px #4e515763;
  font-size: 50px;
}
#writecontain {
  margin-bottom: 10%;
}
.count {
  padding-left: 10px;
}
.filedown {
  cursor: pointer;
}
.modalf {
  display: flex;
  justify-content: space-around;
}
.division {
  font-size: 20px;
}
.content {
  min-height: 200px;
  max-height: auto;
  border-bottom: 1px solid black;
}
.comment {
  text-align: start;
  padding-left: 10%;
}
</style>
