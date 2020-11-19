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
          {{ items.wantedDtl.wantedInfo.wantedTitle._text }}<br>
        <small>{{ items.wantedDtl.corpInfo.corpNm._text }}</small>
        <span class="deadline m-2 p-2">{{ items.wantedDtl.wantedInfo.receiptCloseDt._text }}</span>
      </div>

      <table>
        <tr style="border-top: 1px solid #ededed">
          <td>
            <div class="qualification m-3 p-0">
              <span class="job-col font-weight-bold">지원자격</span>
              <table>
                <tr>
                  <td class="td-100">경력</td>
                  <td class="td-50">{{ items.wantedDtl.wantedInfo.enterTpNm._text }}</td>
                </tr>
                <tr>
                  <td class="td-100">학력</td>
                  <td class="td-50">{{ items.wantedDtl.wantedInfo.eduNm._text }}</td>
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
                  <td class="td-50">{{ items.wantedDtl.wantedInfo.workRegion._text }}</td>
                </tr>
                <tr>
                  <td class="td-100">임금</td>
                  <td class="td-50">{{ items.wantedDtl.wantedInfo.salTpNm._text }}</td>
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
                  <td class="td-50">{{ items.wantedDtl.wantedInfo.empTpNm._text }}</td>
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
                  <td class="td-50">{{ items.wantedDtl.wantedInfo.fourIns._text }}</td>
                </tr>
                <tr>
                  <td class="td-100">복리후생</td>
                  <td class="td-50">{{ items.wantedDtl.wantedInfo.etcWelfare._text }}</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div>
        전형방법
    <b-table :items="apply" :fields="fields" :tbody-tr-class="rowClass"></b-table>
  </div>
  </b-container>
</template>
<script>
import {mapState} from 'vuex'
// var convert = require("xml-js");
export default {
  data() {
     
    return {
        
        fields: ['접수마감일', '전형방법', '접수방법', '제출 서류', '제출 서류 양식',],
        
         
    };
  },
  mounted(){   
      
    this.$store.dispatch('loadJobDetail',{wantedNo:this.$route.params.wantedNo})
  },
  computed:{
    ...mapState([
      //매핑값
      'apply', 'items'
    ])
  },

//   created() {
//     this.wantedNo = this.$route.params.wantedNo;
//     //세부 채용 정보
//     this.$http
//       .get(
//         "http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=D&returnType=XML&infoSvc=VALIDATION&wantedAuthNo=" +
//           this.wantedNo
//       )
//       .then((response) => {
//         var xml = response.data;
//         var json = convert.xml2json(xml, { compact: true });
//         this.items = JSON.parse(json);
        
//       });
//   },

};
</script>

<style scoped>
.deadline{
    color:white;
    font-size: 15px;
    border-radius: 5px;
    background-color:#a6b1e1;
}
.job-col{
    padding-bottom: 5px;
    border-bottom: 2px solid;
}
.info-box {
  border: 1px solid #ededed;
}
.td-100{
    width: 100px;
}
.td-50{
    height:50px;
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
