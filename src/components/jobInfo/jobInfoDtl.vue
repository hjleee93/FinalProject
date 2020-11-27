<template>
  <b-container>
    <div class="header-body text-center mb-7">
      <b-row class="justify-content-center">
        <b-col xl="5" lg="6" md="8" class="px-5">
          <h1 class="text-black">채용정보</h1>
        </b-col>
      </b-row>
    </div>
    <div class="info-box">
      <div class="job-title m-5">
        {{ items.wantedDtl.wantedInfo.wantedTitle._text }}<br />
        <small>{{ items.wantedDtl.corpInfo.corpNm._text }}</small>
        <span
          class="deadline m-2 p-2"
          v-if="items.wantedDtl.wantedInfo.receiptCloseDt._text != '채용시까지'"
          >D-{{
            $moment(
              $moment(items.wantedDtl.wantedInfo.receiptCloseDt._text).format(
                "YYYY-MM-DD"
              )
            ).diff($moment(new Date()), "days") + 1
          }}</span
        >
        <span class="deadline m-2 p-2" v-else>{{
          items.wantedDtl.wantedInfo.receiptCloseDt._text
        }}</span>
      </div>

      <table>
        <tr style="border-top: 1px solid #ededed">
          <td>
            <div class="qualification m-3 p-0">
              <span class="job-col font-weight-bold">지원자격</span>
              <table>
                <tr>
                  <td class="td-100">경력</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.enterTpNm._text }}
                  </td>
                </tr>
                <tr>
                  <td class="td-100">학력</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.eduNm._text }}
                  </td>
                </tr>
              </table>
            </div>
          </td>
          <td>
            <div class="condition m-3">
              <span class="job-col font-weight-bold">근무조건</span>
              <table>
                <tr>
                  <td class="td-100">지역</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.workRegion._text }}
                  </td>
                </tr>
                <tr>
                  <td class="td-100">임금</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.salTpNm._text }}
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="position m-3">
              <span class="job-col font-weight-bold">고용형태</span>
              <table>
                <tr>
                  <td class="td-100">고용형태</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.empTpNm._text }}
                  </td>
                </tr>
                <tr>
                  <td class="td-100">근무형태</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.workdayWorkhrCont._text }}
                  </td>
                </tr>
              </table>
            </div>
          </td>
          <td>
            <div class="benefit m-3">
              <span class="job-col font-weight-bold">복리후생</span>
              <table>
                <tr>
                  <td class="td-100">연금/4대보험</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.fourIns._text }}
                  </td>
                </tr>
                <tr>
                  <td class="td-100">복리후생</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.etcWelfare._text }}
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- 전형방법 -->
    <div>
      <p class="h3 mt-3 font-weight-bold">전형방법</p>
      <v-simple-table class="apply-table">
        <thead>
          <tr>
            <th class="text-left">
              접수마감일
            </th>
            <th class="text-left">
              전형방법
            </th>
            <th class="text-left">
              접수방법
            </th>
            <th class="text-left">
              제출 서류
            </th>
            <th class="text-left">
              제출 서류 양식
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-if="apply.receiptCloseDt == '채용시까지'">
              <b>{{ apply.receiptCloseDt }}</b>
            </td>
            <td v-else>
              <b>{{ $moment(apply.receiptCloseDt).format("YYYY-MM-DD") }}</b>
            </td>
            <td>{{ apply.selMthd }}</td>
            <td>{{ apply.rcptMthd }}</td>
            <td>{{ apply.submitDoc }}</td>
            <td>{{ apply.attachFileInfo }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    <!-- 기업정보 -->
    <p class="h3 mt-3 font-weight-bold">기업정보</p>
    <table class="company-info">
      <tr>
        <td class="company-left">
          <div>
            <div class="m-2">
              <p class="compnay-name text-center mt-5 mb-5">
                {{ items.wantedDtl.corpInfo.corpNm._text }}
              </p>
              <div class="text-center">
                <span>대표 : {{ items.wantedDtl.corpInfo.reperNm._text }}</span>
                <span class=" ml-3"
                  >근로자수 :
                  {{ items.wantedDtl.corpInfo.totPsncnt._text }}</span
                >
              </div>
            </div>
          </div>
        </td>
        <td class="company-right pl-3">
          <table>
            <!-- {{ items.wantedDtl.corpInfo.yrSalesAmt._text }} -->
            <tr >
              <td class="info-right pb-2 pt-2">업종</td>
              <td>{{ items.wantedDtl.corpInfo.indTpCdNm._text }}</td>
            </tr>
            <tr>
              <td class="info-right pb-2">
                주요사업
              </td>
              <td>{{ items.wantedDtl.corpInfo.busiCont._text }}</td>
            </tr>
            <tr>
              <td class="info-right pb-2">주소</td>
              <td>{{ items.wantedDtl.corpInfo.corpAddr._text }}</td>
            </tr>
            <!--TODO: 링크설정 -->
            <tr>
              <td v-if="items.wantedDtl.corpInfo.homePg._text != null" class="info-right pb-2">
                사이트
              </td>
              <td>{{ items.wantedDtl.corpInfo.homePg._text }}</td>
            </tr>
            <tr>
              <td class="info-right">기업형태</td>
              <td>{{ items.wantedDtl.corpInfo.busiSize._text }}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </b-container>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("jobStore");

export default {
  data: () => ({}),
  mounted() {
    this.$store.dispatch("jobStore/loadJobDetail", {
      wantedNo: this.$route.params.wantedNo,
    });
  },
  computed: {
    ...mapState([
      //매핑값
      "apply",
      "items",
    ]),
  },
};
</script>

<style scoped>
/* 기업정보 */
.compnay-name {
  height: 70%;
}
.company-left {
  width: 40%;
}
.company-right {
  width: 60%;
}

.info-right{
  width: 30%;
  
}
.info-right+td{
  width: 70%;
  
}

.company-info {
  width: inherit;
  height: 200px;
  border: 1px solid #ededed;
}

/* 전형방법 */
.apply-table:hover{
  background-color: white;
}
.deadline {
  color: white;
  font-size: 15px;
  border-radius: 5px;
  background-color: #a6b1e1;
}
.job-col {
  padding-bottom: 5px;
  border-bottom: 2px solid;
}
.info-box {
  border: 1px solid #ededed;
}
.td-100 {
  width: 100px;
}
.td-50 {
  height: 50px;
}
.qualification,
.position,
.benefit,
.condition {
  height: 40%;
  display: inline-block;
}
.left {
  height: 500px;
  float: left;
  width: 780px;
  padding: 30px;
  border-right: 1px solid #ededed;
}
.right {
  height: 500px;
  float: right;
  width: calc(100% - 780px);
  padding: 19px 30px 0 30px;
}
.job-title {
  line-height: 1.5;
  font-size: 1.5174em;
  font-weight: 700;
}
.cell {
  width: 50%;
}
</style>
