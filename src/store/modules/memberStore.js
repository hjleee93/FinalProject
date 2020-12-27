//회원 관련 store
import axios from 'axios'
import router from '../../router';
import Vue from 'vue';

const memberStore = {
    namespaced: true,
    state: {
        userData: [], //로그인한 회원 정보 배열
        scrapStatus: null,
        loginStatus: false,//로그인 성공 여부
        loginError: false,
    },
    mutations: {
        //로그인 성공
        loginSuccess(state, payload) {
            state.loginStatus = true;
            state.loginError = false;
            state.userData = payload;


        },
        //로그인 실패
        loginFalse(state) {

            state.loginStatus = false;
            state.loginError = true;
        }
    },
    actions: {
        login({ commit, dispatch }, loginData) {
            localStorage.clear();
            sessionStorage.clear();

            axios
                .post('http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/login', loginData, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                })
                .then(res => {
                    let token = res.data.token;

                    if (token === undefined) {//로그인 실패 토큰값 없는 경우
                        Vue.swal({ text: "이메일, 비밀번호를 다시 확인해주세요" })
                        commit('loginFalse')


                    } else {//토큰값 있음

                        if (loginData.rememberMe == false) {//rememberMe false인경우
                            //소셜로그인, 일반로그인 세션스토리지
                            sessionStorage.setItem("memberEmail", loginData.memberEmail)
                            sessionStorage.setItem("access_token", token);

                        } else {
                            //remember me: 로컬 스토리지 
                            localStorage.setItem("memberEmail", loginData.memberEmail)
                            localStorage.setItem("access_token", token)//토큰 로컬스토리지에 저장
                        }
                        dispatch("getMemberInfo", loginData)//여기로 넘어가서 commit('loginSuccess')실행함
                        router.push('/');//메인페이지로 이동
                    }

                })
                .catch((error) => console.log(error));



        },
        logout({ commit }) {
            //localStroage 저장 로그아웃
            window.localStorage.clear();
            window.sessionStorage.clear();
            window.sessionStorage.removeItem('vuex');

            // location.reload();
            commit('loginFalse');
            router.go('/');
        },
        deleteMember({ commit }, loginData) {
            axios.post("http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/deleteMember", loginData, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }) //form server 연결
                .then((res) => {
                    if (res.data > 0) {
                        //업데이트 ok
                        Vue.swal({
                            text: "탈퇴가 완료되었습니다. 그동안 ItJobGo를 이용해주셔서 감사합니다.",
                            icon: "success"
                        })
                        sessionStorage.clear();
                        localStorage.clear();
                        commit('loginFalse');
                        router.push('/');//탈퇴 후 경로
                    } else if (res.data == -1) {//비밀번호 틀린경우 

                        Vue.swal({
                            text: "비밀번호가 틀렸습니다. 다시 확인해주세요",
                            icon: "error"
                        });
                    } else {
                        Vue.swal({
                            text: "탈퇴에 실패했습니다. 다시 한 번 시도해주시거나 관리자에게 문의해주세요",
                            icon: "error"
                        });
                    }
                })
                .catch(() => {
                    Vue.swal({
                        text: "탈퇴에 실패했습니다. 관리자에게 문의해주세요",
                        icon: "error"
                    });
                });
        },
        //유저 정보 가져오기
        async getMemberInfo({ commit }) {
            var memberEmail = null;
            var token = null;

            if (localStorage.getItem("memberEmail")) {

                memberEmail = localStorage.getItem("memberEmail")
                token = localStorage.getItem("access_token")

            } else {

                memberEmail = sessionStorage.getItem("memberEmail")
                token = sessionStorage.getItem("access_token")
            }


            let config = {
                //헤더에 토큰값 포함해서 보내기
                headers: {
                    "access-token": token,

                    'Access-Control-Allow-Origin': '*',

                }
            }
            if (token != null || memberEmail != null) {
                //토큰으로 member return  
                await axios.get('http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/getMember?memberEmail=' + memberEmail, config)
                    .then(response => {

                        var userData = {
                            memberSq: response.data.memberSq,
                            memberAddr: response.data.memberAddr,
                            memberAddrDtl: response.data.memberAddrDtl,
                            memberAddrExtra: response.data.memberAddrExtra,
                            memberEmail: response.data.memberEmail,
                            memberLevel: response.data.memberLevel,
                            memberName: response.data.memberName,
                            memberPhone: response.data.memberPhone,
                            memberPostCode: response.data.memberPostCode,
                            memberPosition: response.data.memberPosition,
                            memberToken: response.data.memberToken
                        }

                        commit('loginSuccess', userData)
                    })
                    .catch(() => {

                        commit('loginFalse');
                    })
            } else {

                commit('loginFalse');
            }
        },


    }

}
export default memberStore