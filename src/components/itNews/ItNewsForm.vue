<template>
  <b-container>
    <div class="container" id="header-container">
      <h4 id="h4-title">It News 작성</h4>
      <b-button type="button" id="list-btn2" to="/itNewsList" exact
        >목록</b-button
      >
    </div>

    <b-form
      role="form"
      @submit.prevent="enrollBoard"
      @reset="onReset"
      enctype="multipart/form-data"
    >
      <b-input-group prepend="제목" class="mb-2">
        <b-form-input
          required
          id="input-1"
          v-model="newsTitle"
          type="text"
          placeholder="제목을 입력해주세요"
        ></b-form-input>
      </b-input-group>

      <b-input-group prepend="작성자" class="mb-2" hidden>
        <b-form-input
          id="input-2"
          name="boardWriter"
          required
          placeholder="작성자"
          readonly
          v-model="userData.memberName"
        ></b-form-input>
      </b-input-group>

      <b-input-group prepend="분류" class="mb-2">
        <b-form-select
          id="input-3"
          v-model="category"
          :options="newsDivision"
          required
        ></b-form-select>
      </b-input-group>

      <b-form-group id="input-group-3" label-for="input-3">
        <b-form-textarea
          id="textarea-content"
          v-model="newsContent"
          required
          placeholder="내용을 입력해주세요"
          rows="10"
        ></b-form-textarea>
      </b-form-group>

      <b-input-group prepend="연결 사이트" class="mb-2">
        <b-form-input
          required
          id="input-1"
          v-model="newsRefSite"
          type="text"
          placeholder="연결하실 사이트를 입력해주세요"
        ></b-form-input>
      </b-input-group>

      <!-- 첨부파일 이미지 -->
      <b-input-group>
        <v-file-input
          required
          label="연결하실 사이트의 이미지를 첨부해주세요"
          filled
          accept=".gif,.jpg,.png"
          ref="upfiles"
          prepend-icon="mdi-camera"
          v-on:change="handleFile"
        ></v-file-input>
      </b-input-group>

      <!-- 첨부파일 -->
      <!-- <b-form-group>
        <b-form-file id="files" ref="upfiles" v-on:change="handleFile"
        placeholder="첨부파일을 선택해주세요"></b-form-file> 
      </b-form-group> -->

      <b-button type="submit" id="submit-btn2">확인</b-button>
      <b-button type="reset" id="reset-btn2">취소</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");

export default {
  data() {
    return {
      newsTitle: "",
      category: null,
      newsDivision: [
        { value: null, text: "분류를 선택해주세요" },
        { value: "일반", text: "일반" },
        { value: "홍보", text: "홍보" },
      ],
      newsContent: "",
      files: "",
    };
  },

  components: {},

  computed: {
    ...mapState(["userData"]),
  },

  methods: {
    enrollBoard() {
      setTimeout(() => {
        let formData = new FormData();
        formData.append("boardWriter", this.userData.memberName);
        formData.append("memberNum", this.userData.memberSq);
        formData.append("newsTitle", this.newsTitle);
        formData.append("newsDivision", this.category);
        formData.append(
          "newsContent",
          this.newsContent.replace(/(<([^>]+)>)/gi, "")
        );
        formData.append("newsRefSite", this.newsRefSite);
        formData.append("upfile", this.files);

        for (let key of formData.entries()) {
          console.log(`${key}`);
        }
        console.log(this.category);

        axios
          .post("http://localhost:8082/itnews/insertNews", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
        console.log(formData);
        this.$router.push({ name: "ItNewsList" });
      }, 1000);
    },

    handleFile() {
      console.log(this.$refs.upfiles.$refs.input.files[0]);
      this.files = this.$refs.upfiles.$refs.input.files[0];
      console.log(this.files);
    },

    onReset(evt) {
      evt.preventDefault();
      this.boardTitle = "";
      this.category = null;
      this.boardContent = "";
      this.files.name = "";
    },
  },
};
</script>

<style>
@import "../../assets/css/BoardForm.css";

* {
  font-family: "Noto Sans KR", sans-serif;
}
</style>
