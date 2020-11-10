<template>
<!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
 <div class="resume">
    <div class="submenuimage">
        <p class="subtitle">resume</p>
    </div>
    <div>
        <b-nav tabs fill>
            <b-nav-item to="/resume/insertresume">입사지원서 등록</b-nav-item>
            <b-nav-item active to="/resume/resume">입사지원서 보기</b-nav-item>
            <b-nav-item to="/resume/updateresume">입사지원서 수정</b-nav-item>
            <b-nav-item to="/resume/consultresume">입사지원서 컨설팅</b-nav-item>
            <b-nav-item to="/resume/consult">컨설팅 전문가 등록</b-nav-item>
        </b-nav>
    </div>
        <div id="submenu">
            <b-nav pills>
                <b-nav-item active to="/resume/resume">기본 이력서</b-nav-item>
                <b-nav-item to="/resume/BlindResume">블라인드 이력서</b-nav-item>
                <b-nav-item to="/resume/LineResume">라인 이력서</b-nav-item>
                <b-nav-item to="/resume/DesignResume">디자인 이력서</b-nav-item>
            </b-nav>
        </div>
        <div>
            <b-button v-b-modal.modal-xl class="print">인쇄</b-button>
            <b-modal id="modal-xl" size="xl" title="Extra Large Modal">
                <b-container class="bv-example-row">
                    <b-row>
                        <b-col>
                            <form>
                                <table id="resumetable">
                                <div class="resumetitle"><p>개인정보</p></div>
                                    <tr>
                                        <td rowspan="6" class="resumetitle2">이미지파일</td>
                                    </tr>
                                    <tr>
                                        <td><strong>이름</strong></td>
                                        <td><input type="text" placeholder="이름"></td> 
                                        <td><strong>영문</strong></td>
                                        <td><input type="text" placeholder="영문 이름"></td> 
                                    </tr>
                                    <tr>
                                        <td><strong>생년월일</strong></td>
                                        <td><input type="date"></td> 
                                        <td><strong>성별</strong></td> 
                                        <td>
                                            <b-form-group class="gender" inline="true">
                                                <b-form-radio name="gender" value="M">남</b-form-radio>
                                                <b-form-radio name="gender" value="F">여</b-form-radio>
                                            </b-form-group>    
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td rowspan="2"><strong>주소</strong></td>
                                        <td><input type="button" value="우편번호"></td>
                                        <td colspan="2"><input type="text" placeholder="도로명 주소"></td> 
                                    </tr>
                                    <tr>
                                        <td><input type="text" placeholder="상세주소1"></td>
                                        <td colspan="2"><input type="text" placeholder="상세주소2"></td> 
                                    </tr>
                                    <tr>
                                        <td><strong>일반전화</strong></td>
                                        <td><input type="tel"></td> 
                                        <td><strong>휴대전화</strong></td> 
                                        <td><input type="tel"></td> 
                                    </tr>
                                    <tr>
                                        <td class="resumetitle2"><input type="file" value="사진파일 등록"></td>
                                        <td><strong>이메일</strong></td>
                                        <td><input type="text"></td>
                                        <td>@</td>
                                        <td>
                                            <b-form-select>
                                                <b-form-select-option value="naver.com">naver.com</b-form-select-option>
                                                <b-form-select-option value="gmail.com">gmail.com</b-form-select-option>
                                                <b-form-select-option value="daum.net">daum.net</b-form-select-option>
                                                <b-form-select-option value="hanmail.net">hanmail.net</b-form-select-option>
                                                <b-form-select-option value="korea.kr">korea.kr</b-form-select-option>
                                                <b-form-select-option value="nate.com">nate.com</b-form-select-option>
                                                <b-form-select-option value="yahoo.com">yahoo.com</b-form-select-option>
                                            </b-form-select>
                                        </td>
                                    </tr>
                                </table>
                                <table>
                                    <div class="resumetitle" id="education"><p>학력사항</p></div>
                                    <tr>
                                        <td class="school"><strong>학력구분</strong></td>
                                        <td><strong>학교명</strong></td>
                                        <td colspan="2"><strong>기간</strong></td>
                                        <td><strong>전공학과</strong></td>
                                        <td><strong>상태</strong></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b-form-select class="school">
                                                <b-form-select-option value="middlescool">중학교</b-form-select-option>
                                                <b-form-select-option value="highscool">고등학교</b-form-select-option>
                                                <b-form-select-option value="college">대학교(2/3년)</b-form-select-option>
                                                <b-form-select-option value="university">대학교(4년)</b-form-select-option>
                                                <b-form-select-option value="master">대학원(석사)</b-form-select-option>
                                                <b-form-select-option value="doctor">대학원(박사)</b-form-select-option>
                                            </b-form-select>
                                        </td>
                                        <td><input type="text" placeholder="학교명"></td>
                                        <td><input type="date"></td>
                                        <td><input type="date"></td>
                                        <td><input type="text" placeholder="전공선택"></td>
                                        <td>
                                            <b-form-select class="school">
                                                <b-form-select-option value="graduation">졸업</b-form-select-option>
                                                <b-form-select-option value="prograduation">졸업예정</b-form-select-option>
                                                <b-form-select-option value="student">재학</b-form-select-option>
                                                <b-form-select-option value="stopout">휴학</b-form-select-option>
                                                <b-form-select-option value="leaveschool">중퇴</b-form-select-option>
                                                <b-form-select-option value="qualificationExam">검정고시</b-form-select-option>
                                            </b-form-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b-form-select class="school">
                                                <b-form-select-option value="middlescool">중학교</b-form-select-option>
                                                <b-form-select-option value="highscool">고등학교</b-form-select-option>
                                                <b-form-select-option value="college">대학교(2/3년)</b-form-select-option>
                                                <b-form-select-option value="university">대학교(4년)</b-form-select-option>
                                                <b-form-select-option value="master">대학원(석사)</b-form-select-option>
                                                <b-form-select-option value="doctor">대학원(박사)</b-form-select-option>
                                            </b-form-select>
                                        </td>
                                        <td><input type="text" placeholder="학교명"></td>
                                        <td><input type="date"></td>
                                        <td><input type="date"></td>
                                        <td><input type="text" placeholder="전공선택"></td>
                                        <td>
                                            <b-form-select class="school">
                                                <b-form-select-option value="graduation">졸업</b-form-select-option>
                                                <b-form-select-option value="prograduation">졸업예정</b-form-select-option>
                                                <b-form-select-option value="student">재학</b-form-select-option>
                                                <b-form-select-option value="stopout">휴학</b-form-select-option>
                                                <b-form-select-option value="leaveschool">중퇴</b-form-select-option>
                                                <b-form-select-option value="qualificationExam">검정고시</b-form-select-option>
                                            </b-form-select>
                                        </td>
                                    </tr>
                                </table>
                                <table>
                                    <div class="resumetitle"><p>경력사항</p></div>
                                    <tr> 
                                        <td colspan="2"><strong>기간</strong></td>
                                        <td><strong>회사명</strong></td>
                                        <td><strong>직급/직책</strong></td>
                                        <td><strong>상태</strong></td>
                                    </tr>
                                    <tr>
                                        <td><input type="date">~</td>
                                        <td><input type="date"></td>
                                        <td><input type="text"></td>
                                        <td><input type="text"></td>
                                        <td>
                                            <b-form-select class="select">
                                                <b-form-select-option value="resignation">퇴사</b-form-select-option>
                                                <b-form-select-option value="work">재직</b-form-select-option>
                                            </b-form-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">주요직무 및 업무</td>
                                        <td colspan="3">
                                        <b-form-textarea id="textarea" rows="3" max-rows="6"></b-form-textarea>
                                        </td>
                                    </tr>
                                </table>
                                <table>
                                    <div class="resumetitle"><p>자격증</p></div>
                                    <tr>
                                        <td><strong>자격증명</strong></td>
                                        <td><strong>발급기관</strong></td>
                                        <td><strong>취득일</strong></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text"></td>
                                        <td><input type="text"></td>
                                        <td><input type="date"></td>
                                    </tr>
                                </table>
                                <table>
                                    <div class="resumetitle"><p>외국어능력</p></div>
                                    <tr>
                                        <td><strong>외국어</strong></td>
                                        <td><strong>수준</strong></td>
                                        <td><strong>공인시험</strong></td>
                                        <td><strong>점수/등급</strong></td>
                                        <td><strong>응시일</strong></td>
                                    </tr>
                                    <tr>
                                        <td><input type="text"></td>
                                        <td><input type="text"></td>
                                        <td><input type="text"></td>
                                        <td><input type="text"></td>
                                        <td><input type="date"></td>
                                    </tr>
                                </table>
                                <table>
                                    <div class="resumetitle"><p>주요 활동 및 수상</p></div>
                                    <tr>
                                        <td><strong>구분</strong></td>
                                        <td colspan="2"><strong>기간/일자</strong></td>
                                        <td><strong>기관명</strong></td>
                                        <td><strong>내용/내역</strong></td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <b-form-select>
                                                <b-form-select-option value="award">수상경력</b-form-select-option>
                                                <b-form-select-option value="volunteer">봉사활동</b-form-select-option>
                                                <b-form-select-option value="social">사회활동</b-form-select-option>
                                                <b-form-select-option value="intern">인턴</b-form-select-option>
                                                <b-form-select-option value="club">동아리 및 교내활동</b-form-select-option>
                                        </b-form-select>
                                        </td>
                                        <td><input type="date"></td>
                                        <td><input type="date"></td>
                                        <td><input type="text"></td>
                                        <td><input type="text"></td>
                                    </tr>
                                    <tr>
                                        <td><strong>주요 활동 및 성과</strong></td>
                                        <td colspan="4">
                                        <b-form-textarea id="textarea" rows="3" max-rows="6"></b-form-textarea>
                                        </td>
                                    </tr>
                                </table>
                                <table>
                                    <div class="resumetitle"><p>참여 프로젝트</p></div>
                                    <tr>
                                        <td><strong>구분(개인/팀/발주)</strong></td>
                                        <td colspan="2"><strong>기간</strong></td>
                                        <td><strong>프로젝트명</strong></td>
                                        <td><strong>수행업무</strong></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b-form-select class="select_project" >
                                                <b-form-select-option value="person">개인</b-form-select-option>
                                                <b-form-select-option value="team">팀</b-form-select-option>
                                                <b-form-select-option value="order">발주</b-form-select-option>
                                            </b-form-select>
                                        </td>
                                        <td><input type="date"></td>
                                        <td><input type="date"></td>
                                        <td><input type="text"></td>
                                        <td><input type="text"></td>
                                    </tr>
                                    <tr>
                                        <td><strong>주요 업무 및 성과</strong></td>
                                        <td colspan="4">
                                        <b-form-textarea id="textarea" rows="3" max-rows="6"></b-form-textarea>
                                        </td>
                                    </tr>
                                </table>
                                <table>
                                    <div class="resumetitle"><p>해외경험</p></div>
                                    <tr>
                                        <td><strong>구분</strong></td>
                                        <td colspan="2"><strong>기간/일자</strong></td>
                                        <td><strong>국가</strong></td>
                                        <td><strong>기관/경험</strong></td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <b-form-select>
                                                <b-form-select-option value="award">해외연수</b-form-select-option>
                                                <b-form-select-option value="volunteer">해외봉사</b-form-select-option>
                                                <b-form-select-option value="social">해외취업</b-form-select-option>
                                        </b-form-select>
                                        </td>
                                        <td><input type="date"></td>
                                        <td><input type="date"></td>
                                        <td><input type="text"></td>
                                        <td><input type="text"></td>
                                    </tr>
                                    <tr>
                                        <td><strong>주요활동</strong></td>
                                        <td colspan="4">
                                        <b-form-textarea id="textarea" rows="3" max-rows="6"></b-form-textarea>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                            <b-button type="submit" id="submit" variant="primary">등록</b-button>
                            <b-button type="reset" id="reset" variant="danger">취소</b-button>
                        </b-col>
                    </b-row>
                    </b-container>
            </b-modal>
        </div>
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <form>
                        <table id="resumetable">
                        <div class="resumetitle"><p>개인정보</p></div>
                            <tr>
                                <td rowspan="6" class="resumetitle2">이미지파일</td>
                            </tr>
                            <tr>
                                <td><strong>이름</strong></td>
                                <td><input type="text" placeholder="이름"></td> 
                                <td><strong>영문</strong></td>
                                <td><input type="text" placeholder="영문 이름"></td> 
                            </tr>
                            <tr>
                                <td><strong>생년월일</strong></td>
                                <td><input type="date"></td> 
                                <td><strong>성별</strong></td> 
                                <td>
                                    <b-form-group class="gender" inline="true">
                                        <b-form-radio name="gender" value="M">남</b-form-radio>
                                        <b-form-radio name="gender" value="F">여</b-form-radio>
                                    </b-form-group>    
                                </td> 
                            </tr>
                            <tr>
                                <td rowspan="2"><strong>주소</strong></td>
                                <td><input type="button" value="우편번호"></td>
                                <td colspan="2"><input type="text" placeholder="도로명 주소"></td> 
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="상세주소1"></td>
                                <td colspan="2"><input type="text" placeholder="상세주소2"></td> 
                            </tr>
                            <tr>
                                <td><strong>일반전화</strong></td>
                                <td><input type="tel"></td> 
                                <td><strong>휴대전화</strong></td> 
                                <td><input type="tel"></td> 
                            </tr>
                            <tr>
                                <td class="resumetitle2"><input type="file" value="사진파일 등록"></td>
                                <td><strong>이메일</strong></td>
                                <td><input type="text"></td>
                                <td>@</td>
                                <td>
                                    <b-form-select>
                                        <b-form-select-option value="naver.com">naver.com</b-form-select-option>
                                        <b-form-select-option value="gmail.com">gmail.com</b-form-select-option>
                                        <b-form-select-option value="daum.net">daum.net</b-form-select-option>
                                        <b-form-select-option value="hanmail.net">hanmail.net</b-form-select-option>
                                        <b-form-select-option value="korea.kr">korea.kr</b-form-select-option>
                                        <b-form-select-option value="nate.com">nate.com</b-form-select-option>
                                        <b-form-select-option value="yahoo.com">yahoo.com</b-form-select-option>
                                    </b-form-select>
                                </td>
                            </tr>
                        </table>
                        <table>
                            <div class="resumetitle" id="education"><p>학력사항</p></div>
                            <tr>
                                <td class="school"><strong>학력구분</strong></td>
                                <td><strong>학교명</strong></td>
                                <td colspan="2"><strong>기간</strong></td>
                                <td><strong>전공학과</strong></td>
                                <td><strong>상태</strong></td>
                            </tr>
                            <tr>
                                <td>
                                    <b-form-select class="school">
                                        <b-form-select-option value="middlescool">중학교</b-form-select-option>
                                        <b-form-select-option value="highscool">고등학교</b-form-select-option>
                                        <b-form-select-option value="college">대학교(2/3년)</b-form-select-option>
                                        <b-form-select-option value="university">대학교(4년)</b-form-select-option>
                                        <b-form-select-option value="master">대학원(석사)</b-form-select-option>
                                        <b-form-select-option value="doctor">대학원(박사)</b-form-select-option>
                                    </b-form-select>
                                </td>
                                <td><input type="text" placeholder="학교명"></td>
                                <td><input type="date"></td>
                                <td><input type="date"></td>
                                <td><input type="text" placeholder="전공선택"></td>
                                <td>
                                    <b-form-select class="school">
                                        <b-form-select-option value="graduation">졸업</b-form-select-option>
                                        <b-form-select-option value="prograduation">졸업예정</b-form-select-option>
                                        <b-form-select-option value="student">재학</b-form-select-option>
                                        <b-form-select-option value="stopout">휴학</b-form-select-option>
                                        <b-form-select-option value="leaveschool">중퇴</b-form-select-option>
                                        <b-form-select-option value="qualificationExam">검정고시</b-form-select-option>
                                    </b-form-select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b-form-select class="school">
                                        <b-form-select-option value="middlescool">중학교</b-form-select-option>
                                        <b-form-select-option value="highscool">고등학교</b-form-select-option>
                                        <b-form-select-option value="college">대학교(2/3년)</b-form-select-option>
                                        <b-form-select-option value="university">대학교(4년)</b-form-select-option>
                                        <b-form-select-option value="master">대학원(석사)</b-form-select-option>
                                        <b-form-select-option value="doctor">대학원(박사)</b-form-select-option>
                                    </b-form-select>
                                </td>
                                <td><input type="text" placeholder="학교명"></td>
                                <td><input type="date"></td>
                                <td><input type="date"></td>
                                <td><input type="text" placeholder="전공선택"></td>
                                <td>
                                    <b-form-select class="school">
                                        <b-form-select-option value="graduation">졸업</b-form-select-option>
                                        <b-form-select-option value="prograduation">졸업예정</b-form-select-option>
                                        <b-form-select-option value="student">재학</b-form-select-option>
                                        <b-form-select-option value="stopout">휴학</b-form-select-option>
                                        <b-form-select-option value="leaveschool">중퇴</b-form-select-option>
                                        <b-form-select-option value="qualificationExam">검정고시</b-form-select-option>
                                    </b-form-select>
                                </td>
                            </tr>
                        </table>
                        <table>
                            <div class="resumetitle"><p>경력사항</p></div>
                            <tr> 
                                <td colspan="2"><strong>기간</strong></td>
                                <td><strong>회사명</strong></td>
                                <td><strong>직급/직책</strong></td>
                                <td><strong>상태</strong></td>
                            </tr>
                            <tr>
                                <td><input type="date">~</td>
                                <td><input type="date"></td>
                                <td><input type="text"></td>
                                <td><input type="text"></td>
                                <td>
                                    <b-form-select class="select">
                                        <b-form-select-option value="resignation">퇴사</b-form-select-option>
                                        <b-form-select-option value="work">재직</b-form-select-option>
                                    </b-form-select>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">주요직무 및 업무</td>
                                <td colspan="3">
                                <b-form-textarea id="textarea" rows="3" max-rows="6"></b-form-textarea>
                                </td>
                            </tr>
                        </table>
                        <table>
                            <div class="resumetitle"><p>자격증</p></div>
                            <tr>
                                <td><strong>자격증명</strong></td>
                                <td><strong>발급기관</strong></td>
                                <td><strong>취득일</strong></td>
                            </tr>
                            <tr>
                                <td><input type="text"></td>
                                <td><input type="text"></td>
                                <td><input type="date"></td>
                            </tr>
                        </table>
                        <table>
                            <div class="resumetitle"><p>외국어능력</p></div>
                            <tr>
                                <td><strong>외국어</strong></td>
                                <td><strong>수준</strong></td>
                                <td><strong>공인시험</strong></td>
                                <td><strong>점수/등급</strong></td>
                                <td><strong>응시일</strong></td>
                            </tr>
                            <tr>
                                <td><input type="text"></td>
                                <td><input type="text"></td>
                                <td><input type="text"></td>
                                <td><input type="text"></td>
                                <td><input type="date"></td>
                            </tr>
                        </table>
                        <table>
                            <div class="resumetitle"><p>주요 활동 및 수상</p></div>
                            <tr>
                                <td><strong>구분</strong></td>
                                <td colspan="2"><strong>기간/일자</strong></td>
                                <td><strong>기관명</strong></td>
                                <td><strong>내용/내역</strong></td>
                            </tr>
                            <tr>
                                <td>
                                <b-form-select>
                                        <b-form-select-option value="award">수상경력</b-form-select-option>
                                        <b-form-select-option value="volunteer">봉사활동</b-form-select-option>
                                        <b-form-select-option value="social">사회활동</b-form-select-option>
                                        <b-form-select-option value="intern">인턴</b-form-select-option>
                                        <b-form-select-option value="club">동아리 및 교내활동</b-form-select-option>
                                </b-form-select>
                                </td>
                                <td><input type="date"></td>
                                <td><input type="date"></td>
                                <td><input type="text"></td>
                                <td><input type="text"></td>
                            </tr>
                            <tr>
                                <td><strong>주요 활동 및 성과</strong></td>
                                <td colspan="4">
                                <b-form-textarea id="textarea" rows="3" max-rows="6"></b-form-textarea>
                                </td>
                            </tr>
                        </table>
                        <table>
                            <div class="resumetitle"><p>참여 프로젝트</p></div>
                            <tr>
                                <td><strong>구분(개인/팀/발주)</strong></td>
                                <td colspan="2"><strong>기간</strong></td>
                                <td><strong>프로젝트명</strong></td>
                                <td><strong>수행업무</strong></td>
                            </tr>
                            <tr>
                                <td>
                                    <b-form-select class="select_project" >
                                        <b-form-select-option value="person">개인</b-form-select-option>
                                        <b-form-select-option value="team">팀</b-form-select-option>
                                        <b-form-select-option value="order">발주</b-form-select-option>
                                    </b-form-select>
                                </td>
                                <td><input type="date"></td>
                                <td><input type="date"></td>
                                <td><input type="text"></td>
                                <td><input type="text"></td>
                            </tr>
                            <tr>
                                <td><strong>주요 업무 및 성과</strong></td>
                                <td colspan="4">
                                <b-form-textarea id="textarea" rows="3" max-rows="6"></b-form-textarea>
                                </td>
                            </tr>
                        </table>
                        <table>
                            <div class="resumetitle"><p>해외경험</p></div>
                            <tr>
                                <td><strong>구분</strong></td>
                                <td colspan="2"><strong>기간/일자</strong></td>
                                <td><strong>국가</strong></td>
                                <td><strong>기관/경험</strong></td>
                            </tr>
                            <tr>
                                <td>
                                <b-form-select>
                                        <b-form-select-option value="award">해외연수</b-form-select-option>
                                        <b-form-select-option value="volunteer">해외봉사</b-form-select-option>
                                        <b-form-select-option value="social">해외취업</b-form-select-option>
                                </b-form-select>
                                </td>
                                <td><input type="date"></td>
                                <td><input type="date"></td>
                                <td><input type="text"></td>
                                <td><input type="text"></td>
                            </tr>
                            <tr>
                                <td><strong>주요활동</strong></td>
                                <td colspan="4">
                                <b-form-textarea id="textarea" rows="3" max-rows="6"></b-form-textarea>
                                </td>
                            </tr>
                        </table>
                    </form>
                </b-col>
            </b-row>
            </b-container>
 </div>
</template>
<script>

</script>
<style scoped>
#submenu{
        margin-left: 5%;
        margin-top:20px;
        margin-bottom: 20px;
}
#insertresume{
    display: flex;
    align-content: center;
}

#resumetable{
    table-layout: fixed;
}
.print{
    margin-left: 80%;
}
 tr, td {
    width: 50px;
    border: 2px solid grey;
    margin : 0 auto;
    border-collapse: collapse;
    text-align: center;
 }
.personalTitle{
    width: 50px;
 }
.imagefile{
    width: 50px;
}
.submenuimage{
    width: 100%;
    height:180px;
    background-color:#F4EEFF;
    text-align: center;
    line-height: 180px;
}
.subtitle{
    font-family: 'Masque';
    color:#4e5157 ;
    font-size: 50px;
}

.saveresume{
   margin-left: 80%;
}

.savebtn{
    margin-right: 10px;
}
div .resumetitle{
 width: 250px;
 background-color:#394867;
 font-size:20px; 
 margin-top:30px;
 margin-bottom: 15px;
 margin-left: 20px;
 text-align: center;
 color: #F1F6F9;
 border-radius: 30px;
}
button{
    margin-top:20px;
    margin-bottom: 20px;
}
#submit{
    margin-left: 45%;
    background-color: #424874;
    border-color: #424874;
}
#reset{
    margin-left: 10px;
    background-color: #9BA4B4;
    border-color: #9BA4B4;
}
</style>