<template>
  <div class="banner-content col-lg-12">
    <b-form action="" class="serach-form-area">
      <div class="row justify-content-center form-wrap">
        <div class="col-lg-4 form-cols ">
          <b-form-input
            type="text"
            class="form-control text-center"
            name="search"
            v-model="keyword"
            placeholder="검색어를 입력해주세요"
          />
        </div>
        <div class="col-lg-3 form-cols">
          <div>
            <button
              type="button"
              class="form-control"
              name="search"
              @click="locationSearch"
            >
              지역을 선택해주세요
            </button>
          </div>
        </div>

        <div class="col-lg-3 form-cols ">
          <div>
            <button
              type="button"
              class="form-control"
              name="search"
              @click="fieldSearch"
            >
              직종을 선택해주세요
            </button>
          </div>
        </div>

        <div class="col-lg-2 form-cols">
          <b-button type="button" class="btn btn-info" @click="jobSearch()">
            <span class="lnr lnr-magnifier"></span> Search
          </b-button>
        </div>
      </div>
      <!-- 지역선택 dept 1 -->
      <div class="location-div">
        <p class="p-4"><b>지역을 선택해주세요</b></p>
        <div class="prov-layer p-4">
          <table>
            <tr>
              <td class="area-btn">
                <b-btn class="areaBtn">전체</b-btn>
              </td>
              <td class="area-btn" value="seoul">
                <b-btn class="areaBtn">서울</b-btn>
              </td>
            </tr>
            <tr>
              <td class="area-btn" value="sejong">
                <b-btn class="areaBtn">세종</b-btn>
              </td>
              <td class="area-btn" value="gyeonggi">
                <b-btn class="areaBtn">경기</b-btn>
              </td>
            </tr>
            <tr>
              <td class="area-btn" value="busan">
                <b-btn class="areaBtn">부산</b-btn>
              </td>
              <td class="area-btn" value="incheon">
                <b-btn class="areaBtn">인천</b-btn>
              </td>
            </tr>
            <tr>
              <td class="area-btn" value="daegu">
                <b-btn class="areaBtn">대구</b-btn>
              </td>
              <td class="area-btn" value="daejeon">
                <b-btn class="areaBtn">대전</b-btn>
              </td>
            </tr>
            <tr>
              <td class="area-btn" value="ulsan">
                <b-btn class="areaBtn">울산</b-btn>
              </td>
              <td class="area-btn" value="gwangju">
                <b-btn class="areaBtn">광주</b-btn>
              </td>
            </tr>
            <tr>
              <td class="area-btn" value="jeonbuk">
                <b-btn class="areaBtn">전북</b-btn>
              </td>
              <td class="area-btn" value="jeonnam">
                <b-btn class="areaBtn">전남</b-btn>
              </td>
            </tr>
            <tr>
              <td class="area-btn" value="gyeongbuk">
                <b-btn class="areaBtn">경북</b-btn>
              </td>
              <td class="area-btn" value="gyeongnam">
                <b-btn class="areaBtn">경남</b-btn>
              </td>
            </tr>
            <tr>
              <td class="area-btn" value="chungbuk">
                <b-btn class="areaBtn">충북</b-btn>
              </td>
              <td class="area-btn" value="chungnam">
                <b-btn class="areaBtn">충남</b-btn>
              </td>
            </tr>

            <tr>
              <td class="area-btn" value="gangwon">
                <b-btn class="areaBtn">강원</b-btn>
              </td>
              <td class="area-btn" value="jeju">
                <b-btn class="areaBtn">제주</b-btn>
              </td>
            </tr>
            <tr></tr>
          </table>
        </div>
        <!-- 상세지역 dept 2 -->
        <div class="city-layer seoul">
          <b-form-group>
            <b-form-checkbox-group
              id="seoul"
              value="seoul"
              v-model="selectedArea"
              :options="options"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer jeonbuk">
          <b-form-group>
            <b-form-checkbox-group
              id="jeonbuk"
              value="jeonbuk"
              v-model="selectedArea"
              :options="optionJeonbuk"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer jeonnam">
          <b-form-group>
            <b-form-checkbox-group
              id="jeonnam"
              value="jeonnam"
              v-model="selectedArea"
              :options="optionJeonnam"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer sejong">
          <b-form-group>
            <b-form-checkbox-group
              id="sejong"
              value="sejong"
              v-model="selectedArea"
              :options="optionSejong"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer busan">
          <b-form-group>
            <b-form-checkbox-group
              id="busan"
              value="busan"
              v-model="selectedArea"
              :options="options1"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer daegu">
          <b-form-group>
            <b-form-checkbox-group
              id="daegu"
              value="daegu"
              v-model="selectedArea"
              :options="optionDaegu"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer gyeongnam">
          <b-form-group>
            <b-form-checkbox-group
              id="gyeongnam"
              value="gyeongnam"
              v-model="selectedArea"
              :options="optionGyeongnam"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer gyeonggi">
          <b-form-group>
            <b-form-checkbox-group
              id="gyeonggi"
              value="gyeonggi"
              v-model="selectedArea"
              :options="optionGyeonggi"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer gyeongbuk">
          <b-form-group>
            <b-form-checkbox-group
              id="gyeongbuk"
              value="gyeongbuk"
              v-model="selectedArea"
              :options="optionGyeongbuk"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer incheon">
          <b-form-group>
            <b-form-checkbox-group
              id="incheon"
              value="incheon"
              v-model="selectedArea"
              :options="optionIncheon"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer chungbuk">
          <b-form-group>
            <b-form-checkbox-group
              id="chungbuk"
              value="chungbuk"
              v-model="selectedArea"
              :options="optionChungbuk"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer gwangju">
          <b-form-group>
            <b-form-checkbox-group
              id="gwangju"
              value="gwangju"
              v-model="selectedArea"
              :options="optionGj"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer gangwon">
          <b-form-group>
            <b-form-checkbox-group
              id="gangwon"
              value="gangwon"
              v-model="selectedArea"
              :options="optionGangwon"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>

        <div class="city-layer ulsan">
          <b-form-group>
            <b-form-checkbox-group
              id="ulsan"
              value="ulsan"
              v-model="selectedArea"
              :options="optionUlsan"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer daejeon">
          <b-form-group>
            <b-form-checkbox-group
              id="daejeon"
              value="daejeon"
              v-model="selectedArea"
              :options="optionDaejeon"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer chungnam">
          <b-form-group>
            <b-form-checkbox-group
              id="chungnam"
              value="chungnam"
              v-model="selectedArea"
              :options="optionChungnam"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="city-layer jeju">
          <b-form-group>
            <b-form-checkbox-group
              id="jeju"
              value="jeju"
              v-model="selectedArea"
              :options="optionJeju"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
      </div>
      <!-- 직종 -->
      <div class="job-div">
        <p class="p-4"><b>직종을 선택해주세요</b></p>
        <div class="job-layer p-4">
          <table>
            <tr>
              <td class="job-btn">
                <b-btn class="jobBtn">전체</b-btn>
              </td>
              <td class="job-btn" value="edu">
                <b-btn class="jobBtn">교육</b-btn>
              </td>
            </tr>

            <tr>
              <td class="job-btn" value="comSystem">
                <b-btn class="jobBtn">컴퓨터시스템 </b-btn>
              </td>
              <td class="job-btn" value="security">
                <b-btn class="jobBtn">정보 보안 </b-btn>
              </td>
            </tr>

            <tr>
              <td class="job-btn" value="software">
                <b-btn class="jobBtn">소프트웨어 </b-btn>
              </td>
              <td class="job-btn" value="designer">
                <b-btn class="jobBtn">디자이너 </b-btn>
              </td>
            </tr>

            <tr>
              <td class="job-btn" value="hardware" colspan="2">
                <b-btn class="jobBtn">컴퓨터하드웨어·통신공학 </b-btn>
              </td>
            </tr>
            <tr>
              <td class="job-btn" value="dataNetwork" colspan="2">
                <b-btn class="jobBtn">데이터·네트워크 및 시스템 운영 </b-btn>
              </td>
            </tr>
          </table>
        </div>
        <div class="job-detail-layer edu">
          <b-form-group>
            <b-form-checkbox-group
              id="edu"
              value="edu"
              v-model="selectedJob"
              :options="optionJob"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="job-detail-layer designer">
          <b-form-group>
            <b-form-checkbox-group
              id="designer"
              value="designer"
              v-model="selectedJob"
              :options="optionDesigner"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="job-detail-layer hardware">
          <b-form-group>
            <b-form-checkbox-group
              id="hardware"
              value="hardware"
              v-model="selectedJob"
              :options="optionHardware"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="job-detail-layer software">
          <b-form-group>
            <b-form-checkbox-group
              id="software"
              value="software"
              v-model="selectedJob"
              :options="optionSoftware"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="job-detail-layer comSystem">
          <b-form-group>
            <b-form-checkbox-group
              id="comSystem"
              value="comSystem"
              v-model="selectedJob"
              :options="optionComSystem"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="job-detail-layer dataNetwork">
          <b-form-group>
            <b-form-checkbox-group
              id="dataNetwork"
              value="dataNetwork"
              v-model="selectedJob"
              :options="optionDataNetwork"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="job-detail-layer security">
          <b-form-group>
            <b-form-checkbox-group
              id="security"
              value="security"
              v-model="selectedJob"
              :options="optionSecurity"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import $ from "jquery";

//지역 상세선택
$(document).on("click", ".areaBtn", function() {
  let tem = $(this) //해당 클릭 지역 value값 return
    .parents(".area-btn")
    .attr("value");
  if (
    //클릭햇을때
    $(this)
      .parents(".area-btn") //해당 클릭 버튼의 상위 클래스 값에 on이 있으면
      .hasClass("on")
  ) {
    $(this)
      .parents(".area-btn") //on 지우고
      .removeClass("on");
    $(".city-layer ." + tem).removeClass("on"); //상세지역 dept2 on추가
    //지역 dept2
  } else {
    $(this)
      .parents(".area-btn") //없으면 on 추가
      .addClass("on");
    $("." + tem).addClass("on"); //상세지역 dept2 on추가

    $(".city-layer")
      .not(document.getElementsByClassName(tem))
      .removeClass("on"); //해당 layer 제외 on remove
    $(".areaBtn")
      .not(this)
      .parents(".area-btn") //나머지 버튼 on제거
      .removeClass("on");
  }
});

// 직종 상세선택
$(document).on("click", ".jobBtn", function() {
  let tem = $(this) //해당 클릭 지역 value값 return
    .parents(".job-btn")
    .attr("value");
  if (
    //클릭햇을때
    $(this)
      .parents(".job-btn") //해당 클릭 버튼의 상위 클래스 값에 on이 있으면
      .hasClass("on")
  ) {
    $(this)
      .parents(".job-btn") //on 지우고
      .removeClass("on");
    $(".job-detail-layer ." + tem).removeClass("on"); //상세지역 dept2 on추가
    //지역 dept2
  } else {
    $(this)
      .parents(".job-btn") //없으면 on 추가
      .addClass("on");
    $("." + tem).addClass("on"); //상세지역 dept2 on추가

    $(".job-detail-layer")
      .not(document.getElementsByClassName(tem))
      .removeClass("on"); //해당 layer 제외 on remove
    $(".jobBtn")
      .not(this)
      .parents(".job-btn") //나머지 버튼 on제거
      .removeClass("on");
  }
});

export default {
  data() {
    return {
      selectedJob: [],
      selectedArea: [],
      selectedLocation: null,
      keyword: "",
      optionComSystem: [
        { value: "023", text: "컴퓨터시스템	전체" },
        { value: "132001", text: "IT 컨설턴트" },
        { value: "132002", text: "컴퓨터시스템 설계 및 분석가" },
        { value: "132003", text: "IT 감리 전문가(시스템 감리)" },
      ],
      optionSecurity: [
        { value: "026", text: "정보 보안 전체" },
        { value: "135000", text: "정보보안 전문가" },
        { value: "135001", text: "정보보호 전문가" },
      ],
      optionDataNetwork: [
        { value: "025", text: "데이터·네트워크 및 시스템 운영 전체" },
        { value: "134100", text: "데이터 전문가" },
        { value: "134101", text: "데이터 설계 및 프로그래머" },
        { value: "134102", text: "데이터 분석가(빅데이터 분석가)" },
        { value: "134103", text: "데이터베이스 운영·관리자" },
        { value: "134200", text: "네트워크 시스템 개발자" },
        { value: "134301", text: "정보시스템 운영자" },
        { value: "134302", text: "네트워크 관리자(클라우딩컴퓨터운영관리자)" },
        { value: "134303", text: "IT 기술지원 전문가" },
        { value: "134400", text: "웹 운영자(홈페이지 관리자)" },
        {
          value: "134900",
          text: "디지털 포렌식 전문가 및 기타 데이터·네트워크 전문가",
        },
      ],

      optionSoftware: [
        { value: "024", text: "소프트웨어 전체" },
        { value: "133100", text: "시스템 소프트웨어 개발자" },
        { value: "133101", text: "시스템 소프트웨어 개발자(프로그래머)" },
        { value: "133102", text: "펌웨어 및 임베디드 소프트웨어 프로그래머" },
        { value: "133200", text: "응용 소프트웨어 개발자" },
        { value: "133201", text: "JAVA 프로그래밍 언어 전문가" },
        { value: "133202", text: "C언어 및 그 외 프로그래밍 언어 전문가" },
        {
          value: "133203",
          text: "범용 응용 소프트웨어 프로그래머(ERP,정보처리,재무관리 등)",
        },
        {
          value: "133204",
          text:
            "산업특화 응용 소프트웨어 프로그래머(국방,항공,교통,에너지,금융,자동차 등)",
        },
        { value: "133205", text: "네트워크 프로그래머" },
        { value: "133206", text: "게임 프로그래머" },
        {
          value: "133207",
          text: "모바일 애플리케이션 프로그래머(앱·어플 개발)",
        },
        { value: "133300", text: "웹 개발자" },
        { value: "133301", text: "웹 개발자(웹 엔지니어·웹 프로그래머)" },
        { value: "133302", text: "웹 기획자" },
        { value: "133900", text: "IT 테스터 및 IT QA 전문가" },
      ],
      optionHardware: [
        { value: "022", text: "컴퓨터하드웨어·통신공학 전체" },
        { value: "131100", text: "컴퓨터 하드웨어 기술자 및 연구원" },
        { value: "131200", text: "통신공학 기술자 및 연구원" },
        { value: "131201", text: "통신기기·장비 개발자 및 연구원" },
        { value: "131202", text: "통신기술 개발자 및 통신망 운영 기술자" },
        { value: "131203", text: "통신공사 감리 기술자" },
        { value: "132000", text: "컴퓨터시스템 전문가" },
      ],
      optionDesigner: [
        { value: "056", text: "디자이너 전체" },
        { value: "415500", text: "미디어 콘텐츠 디자이너" },
        { value: "415501", text: "웹 디자이너" },
        { value: "415502", text: "게임 디자이너" },
        { value: "415503", text: "그래픽아트 기술자" },
        { value: "415504", text: "UX/UI 디자이너" },
        { value: "415505", text: "기타 미디어 콘텐츠 디자이너" },
      ],
      optionJob: [
        { value: "214201", text: "컴퓨터 기초 강사" },
        { value: "214200", text: "컴퓨터 강사" },
        { value: "214202", text: "프로그래밍 강사" },
        { value: "214302", text: "디자인·캐드 강사" },

        // 022: 컴퓨터하드웨어, 통신공학 - 백엔드
        // 023: 컴퓨터시스템 - 백엔드
        // 024: 소프트웨어 - 백엔드
        // 025: 데이터 - 백엔드
        // 056, 214302: 디자이너 - 디자인
      ],
      optionJeonbuk: [
        { value: "45000", text: "전북	전체   " },
        { value: "45110", text: "전북 전주시" },
        { value: "45111", text: "전북 전주시 완산구" },
        { value: "45113", text: "전북 전주시 덕진구" },
        { value: "45130", text: "전북 군산시" },
        { value: "45140", text: "전북 익산시" },
        { value: "45180", text: "전북 정읍시" },
        { value: "45190", text: "전북 남원시" },
        { value: "45210", text: "전북 김제시" },
        { value: "45710", text: "전북 완주군" },
        { value: "45720", text: "전북 진안군" },
        { value: "45730", text: "전북 무주군" },
        { value: "45740", text: "전북 장수군" },
        { value: "45750", text: "전북 임실군" },
        { value: "45770", text: "전북 순창군" },
        { value: "45790", text: "전북 고창군" },
        { value: "45800", text: "전북 부안군" },
      ],

      optionJeonnam: [
        { value: "46000", text: "전남 전체" },
        { value: "46110", text: "전남 목포시" },
        { value: "46130", text: "전남 여수시" },
        { value: "46150", text: "전남 순천시" },
        { value: "46170", text: "전남 나주시" },
        { value: "46230", text: "전남 광양시" },
        { value: "46710", text: "전남 담양군" },
        { value: "46720", text: "전남 곡성군" },
        { value: "46730", text: "전남 구례군" },
        { value: "46770", text: "전남 고흥군" },
        { value: "46780", text: "전남 보성군" },
        { value: "46790", text: "전남 화순군" },
        { value: "46800", text: "전남 장흥군" },
        { value: "46810", text: "전남 강진군" },
        { value: "46820", text: "전남 해남군" },
        { value: "46830", text: "전남 영암군" },
        { value: "46840", text: "전남 무안군" },
        { value: "46860", text: "전남 함평군" },
        { value: "46870", text: "전남 영광군" },
        { value: "46880", text: "전남 장성군" },
        { value: "46890", text: "전남 완도군" },
        { value: "46900", text: "전남 진도군" },
        { value: "46910", text: "전남 신안군" },
      ],

      optionGyeongnam: [
        { value: "48000", text: "경남 전체" },
        { value: "48120", text: "경남 창원시" },
        { value: "48121", text: "경남 창원시 의창구" },
        { value: "48123", text: "경남 창원시 성산구" },
        { value: "48125", text: "경남 창원시 마산합포구" },
        { value: "48127", text: "경남 창원시 마산회원구" },
        { value: "48129", text: "경남 창원시 진해구" },
        { value: "48170", text: "경남 진주시" },
        { value: "48220", text: "경남 통영시" },
        { value: "48240", text: "경남 사천시" },
        { value: "48250", text: "경남 김해시" },
        { value: "48270", text: "경남 밀양시" },
        { value: "48310", text: "경남 거제시" },
        { value: "48330", text: "경남 양산시" },
        { value: "48720", text: "경남 의령군" },
        { value: "48730", text: "경남 함안군" },
        { value: "48740", text: "경남 창녕군" },
        { value: "48820", text: "경남 고성군" },
        { value: "48840", text: "경남 남해군" },
        { value: "48850", text: "경남 하동군" },
        { value: "48860", text: "경남 산청군" },
        { value: "48870", text: "경남 함양군" },
        { value: "48880", text: "경남 거창군" },
        { value: "48890", text: "경남 합천군" },
      ],
      optionGyeongbuk: [
        { value: "47000", text: "경북 전체" },
        { value: "47110", text: "경북 포항시" },
        { value: "47111", text: "경북 포항시 남구" },
        { value: "47113", text: "경북 포항시 북구" },
        { value: "47130", text: "경북 경주시" },
        { value: "47150", text: "경북 김천시" },
        { value: "47170", text: "경북 안동시" },
        { value: "47190", text: "경북 구미시" },
        { value: "47210", text: "경북 영주시" },
        { value: "47230", text: "경북 영천시" },
        { value: "47250", text: "경북 상주시" },
        { value: "47280", text: "경북 문경시" },
        { value: "47290", text: "경북 경산시" },
        { value: "47720", text: "경북 군위군" },
        { value: "47730", text: "경북 의성군" },
        { value: "47750", text: "경북 청송군" },
        { value: "47760", text: "경북 영양군" },
        { value: "47770", text: "경북 영덕군" },
        { value: "47820", text: "경북 청도군" },
        { value: "47830", text: "경북 고령군" },
        { value: "47840", text: "경북 성주군" },
        { value: "47850", text: "경북 칠곡군" },
        { value: "47900", text: "경북 예천군" },
        { value: "47920", text: "경북 봉화군" },
        { value: "47930", text: "경북 울진군" },
        { value: "47940", text: "경북 울릉군" },
      ],
      optionChungnam: [
        { value: "44000", text: "충남 전체" },
        { value: "44130", text: "충남 천안시" },
        { value: "44131", text: "충남 천안시 동남구" },
        { value: "44133", text: "충남 천안시 서북구" },
        { value: "44150", text: "충남 공주시" },
        { value: "44180", text: "충남 보령시" },
        { value: "44200", text: "충남 아산시" },
        { value: "44210", text: "충남 서산시" },
        { value: "44230", text: "충남 논산시" },
        { value: "44250", text: "충남 계룡시" },
        { value: "44270", text: "충남 당진시" },
        { value: "44710", text: "충남 금산군" },
        { value: "44760", text: "충남 부여군" },
        { value: "44770", text: "충남 서천군" },
        { value: "44790", text: "충남 청양군" },
        { value: "44800", text: "충남 홍성군" },
        { value: "44810", text: "충남 예산군" },
        { value: "44825", text: "충남 태안군" },
      ],

      optionChungbuk: [
        { value: "43000", text: "충북 전체" },
        { value: "43110", text: "충북 청주시" },
        { value: "43111", text: "충북 청주시 상당구" },
        { value: "43112", text: "충북 청주시 서원구" },
        { value: "43113", text: "충북 청주시 흥덕구" },
        { value: "43114", text: "충북 청주시 청원구" },
        { value: "43130", text: "충북 충주시" },
        { value: "43150", text: "충북 제천시" },
        { value: "43720", text: "충북 보은군" },
        { value: "43730", text: "충북 옥천군" },
        { value: "43740", text: "충북 영동군" },
        { value: "43745", text: "충북 증평군" },
        { value: "43750", text: "충북 진천군" },
        { value: "43760", text: "충북 괴산군" },
        { value: "43770", text: "충북 음성군" },
        { value: "43800", text: "충북 단양군" },
      ],
      optionJeju: [
        { value: "50000", text: "제주 전체" },
        { value: "50110", text: "제주 제주시" },
        { value: "50130", text: "제주 서귀포시" },
      ],

      optionGangwon: [
        { value: "42000", text: "강원	전체" },
        { value: "42110", text: "강원 춘천시" },
        { value: "42130", text: "강원 원주시" },
        { value: "42150", text: "강원 강릉시" },
        { value: "42170", text: "강원 동해시" },
        { value: "42190", text: "강원 태백시" },
        { value: "42210", text: "강원 속초시" },
        { value: "42230", text: "강원 삼척시" },
        { value: "42720", text: "강원 홍천군" },
        { value: "42730", text: "강원 횡성군" },
        { value: "42750", text: "강원 영월군" },
        { value: "42760", text: "강원 평창군" },
        { value: "42770", text: "강원 정선군" },
        { value: "42780", text: "강원 철원군" },
        { value: "42790", text: "강원 화천군" },
        { value: "42800", text: "강원 양구군" },
        { value: "42810", text: "강원 인제군" },
        { value: "42820", text: "강원 고성군" },
        { value: "42830", text: "강원 양양군" },
      ],
      optionUlsan: [
        { value: "31000", text: "울산	전체" },
        { value: "31110", text: "울산 중구" },
        { value: "31140", text: "울산 남구" },
        { value: "31170", text: "울산 동구" },
        { value: "31200", text: "울산 북구" },
        { value: "31710", text: "울산 울주군" },
      ],
      optionDaejeon: [
        { value: "30000", text: "대전 전체" },
        { value: "30110", text: "대전 동구" },
        { value: "30140", text: "대전 중구" },
        { value: "30170", text: "대전 서구" },
        { value: "30200", text: "대전 유성구" },
        { value: "30230", text: "대전 대덕구" },
      ],
      optionGj: [
        { value: "29000", text: "광주	전체" },
        { value: "29110", text: "광주 동구" },
        { value: "29140", text: "광주 서구" },
        { value: "29155", text: "광주 남구" },
        { value: "29170", text: "광주 북구" },
        { value: "29200", text: "광주 광산구" },
      ],
      optionIncheon: [
        { value: "28000", text: "인천 전체" },
        { value: "28110", text: "인천 중구" },
        { value: "28140", text: "인천 동구" },
        { value: "28177", text: "인천 미추홀구" },
        { value: "28185", text: "인천 연수구" },
        { value: "28200", text: "인천 남동구" },
        { value: "28237", text: "인천 부평구" },
        { value: "28245", text: "인천 계양구" },
        { value: "28260", text: "인천 서구" },
        { value: "28710", text: "인천 강화군" },
        { value: "28720", text: "인천 옹진군" },
      ],
      optionSejong: [{ value: "36110", text: "세종" }],
      optionGyeonggi: [
        { value: "41000", text: "경기 전체" },
        { value: "41110", text: "경기 수원시" },
        { value: "41111", text: "경기 수원시 장안구" },
        { value: "41113", text: "경기 수원시 권선구" },
        { value: "41115", text: "경기 수원시 팔달구" },
        { value: "41117", text: "경기 수원시 영통구" },
        { value: "41130", text: "경기 성남시" },
        { value: "41131", text: "경기 성남시 수정구" },
        { value: "41133", text: "경기 성남시 중원구" },
        { value: "41135", text: "경기 성남시 분당구" },
        { value: "41150", text: "경기 의정부시" },
        { value: "41170", text: "경기 안양시" },
        { value: "41171", text: "경기 안양시 만안구" },
        { value: "41173", text: "경기 안양시 동안구" },
        { value: "41190", text: "경기 부천시" },
        { value: "41210", text: "경기 광명시" },
        { value: "41220", text: "경기 평택시" },
        { value: "41250", text: "경기 동두천시" },
        { value: "41270", text: "경기 안산시" },
        { value: "41271", text: "경기 안산시 상록구" },
        { value: "41273", text: "경기 안산시 단원구" },
        { value: "41280", text: "경기 고양시" },
        { value: "41281", text: "경기 고양시 덕양구" },
        { value: "41285", text: "경기 고양시 일산동구" },
        { value: "41287", text: "경기 고양시 일산서구" },
        { value: "41290", text: "경기 과천시" },
        { value: "41310", text: "경기 구리시" },
        { value: "41360", text: "경기 남양주시" },
        { value: "41370", text: "경기 오산시" },
        { value: "41390", text: "경기 시흥시" },
        { value: "41410", text: "경기 군포시" },
        { value: "41430", text: "경기 의왕시" },
        { value: "41450", text: "경기 하남시" },
        { value: "41460", text: "경기 용인시" },
        { value: "41461", text: "경기 용인시 처인구" },
        { value: "41463", text: "경기 용인시 기흥구" },
        { value: "41465", text: "경기 용인시 수지구" },
        { value: "41480", text: "경기 파주시" },
        { value: "41500", text: "경기 이천시" },
        { value: "41550", text: "경기 안성시" },
        { value: "41570", text: "경기 김포시" },
        { value: "41590", text: "경기 화성시" },
        { value: "41610", text: "경기 광주시" },
        { value: "41630", text: "경기 양주시" },
        { value: "41650", text: "경기 포천시" },
        { value: "41670", text: "경기 여주시" },
        { value: "41800", text: "경기 연천군" },
        { value: "41820", text: "경기 가평군" },
        { value: "41830", text: "경기 양평군" },
      ],
      optionDaegu: [
        { value: "27000", text: "대구 전체" },
        { value: "27110", text: "대구 중구" },
        { value: "27140", text: "대구 동구" },
        { value: "27170", text: "대구 서구" },
        { value: "27200", text: "대구 남구" },
        { value: "27230", text: "대구 북구" },
        { value: "27260", text: "대구 수성구" },
        { value: "27290", text: "대구 달서구" },
        { value: "27710", text: "대구 달성군" },
      ],
      options1: [
        { value: "26000", text: "부산 전체" },
        { value: "26110", text: "부산 중구" },
        { value: "26140", text: "부산 서구" },
        { value: "26170", text: "부산 동구" },
        { value: "26200", text: "부산 영도구" },
        { value: "26230", text: "부산 부산진구" },
        { value: "26260", text: "부산 동래구" },
        { value: "26290", text: "부산 남구" },
        { value: "26320", text: "부산 북구" },
        { value: "26350", text: "부산 해운대구" },
        { value: "26380", text: "부산 사하구" },
        { value: "26410", text: "부산 금정구" },
        { value: "26440", text: "부산 강서구" },
        { value: "26470", text: "부산 연제구" },
        { value: "26500", text: "부산 수영구" },
        { value: "26530", text: "부산 사상구" },
        { value: "26710", text: "부산 기장군" },
      ],
      options: [
        { value: "11000", text: "서울 전체" },
        { value: "11110", text: "서울 종로구" },
        { value: "11140", text: "서울 중구" },
        { value: "11170", text: "서울 용산구" },
        { value: "11200", text: "서울 성동구" },
        { value: "11215", text: "서울 광진구" },
        { value: "11230", text: "서울 동대문구" },
        { value: "11260", text: "서울 중랑구" },
        { value: "11290", text: "서울 성북구" },
        { value: "11305", text: "서울 강북구" },
        { value: "11320", text: "서울 도봉구" },
        { value: "11350", text: "서울 노원구" },
        { value: "11380", text: "서울 은평구" },
        { value: "11410", text: "서울 서대문구" },
        { value: "11440", text: "서울 마포구" },
        { value: "11470", text: "서울 양천구" },
        { value: "11500", text: "서울 강서구" },
        { value: "11530", text: "서울 구로구" },
        { value: "11545", text: "서울 금천구" },
        { value: "11560", text: "서울 영등포구" },
        { value: "11590", text: "서울 동작구" },
        { value: "11620", text: "서울 관악구" },
        { value: "11650", text: "서울 서초구" },
        { value: "11680", text: "서울 강남구" },
        { value: "11710", text: "서울 송파구" },
        { value: "11740", text: "서울 강동구" },
      ],
    };
  },
  methods: {
    //지역 dept1
    locationSearch() {
      if ($(".location-div").hasClass("on")) {
        $(".location-div").removeClass("on");
      } else {
        $(".location-div").addClass("on");
        $(".job-div").removeClass("on");
      }
    },

    fieldSearch() {
      if ($(".job-div").hasClass("on")) {
        $(".job-div").removeClass("on");
      } else {
        $(".job-div").addClass("on");
        $(".location-div").removeClass("on");
      }
    },
    //서치바 폼 전송
    jobSearch() {
      //지역 value 값 파싱
      let regionStr = String(Object.values(this.selectedArea));
      if (regionStr.includes(",") != false) {
        regionStr = String(Object.values(this.selectedArea)).replace(
          /,/gi,
          "|"
        );
      }

      //직종 value 파싱
      let jobStr = String(Object.values(this.selectedJob));
      if (jobStr.includes(",") != false) {
        jobStr = String(Object.values(this.selectedJob)).replace(/,/gi, "|");
      }
      const formData = {
        occupation: jobStr,
        keyword: this.keyword,
        region: regionStr,
      };

      if (this.$router.currentRoute.name == "home") {
        this.$router
          .push({
            name: "jobSearchDtl",
            query: formData, //쿼리문으로 전송
          })
          .catch((error) => {
            if (error.name != "NavigationDuplicated") {
              throw error;
            }
          });
      } else {
        this.$router
          .push({
            name: "jobSearchDtl",
            query: formData, //쿼리문으로 전송
          })
          .catch((error) => {
            if (error.name != "NavigationDuplicated") {
              throw error;
            }
          });
        location.reload();
      }
    },
  },
};
</script>

<style scoped>
.banner-content {
  font-family: "Noto Sans KR", sans-serif;
}

.city-layer,
.job-detail-layer {
  margin: 15px;
}
.location-div,
.job-div {
  width: 100%;
  border: 1px solid #424874;
  margin-top: 0px;
  padding-top: 0px;
  display: none;
}
div.prov-layer > table,
div.job-layer > table {
  width: 100%;
}
div.prov-layer > table > tr > td.area-btn,
div.job-layer > table > tr > td.job-btn {
  width: 50%;
}
.area-btn button,
.job-btn button {
  width: 100%;
  background-color: #fff;
  color: black;
  border: none;
}
div.location-div.on > p,
div.job-div.on > p {
  border-bottom: 1px solid #424874;
  margin-bottom: 0px !important;
}
div.location-div.on,
div.job-div.on {
  display: block;
}
.prov-layer,
.job-layer {
  width: 30%;
  border-right: 1px solid #424874;
  display: inline-block;
}
.city-layer,
.job-detail-layer {
  width: 65%;
  display: none;
}
.city-layer.on,
.job-detail-layer.on {
  display: inline-block;
}
.area-btn.on button,
.job-btn.on button {
  background-color: #42487420;
}

div.location-div.on,
div.job-div.on {
  position: absolute;
  left: 0;
  background: #fff;
  z-index: 999;
}
.city-layer.on,
.job-detail-layer.on {
  vertical-align: top;
}

.banner-content .form-wrap {
  border: 3px solid #424874;
}
.banner-content .form-wrap .btn-info {
  background-color: #424874;
  width: 100%;
  height: 100%;
  color: #fff;
  border-radius: 0;
  border: none;
  text-transform: uppercase;
}
.banner-content .form-wrap .form-control {
  height: 40px;
  border-radius: 0;
  font-size: 14px;
}
</style>
