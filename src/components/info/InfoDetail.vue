<template>
  <b-container fluid>
    <b-row>
      <div class="submenuimageinfo">
        <p class="subtitle" id="subtitle">취업정보</p>
      </div>
    </b-row>

    <b-container>
      <b-row>
        <b-col>
          <b-card class="text-center">
            <b-form>
              <h2 class="sub-header">
                <b-row class="infodetail">
                  <b-col id="ititle">{{ infoDetail.infoTitle }}</b-col>
                </b-row>
              </h2>
              <b-row>
                <b-col id="icategory"
                  ><b>취업{{ infoDetail.infoCategory }}</b></b-col
                >
              </b-row>
              <hr />

              <b-container id="container">
                <b-row>
                  <b-col id="idate"
                    ><b>날짜</b> :
                    {{
                      infoDetail.infoDate | moment("YYYY년 MM월 DD일")
                    }}</b-col
                  >
                </b-row>

                <b-row>
                  <b-col id="itime"
                    ><b>시간</b> :
                    {{ infoDetail.infoTime | moment("hh시 ss분") }}</b-col
                  >
                </b-row>

                <b-row>
                  <b-col id="icontent"
                    ><b>주소/내용</b> : {{ infoDetail.infoContent }}</b-col
                  >
                </b-row>
                <hr />

                <!--이미지 미리보기-->
                <div class="container" v-if="attachment">
                  <v-img
                    class="white--text align-end"
                    id="images"
                    :src="
                      `http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/info/imagesrequest${infoDetail.infoSq}`
                    "
                  ></v-img>
                  <hr />
                </div>

                <b-row v-if="attachment">
                  <b-col id="iphoto">첨부파일</b-col>
                  <b-col
                    ><b-button
                      class="iphotofile"
                      @click="attachmentdown(attachment)"
                      >{{ attachment.originalfilename }}</b-button
                    ></b-col
                  >
                </b-row>
              </b-container>
            </b-form>

            <b-row id="writecontain" align-h="end">
              <b-col>
                <b-button
                  id="btn_update"
                  v-if="userData.memberEmail === 'admin@kh.com'"
                  @click="update"
                  >수정</b-button
                >
                <b-button
                  id="btn_pdelete"
                  v-if="userData.memberEmail === 'admin@kh.com'"
                  @click="pdelete"
                  >삭제</b-button
                >
                <b-button to="/infoList" id="golist">목록</b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <ModalView v-if="showModal" @close="showModal = false">
      <template>
        <div slot="header">
          삭제하시겠습니까?
        </div>
        <div slot="body" class="modalf">
          <b-button id="but_ydele" @click="ydele">네</b-button>
          <b-button id="but_ndele" @click="ndele">아니요</b-button>
        </div>
        <div slot="footer"></div>
      </template>
    </ModalView>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import ModalView from "../common/ModalView.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState: loadUserState } = createNamespacedHelpers("memberStore");

export default {
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    ModalView,
  },
  methods: {
    formatDate(value) {
      return this.$moment(value).format("YYYY년 MM월 DD일");
    },

    update() {
      //새로운 수정 컴포넌트로 이동
      let no = this.$route.params.id;
      this.$router.push({ name: "InfoModify", params: { id: no } });
    },
    pdelete() {
      this.showModal = !this.showModal;
    },
    ydele() {
      let no = this.$route.params.id;
      this.$store.dispatch("FETCH_INFO_DELETE", no);
      this.$router.push({ name: "InfoList" });
    },
    ndele() {
      this.showModal = !this.showModal;
    },
    //첨부파일 다운로드
    attachmentdown(attachment) {
      location.href =
        "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/info/filedownload?oriName=" +
        attachment.originalfilename +
        "&reName=" +
        attachment.renamedfilename;
    },
  },
  created() {
    const infoNo = this.$route.params.id;
    this.$store.dispatch("FETCH_INFO_DETAIL", infoNo);
    this.$store.dispatch("FETCH_INFO_ATTACHMENT", infoNo);
  },
  computed: {
    ...mapState({
      infoDetail: (state) => state.infoDetail,
      attachment: (state) => state.infoAttachment2,
    }),
    ...loadUserState(["userData"]),
  },
};
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}
.subtitle {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  color: rgb(253, 253, 253);
  text-shadow: 2px 2px #0d0d0e63;
  font-size: 50px;
}
.submenuimageinfo {
  background-image: url("../../assets/images/infoJob.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
  width: 100%;
}
.text-center {
  margin: 10px 100px;
  font-weight: bold;
}
.sub-header {
  margin: 3px;
  font-weight: bold;
}
.form-control {
  width: 550px;
  margin-bottom: 5px;
  background-color: white;
  border-color: white;
  resize: none;
}
#writecontain {
  margin: 2%;
  text-align: center;
}
#btn_update {
  width: 60px;
  margin-bottom: 5px;
  margin-right: 1.5%;
  background-color: #424874;
  border: 5px;
  color: white;
}
#btn_pdelete {
  width: 60px;
  margin-bottom: 5px;
  margin-right: 1.5%;
  background-color: #9ba4b4;
  border: 5px;
  color: white;
}
#golist {
  width: 60px;
  margin-bottom: 5px;
  background-color: #424874;
  border: 5px;
  color: white;
}
#but_ydele {
  background-color: #9ba4b4;
  border-color: #9ba4b4;
}
#but_ndele {
  background-color: #424874;
}
#btn_file {
  background-color: #512d7ee7;
  margin-bottom: 10px;
}
.modalf {
  display: flex;
  justify-content: space-around;
}
#iphoto {
  width: 15px;
  text-align: left;
  color: rgb(75, 75, 75);
}
.iphotofile {
  text-align: left;
  margin-left: -220%;
  max-width: 300px;
  max-height: 300px;
}
#images {
  height: auto;
  width: auto;
  object-fit: cover;
  /*  max-width: 100px; 
    max-height: 100px; */
}
#ititle {
  text-align: canter;
}
#icategory {
  right: 25px;
  text-align: right;
  font-size: 21px;
  font-weight: lighter;
}
#itime {
  left: 10px;
  text-align: left;
}
#iphotofile {
  left: 10px;
  text-align: left;
}
#idate {
  left: 10px;
  text-align: left;
}
#icontent {
  left: 10px;
  text-align: left;
}
#attachment {
  left: 10px;
  text-align: left;
}
</style>
