<template>

<b-container>
	<div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-black">MY PAGE</h1>
            </b-col>
          </b-row>
        </div>
	
   <div id="PersonHead">
			<input type="hidden" id="hidmainphotoidx" name="hidmainphotoidx" value="">
			<!-- 사진영역 -->
			<div class="photoArea">
				<p class="photo">
					<span class="picture"></span>
					<span id="picReigst" style="">
						<a><span class="photoBtn">사진등록</span></a>
					</span>
					<span class="reg" id="picModify" style="display: none;">
						<a href="https://www.alba.co.kr/person/popup/PicRegistResume.asp" onclick="window.open(this.href, 'popupName','width=570,height=740,top=0,left=0,status=no,scrollbars=yes,resizable=no'); return false"><span class="photoBtn modify">사진변경</span></a>
						<a href="javascript:;" onclick="delMainPhoto();"><span class="photoBtn del" complete="complete">사진삭제</span></a>
					</span>
				</p>
				
				
				
				<div class="album">
					<p><a href="http://www.alba.co.kr/person/resume/MagAlbum.asp"><img src="//image.alba.kr/person/PersonHead_btn_regMod.gif" alt="등록/수정">등록/수정</a></p>
				</div>
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
					<p class="title">참여한 프로젝트 </p>
					<p class="count"><a href="http://www.alba.co.kr/person/resumeread/CompanyList.asp">0</a>건</p>
					
				</li>
				<li class="apply">
					<p class="title">질문</p>
					<p class="count"><a href="http://www.alba.co.kr/person/resumeread/CompanyList.asp?resumepage=3">0</a>건</p>
					
				</li>
				<li class="last scrap">
					<p class="title">스크랩 채용정보</p>
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
  <div>
  <b-tabs content-class="mt-3" >
    <b-tab title="온라인 지원 현황" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>
</div>
</b-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
	computed:{
		...mapState(['userData'])
	}
}
</script>

<style scoped>
@import '../../assets/css/myPage.css';
</style>