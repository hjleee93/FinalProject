<!-- 관리자 마이페이지 -->
<template>
<b-container>
	<div class="header-body text-center">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">ADMIN PAGE</h1>
            </b-col>
          </b-row>
        </div>
	
   <div id="PersonHead">
			<input type="hidden" id="hidmainphotoidx" name="hidmainphotoidx" value="">
			<!-- 사진영역 -->
			<div class="photoArea">
				
				<p class="name font-weight-bold">{{userData.memberName }}님</p>
			</div>
			
			<!-- //사진영역 -->

			<!-- 사용자정보 영역 -->
			<ul class="infoList">
				<!-- 이력서 공개중 -->
				
				<li class="topList first resume">
					<p class="title">이력서 등록수 </p>
					<p class="count"><a href="http://www.alba.co.kr/person/resume/MagResume.asp">1</a>개</p>
				</li>
				<li class="topList openState">
					<p class="title">참여한 프로젝트수</p>
					<p class="count"><a href="http://www.alba.co.kr/person/resume/MagResume.asp">0</a>개</p>
					
				</li>
			
				

				<li class="topList last onlineCount">
					<p class="title">내가 한 질문 </p>
					<p class="count"><a href="http://www.alba.co.kr/person/online/ApplicationList.asp">0</a>건</p>
					
				</li>
				<li class="first resumeCompany">
					<p class="title">등록된 포트폴리오 </p>
					<p class="count"><a href="http://www.alba.co.kr/person/resumeread/CompanyList.asp">0</a>건</p>
					
				</li>
				<li class="apply">
					<p class="title">질문</p>
					<p class="count"><a href="http://www.alba.co.kr/person/resumeread/CompanyList.asp?resumepage=3">0</a>건</p>
					
				</li>
				<li class="last scrap">
					<p class="title">내가 쓴 글</p>
					<p class="count"><a href="http://www.alba.co.kr/person/scrap/ScrapList.asp">0</a>건</p>
				</li>

				<li class="first bottomList userInfomation">
					<div class="tel">
						<span class="item"><span class="bullet"></span>연락처</span>
						<span class="mobile">{{userData.memberPhone}}</span>
						<span class="tel" style="display:none;">-</span>
						<div class="mobileCert">
							

						</div>
					</div>
					<div class="mail"><span class="item"><span class="bullet"></span>이메일</span><b>{{userData.memberEmail}}</b></div>
					<div class="address"><span class="item"><span class="bullet"></span>주소</span><b>{{userData.memberAddr}} {{userData.memberAddrDtl}}</b></div>
					<b-btn class="chg-info" href="/chgMemberInfo">개인정보수정</b-btn>
				</li>
				<li class="last bottomList customize">
					
				</li>
			</ul>
			<div>
  
		</div>
      
</div>

</b-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("memberStore");

export default {
	computed:{
		...mapState(['userData'])
	}
}
</script>



<style scoped>
@import '../../assets/css/myPage.css';

</style>