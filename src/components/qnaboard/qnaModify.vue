<template>
  <b-container fluid>
    <b-row>
      <div class="submenuimage ">
        <p class="subtitle">Q & A</p>
      </div>
    </b-row>

    <div class="container">
      <div>
        <h2 class="st_title">QnA 게시글 수정</h2>
      </div>
      <hr />
      <br />

      <!-- 데이터 넘기기 form 시작 -->
      <form @submit.prevent="updateqna" enctype="multipart/form-data">
        <b-input-group prepend="제목" class="mb-2">
          <b-form-input
            id="input-1"
            name="qnaTitle"
            type="text"
            required
            placeholder="제목을 입력해주세요"
            v-model="qnaboard2.qnaTitle"
          ></b-form-input>
        </b-input-group>

        <!-- 카테고리 선택 -->
        <b-input-group prepend="카테고리" class="mb-2">
          <b-form-select
            id="input-2"
            v-model="category"
            :options="qnaCategory"
            required
          ></b-form-select>
        </b-input-group>

        <!-- 에디터창, 내용 -->
        <b-form-group id="input-group-3" label-for="input-3">
          <b-form-textarea
            id="textarea-content"
            v-model="qnaboard2.qnaContent"
            name="qnaContent"
            required
            placeholder="내용을 입력해주세요"
            rows="10"
          ></b-form-textarea>
        </b-form-group>
        <!-- <b-form-group  label="내용" >
        <vue-editor 
          id="input-3"
          v-model="qnaboard2.qnaContent" 
          name="qnaContent" />
      </b-form-group> -->

        <!-- 첨부 파일 -->
        <b-form-group>
          <b-form-file
            id="files"
            ref="upfiles"
            v-on:change="handleFile"
            :placeholder="qbAttachment.originalfilename"
          ></b-form-file>
        </b-form-group>

        <!-- 파일등록 리셋 버튼 -->
        <!-- <b-button @click="clearFiles" id="file_btn" class="mr-2">Clear files</b-button> -->

        <!-- 버튼 -->
        <div id="btn_bottom">
          <b-button type="submit" id="btn_write" class="btn-space"
            >수정완료</b-button
          >
          <b-button type="button" id="btn_write" to="/qnaBoard" exact
            >목록으로</b-button
          >
        </div>
      </form>
    </div>
  </b-container>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      qnaTitle: "",
      qnaWriter: "",
      qnaAnswerYn: "N",
      category: null,
      qnaCategory: [
        { value: null, text: "분류를 선택해주세요" },
        { value: "백엔드", text: "백엔드" },
        { value: "프론트엔드", text: "프론트엔드" },
      ],
      qnaContent: "",
      files: "",
    };
  },

  created() {
    const qnaboardNo = this.$route.params.id;
    this.$store.dispatch("FETCH_QNABOARD_UPDATE", qnaboardNo);
    console.log("지금하고있는 로그 " + qnaboardNo);
  },

  computed: {
    ...mapState({
      //mapState를 통해서 store.js에 저장된 (객체) data를 가져다 쓸수있다
      qnaboard2: (state) => state.qnaboard2,
      qbAttachment: (state) => state.qbAttachment,
    }),
  },

  // components:{
  //   VueEditor,
  // },

  methods: {
    updateqna() {
      //새로고침 1초컷
      setTimeout(() => {
        //새롭게 수정된 내용이 없다면 원래 객체의 컬럼값을 가져가도록
        if (!this.qnaTitle) {
          this.qnaTitle = this.qnaboard2.qnaTitle;
        }
        if (!this.qnaContent) {
          this.qnaContent = this.qnaboard2.qnaContent;
        }
        if (!this.qnaCategory) {
          this.qnaCategory = this.qnaboard2.qnaCategory;
        }
        if (!this.files) {
          this.files = this.qbAttachment.renamedfilename;
        }

        let formData = new FormData();
        formData.append("qnaTitle", this.qnaTitle);
        formData.append("qnaCategory", this.category);
        formData.append("qnaWriter", this.qnaWriter);
        formData.append("qnaAnswerYn", this.qnaAnswerYn);
        formData.append(
          "qnaContent",
          this.qnaContent.replace(/(<([^>]+)>)/gi, "")
        );
        formData.append("file", this.files);
        //spring값 file, vue value값 files! zz

        //아이디값=글번호 받아오기
        formData.append("qboardNo", this.$route.params.id);

        for (let key of formData.entries()) {
          console.log(`${key}`);
        }

        axios
          .post("http://localhost:8082/qna/qnaBoardUpdateEnd", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
        console.log(formData);
        //저장완료, 화면전환 이동!
        this.$router.push({ name: "qnaBoard" });
      }, 1000);
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
    //   this.qnaTitle = ''
    //   this.category = null
    //   this.qnaContent=''
    //   this.files.name=''
    // },

    // clearFiles() {
    //   this.$refs['upfiles'].reset()
    // },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@1,600&display=swap");
* {
  font-family: "Noto Sans KR", sans-serif;
}
.submenuimage {
  background-image: url("../../assets/images/qna.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
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
.st_title {
  margin-left: -1%;
  margin-top: 5%;
  margin-bottom: -0.5%;
}
.btn_sr {
  padding-left: 37%;
  margin: 5%;
  margin-bottom: 5%;
}
.btn-space {
  margin-right: 13px;
}
#btn_write {
  background-color: #424874;
  border: 1px #424874 solid;
  color: white;
}
#file_btn {
  margin-top: 1%;
}
#btn_bottom {
  margin: 5%;
  text-align: center;
}
</style>
