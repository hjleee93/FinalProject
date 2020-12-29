<template>
  <div class="consult_resume_enroll">
    <body>
      <div class="container-fluid">
        <div class="submenuimage">
          <p class="subtitle">Update Consult Resume Detail</p>
        </div>
        <div>
          <v-tabs centered color="grey darken-3">
            <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
            <v-tab to="/resume/resumeList">입사지원서 보기</v-tab>
            <v-tab active to="/resume/consultresume">입사지원서 컨설팅</v-tab>
            <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
            <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
          </v-tabs>
        </div>

        <b-container>
          <form @submit.prevent="updateConsult" enctype="multipart/form-data">
            <b-form-group id="input-group-1" label="제목" label-for="input-1">
              <b-form-input
                id="input-1"
                name="rboardTitle"
                type="text"
                required
                :placeholder="rboardDetail.rboardTitle"
                v-model="rboardTitle"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="작성자" label-for="input-2">
              <b-form-input
                id="input-2"
                name="rboardWriter"
                required
                placeholder="작성자"
                readonly
                v-model="rboardDetail.rboardWriter"
              ></b-form-input>
            </b-form-group>
            <b-form-file
              id="files"
              ref="upfiles"
              v-on:change="handleFile"
              v-model="rboardAttachment.originalFilename"
            ></b-form-file>

            <b-form-group
              id="input-group-3"
              label="상세내용:"
              label-for="input-3"
            >
              <vue-editor
                id="input-3"
                name="rboardContent"
                v-model="rboardDetail.rboardContent"
              />
            </b-form-group>
            <!-- <b-button type="submit" class="s-btn">확인</b-button> -->

            <b-button type="reset" class="r-btn">취소</b-button>
            <b-button @click="updateConsult" class="s-btn">수정</b-button>
            <b-button to="../../resume/consultresume">목록으로</b-button>
          </form>
        </b-container>
      </div>
    </body>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
const { mapState: loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      rboardTitle: "",
      rboardContent: "",
      files: "",
    };
  },
  computed: {
    ...mapState({
      rboardDetail: (state) => state.rboardDetail,
      rboardAttachment: (state) => state.rboardAttachment,
    }),
    ...loadUserState(["userData"]),
  },

  components: {
    VueEditor,
  },
  methods: {
    updateConsult() {
      if (!this.rboardTitle) {
        this.rboardTitle = this.rboardDetail.rboardTitle;
      }
      if (!this.rboardContent) {
        this.rboardContent = this.rboardDetail.rboardContent;
      }
      if (!this.files) {
        this.files = this.rboardAttachmentFilename;
      }

      let formData = new FormData();
      formData.append("rboardWriter", this.userData.memberName);
      formData.append("rboardTitle", this.rboardTitle);
      formData.append("memberSq", this.userData.memberSq);
      formData.append(
        "rboardContent",
        this.rboardContent.replace(/(<([^>]+)>)/gi, "")
      );
      formData.append("file", this.files);
      formData.append("rboardNo", this.$route.params.id);

      // for(let key of formData.entries()){
      //   console.log(`${key}`);
      // }
      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/resume/updateRboard",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setTimeout(
            () => this.$router.replace({ path: "/resume/consultresume" }),
            2000
          );
          //this.$route.replace({name:'consultresume'})
        })
        .catch((error) => console.log(error));

      //console.log(formData);
    },
    handleFile() {
      //console.log(this.$refs.upfiles.$refs.input.files[0]);
      this.files = this.$refs.upfiles.$refs.input.files[0];
      //console.log(this.files);
    },
  },
};
</script>

<style scoped>
.s-btn {
  background-color: #424874;
  margin-right: 20px;
  border: none;
}
.r-btn {
  background-color: #9ba4b4;
  border: none;
  margin-left: 37%;
  margin-right: 20px;
}
.submenuimage {
  background-image: url("../../assets/images/resume.jpeg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.subtitle {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px #4e515763;
  font-size: 50px;
}
</style>
