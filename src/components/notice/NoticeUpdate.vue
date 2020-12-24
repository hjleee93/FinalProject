<template>
  <b-container>
    <div class="container" id="header-container">
      <h4 id="h4-title">공지사항 수정하기</h4>
    </div>

    <form
      role="form"
      @submit.prevent="updateForm"
      enctype="multipart/form-data"
    >
      <b-input-group prepend="제목" class="mb-2">
        <b-form-input
          id="input-1"
          name="boardTitle"
          type="text"
          required
          placeholder="제목"
          v-model="noticeView.noticeTitle"
        ></b-form-input>
      </b-input-group>

      <b-input-group prepend="분류" class="mb-2">
        <b-form-select
          id="input-2"
          v-model="category"
          :options="noticeDivision"
          required
        ></b-form-select>
      </b-input-group>

      <b-form-group id="input-group-3" label-for="input-3">
        <b-form-textarea
          id="textarea-content"
          v-model="noticeView.noticeContent"
          required
          rows="10"
        ></b-form-textarea>
      </b-form-group>

      <!-- 첨부파일 -->
      <b-form-group>
        <b-form-file
          id="files"
          ref="upfiles"
          v-on:change="handleFile"
          :placeholder="updateData.originalfilename"
        ></b-form-file>
      </b-form-group>
      <!-- <b-button @click="clearFiles" class="mr-2">Clear files</b-button> -->

      <b-button id="submit-btn2" type="submit">완료</b-button>
      <!-- <b-button id="submit-btn2"  @click="onReset" >취소</b-button> -->
      <b-button type="button" id="list-btn2" to="/noticeList" exact
        >목록</b-button
      >
    </form>
  </b-container>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      noticeTitle: "",
      category: null,
      noticeDivision: [
        { value: null, text: "분류를 선택해주세요" },
        { value: "긴급", text: "긴급" },
        { value: "공지", text: "공지" },
      ],
      noticeContent: "",
      files: "",
    };
  },

  created() {
    const noticeSq = this.$route.params.id;
    this.$store.dispatch("FETCH_NOTICE_UPDATE", noticeSq);
    console.log("지금하고있는 로그 " + noticeSq);
  },

  computed: {
    ...mapState({
      //mapState를 통해서 store에 저장된 (객체) data를 가져다 쓸수있다
      noticeView: (state) => state.noticeView,
      updateData: (state) => state.updateData,
    }),
  },

  components: {
    // VueEditor,
  },

  methods: {
    updateForm() {
      //새롭게 수정된 내용이 없다면 원래 객체의 컬럼값을 가져가도록
      if (!this.noticeTitle) {
        this.noticeTitle = this.noticeView.noticeTitle;
      }
      if (!this.noticeContent) {
        this.noticeContent = this.noticeView.noticeContent;
      }
      if (!this.noticeDivision) {
        this.noticeDivision = this.noticeView.noticeDivision;
      }
      if (!this.files) {
        this.files = this.updateData.renamedfilename;
      }

      let formData = new FormData();
      formData.append("noticeTitle", this.noticeTitle);
      formData.append("noticeDivision", this.category);
      formData.append("noticeSq", this.$route.params.id);
      formData.append(
        "noticeContent",
        this.noticeContent.replace(/(<([^>]+)>)/gi, "")
      );
      formData.append("file", this.files);

      for (let key of formData.entries()) {
        console.log(`${key}`);
      }

      axios
        .post("http://localhost:8082/notice/noticeUpdateEnd", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
      console.log(formData);
      //등록후 게시판 리스트로 이동
      this.$router.push({ name: "NoticeList" });
    },

    handleFile() {
      console.log(this.$refs.upfiles.$refs.input.files[0]);
      this.files = this.$refs.upfiles.$refs.input.files[0];
      console.log(this.files);
    },

    // onReset(evt) {
    //   evt.preventDefault()
    //   // Reset our form values
    //   // this.form.email = ''
    //   this.boardTitle = ''
    //   this.category = null
    //   this.boardContent=''
    //   this.files.name=''
    // },
    // clearFiles() {
    //   this.$refs['file-input'].reset()
    // }
  },
};
</script>

<style>
@import "../../assets/css/BoardUpdate.css";
</style>
