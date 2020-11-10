<template>
<b-container>
   <div id="PersonHead">
			<input type="hidden" id="hidmainphotoidx" name="hidmainphotoidx" value="">
			<!-- 사진영역 -->
			<div class="photoArea">
				<p class="photo">
					<span class="picture"><img src="//image.alba.kr/person/new_registForm_noPicture_girl.gif" id="resumephoto" alt=""></span>
					<span id="picReigst" style="">
						<a href="https://www.alba.co.kr/person/popup/PicRegistResume.asp" onclick="window.open(this.href, 'popupName1','width=570,height=740,top=0,left=0,status=no,scrollbars=yes,resizable=no'); return false"><span class="photoBtn">사진등록</span></a>
					</span>
					<span class="reg" id="picModify" style="display: none;">
						<a href="https://www.alba.co.kr/person/popup/PicRegistResume.asp" onclick="window.open(this.href, 'popupName','width=570,height=740,top=0,left=0,status=no,scrollbars=yes,resizable=no'); return false"><span class="photoBtn modify">사진변경</span></a>
						<a href="javascript:;" onclick="delMainPhoto();"><span class="photoBtn del" complete="complete">사진삭제</span></a>
					</span>
				</p>
				
				
				
				<div class="album">
					<p><a href="http://www.alba.co.kr/person/resume/MagAlbum.asp"><img src="//image.alba.kr/person/PersonHead_btn_regMod.gif" alt="등록/수정">등록/수정</a></p>
				</div>
			</div>
			<!-- //사진영역 -->

			<!-- 사용자정보 영역 -->
			<ul class="infoList">
				<!-- 이력서 공개중 -->
				
				<li class="topList first resume">
					<p class="title">이력서 등록수 </p>
					<p class="count"><a href="http://www.alba.co.kr/person/resume/MagResume.asp">1</a>개</p>
					<p class="btn">
						
							<a href="http://www.alba.co.kr/person/resume/Regist.asp">새 이력서 작성</a>
						
					</p>
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
						<span class="mobile">010-8411-2188</span>
						<span class="tel" style="display:none;">-</span>
						<div class="mobileCert">
							

						</div>
					</div>
					<div class="mail"><span class="item"><span class="bullet"></span>이메일</span>ttldlguswjd@naver.com</div>
					<div class="address"><span class="item"><span class="bullet"></span>주소</span>서울 강서구 화곡1동</div>
					<p class="btn"><a href="https://sign.alba.co.kr/user/change/UserInfoChange.asp?site=WWW" class="infoModify" target="_blank">개인정보수정</a></p>
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

<style scoped>
li {list-style:none}
#PersonHead {z-index:5;position:relative;width:auto;min-width:1110px; height:356px;padding-left:222px;margin:0 0 8px;border:3px solid #767676}
#PersonHead p.welcome {position:absolute;top:11px;left:22px;color:#fff}
#PersonHead p.welcome span {color:#fffa69}
#PersonHead p.welcome strong {font:bold 14px 'Malgun Gothic';letter-spacing:-1px}
#PersonHead p.welcome a {color:#fff}
#PersonHead .photoArea {z-index:2;position:absolute;left:0;top:0;width:221px;height:100%;border-right:1px solid #bcc3d5;background:url('//image.alba.kr/person/photoArea_bg.gif') repeat}
#PersonHead .photoArea .photo {margin:20px 0 0;text-align:center}
#PersonHead .photoArea .photo .picture {display:block;width:100px;height:120px;padding:9px;margin:0 auto 10px;border:1px solid #ddd;background:#fff}
#PersonHead .photoArea .photo .picture img {width:100px;height:120px}
#PersonHead .photoArea .photoBtn {display:inline-block;height:22px;padding:0 6px;font:11px/22px 'Malgun Gothic';letter-spacing:-1px;border:1px solid #b3b3b1;vertical-align:top;color:#777;background:#fcfcfc}
#PersonHead .photoArea .photoBtn.modify {border:1px solid #505050;color:#fff;background:#666}
#PersonHead .photoArea .photoBtn.del {color:#627289}
#PersonHead .photoArea .album {overflow:hidden;width:120px;margin:24px auto 0}
#PersonHead .photoArea .album ul li {float:left;width:54px;height:35px;margin:0 0 5px 8px;border:1px solid #dbe1ed;background:#fff}

#PersonHead .photoArea .album ul li.title {height:35px;padding:0;font:11px/35px 'Malgun Gothic';text-align:center;letter-spacing:-1px;color:#73889b;background:#f3f6fb}
#PersonHead .photoArea .album ul li img {width:54px;height:35px}
#PersonHead .photoArea .album p {display:none}
#PersonHead .infoList {position:relative;width:101%;height:356px}
#PersonHead .infoList:after {content:'';display:block;clear:both}
#PersonHead .infoList li {position:relative;float:left;width:294.5px;height:98px;padding:20px 0 0;margin:-1px 0 0 -1px;border:1px solid #dcdcdc}
#PersonHead .infoList li.topList {margin-top:0;border-top:0 none}
#PersonHead .infoList li.bottomList {border-bottom:0 none}
#PersonHead .infoList li.first {margin-left:0;border-left:0 none}
#PersonHead .infoList li.last {border-right:0 none}
#PersonHead .infoList li:hover {z-index:2;border-color:#81c6fd;background:#f9faff}
#PersonHead .infoList li:hover .infoComment {border-color:#81c6fd;border-top-color:#f0d387}
#PersonHead .infoList li p {text-align:center}

/* #PersonHead .infoList li p.title {height:13px;margin:0 auto;font:0/0 'Malgun Gothic';} */
#PersonHead .infoList li .count {margin-top:10px;font:bold 18px 'Malgun Gothic';letter-spacing:-1px;color:#757575}
#PersonHead .infoList li .count a {font:bold 20px tahoma;color:#ee6a29;text-decoration:underline}
#PersonHead .infoList li .btn {position:absolute;left:98px}
#PersonHead .infoList li .btn a {display:inline-block;height:22px;padding:0 9px;font:11px/22px 'Malgun Gothic';letter-spacing:-1px;text-decoration:none;border:1px solid #d3d3d3;border-bottom:1px solid #acacac;vertical-align:top;color:#757575;background:#fefefe}
#PersonHead .infoList li .dateChk {margin-top:20px;font:11px 'Malgun Gothic';letter-spacing:-1px}
#PersonHead .infoList li .infoComment {z-index:0;position:absolute;left:-1px;bottom:-1px;width:260px;height:36px;padding:0 10px;border:1px solid #f0d387;line-height:36px;background:#fefde1}
#PersonHead .infoList li .infoComment span {font:11px/36px 'Malgun Gothic';letter-spacing:-1px;color:#757575}
#PersonHead .infoList li .infoComment .closeBtn {position:absolute;right:10px;top:12px;width:11px;height:11px;font:0/0 'Malgun Gothic';color:transparent;background:url('//image.alba.kr/person/personHead.png') no-repeat -231px -47px}
#PersonHead .infoList li.resume .title {width:76px;background-position:0 0}
#PersonHead .infoList li.openState .title {width:87px;background-position:-81px 0}
#PersonHead .infoList li.onlineCount .title {width:76px;background-position:0 -19px}
#PersonHead .infoList li.resumeCompany .title {width:84px;background-position:-81px -19px}
#PersonHead .infoList li.apply .title {width:75px;background-position:0 -37px}
#PersonHead .infoList li.scrap .title {width:88px;background-position:-80px -37px}
#PersonHead .infoList li.customize .title {width:96px;background-position:-81px -56px}
#PersonHead .infoList li.openState .state {position:static;width:auto;margin-top:10px;font:bold 18px 'Malgun Gothic';letter-spacing:-1px;color:#ee6a2c}
#PersonHead .infoList li.openState .state a {color:#ee6a2c}
#PersonHead .infoList li.onlineCount .viewCount {margin-top:20px;font:bold 11px 'Malgun Gothic';letter-spacing:-1px;color:#74899e}
#PersonHead .infoList li.onlineCount .viewCount a {position:relative;top:-1px;font-family:tahoma, 'Malgun Gothic';color:#ec6b29;text-decoration:underline}
#PersonHead .infoList li.userInfomation {width:531px;height:156px;padding:28px 0 0 30px;background:#fcfcfc}
#PersonHead .infoList li.userInfomation>div {position:relative;height:17px;padding-left:75px;margin-top:12px}
#PersonHead .infoList li.userInfomation>div .item {position:absolute;left:0;top:0}
#PersonHead .infoList li.userInfomation>div .item .bullet {position:relative;top:-2px;display:inline-block;width:17px;height:17px;margin-right:6px;background:url('//image.alba.kr/person/personHead.png') no-repeat;vertical-align:top}
#PersonHead .infoList li.userInfomation div.tel {z-index:1;position:relative;margin:0}
#PersonHead .infoList li.userInfomation div.tel .item .bullet {background-position:-225px 0}
#PersonHead .infoList li.userInfomation div.tel .mobile {font-weight:bold}
#PersonHead .infoList li.userInfomation div.tel .mobileCert {position:absolute;right:15px;top:-2px;padding:0}
#PersonHead .infoList li.userInfomation div.tel .mobileCert .htelYes {position:relative;top:-2px;display:inline-block;width:59px;height:20px;font:0/0 'Malgun Gothic';color:transparent;background:url('//image.alba.kr/person/personHead.png') no-repeat -181px -22px;vertical-align:top}
#PersonHead .infoList li.userInfomation div.mail {position:relative}
#PersonHead .infoList li.userInfomation div.mail .item .bullet {background-position:-181px 0}
#PersonHead .infoList li.userInfomation div.address {position:relative}
#PersonHead .infoList li.userInfomation div.address .item .bullet {background-position:-203px 0}
#PersonHead .infoList li.userInfomation .btn {position:absolute;right:15px;bottom:13px;left:auto}
#PersonHead .infoList li .helpText {z-index:5;top:20px;left:-130px;width:280px;background:none}
#PersonHead .infoList li .helpText span {border-bottom:2px solid #676767}

#PersonHead .state {position:absolute;right:-400px;top:0;width:376px}
#PersonHead .state .reg {width:361px;height:38px;padding:0 0 0 15px;background:url('//image.alba.kr/person/PersonHead_count_bg.gif') no-repeat left top}
#PersonHead .state .reg span.count {display:inline-block;padding:6px 0 0 20px;font-weight:bold;letter-spacing:-1px;background:url('//image.alba.kr/person/PersonHead_bul_resume.gif') no-repeat left 11px}
#PersonHead .state .reg span.count a {padding-right:2px;font:bold 18px tahoma;text-decoration:underline;color:#ff4800}
#PersonHead .state .reg span.btn {position:absolute;top:7px;right:7px}
#PersonHead .state .regNo {width:361px;height:106px;padding:5px 0 0 15px;background:url('//image.alba.kr/person/PersonHead_countNo_bg.gif') no-repeat left top}
#PersonHead .state .regNo span.count {display:inline-block;padding:6px 0 0 20px;font-weight:bold;letter-spacing:-1px;background:url('//image.alba.kr/person/PersonHead_bul_resume.gif') no-repeat left 11px}
#PersonHead .state .regNo span.count a {padding-right:2px;font:bold 18px tahoma;text-decoration:underline;color:#ff4800}
#PersonHead .state .regNo span.btn {position:absolute;top:11px;right:15px}
</style>