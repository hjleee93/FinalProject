<template>
<!-- 주메뉴 : #394867
    서브메뉴 : #F1F6F9
    버튼(확인) : #424874
    버튼(취소) : #9BA4B4 
-->
 <div class="Line_resume">
    <div class="submenuimage">
        <p class="subtitle">resume</p>
    </div>
    <div>
        <v-tabs centered color="grey darken-3">
            <v-tab to="/resume/insertresume">입사지원서 등록</v-tab>
            <v-tab to="/resume/resumeList">입사지원서 보기</v-tab>
            <v-tab to="/resume/updateresume">입사지원서 수정</v-tab>
            <v-tab active to="/resume/consultresume">입사지원서 컨설팅</v-tab>
            <v-tab to="/resume/consult">컨설팅 전문가 등록</v-tab>
            <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
        </v-tabs>
    </div>
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                      <div>
                        <b-card bg-variant="light">
                            <b-form-group
                            label-cols-lg="3"
                            label="컨설팅 전문가 등록"
                            label-size="lg"
                            label-class="font-weight-bold pt-0"
                            class="mb-0"
                            >
                            <b-form-group
                                label-cols-sm="3"
                                label="이름"
                                label-align-sm="right"
                                label-for="nested-street"
                            >
                                <b-form-input id="nested-street"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label-cols-sm="3"
                                label="전문 분야"
                                label-align-sm="right"
                                label-for="nested-city"
                            >
                                <b-form-input id="nested-city"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label-cols-sm="3"
                                label="업무 경력"
                                label-align-sm="right"
                                label-for="nested-state"
                            >
                                <b-form-input id="nested-state"></b-form-input>
                            </b-form-group>

                            <b-form-group
                                label-cols-sm="3"
                                label="수상 경력"
                                label-align-sm="right"
                                label-for="nested-country"
                            >
                                <b-form-input id="nested-country"></b-form-input>
                            </b-form-group>

                            </b-form-group>
                            <b-button type="submit" id="submit" variant="primary">등록</b-button>
                            <b-button type="reset" id="reset" variant="danger">취소</b-button>
                        </b-card>
                        </div>
                </b-col>
            </b-row>
        </b-container>
 </div>
</template>
<script>

</script>
<style scoped>

.bv-example-row{
    margin-top: 30px;
    margin-bottom: 30px;
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
#submit{
    margin-top: 20px;
    margin-left: 45%;
    background-color: #424874;
    border-color: #424874;
}
#reset{
    margin-top: 20px;
    margin-left: 10px;
    background-color: #9BA4B4;
    border-color: #9BA4B4;
}


</style>