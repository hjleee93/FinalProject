//회원 관련 store
import axios from 'axios'
import router from '../../router';
import Vue from 'vue';

const memberStore = {
    namespaced: true,
    state: {
        userData: [], //로그인한 회원 정보 배열

        loginStatus: false,//로그인 성공 여부
        loginError: false,
    },
    mutations: {
        //로그인 성공
        loginSuccess(state, payload) {
            state.loginStatus = true;
            state.loginError = false;
            state.userData = payload;
            console.log("로그인성공" + payload.memberEmail);

        },
        //로그인 실패
        loginFalse(state) {
            console.log("로그인실패");
            state.loginStatus = false;
            state.loginError = true;
        }
    },
    actions: {
        login({ commit, dispatch }, loginData) {

            axios
                .post('http://localhost:8082/itjobgo/member/login', loginData)
                .then(res => {
                    let token = res.data.token;


                    if (token === undefined) {//로그인 실패 토큰값 없는 경우
                        Vue.swal({ text: "이메일, 비밀번호를 다시 확인해주세요" })
                        console.log("토큰 없: " + loginData.email)
                        commit('loginFalse')


                    } else {//토큰값 있음

                        localStorage.setItem("memberEmail", loginData.memberEmail)
                        localStorage.setItem("access_token", token)//토큰 로컬스토리지에 저장
                        console.log("loginData: " + loginData);
                        dispatch("getMemberInfo", loginData)
                        router.push('/');//메인페이지로 이동


                        // console.log("토큰 있: " + res)
                        // document.cookie = `accessToken=${res.data.token}`;
                        // //cookie를 이렇게 넣는다고..?
                        // axios.defaults.headers.common['x-access-token'] = res.data.token;               

                    }

                })
                .catch((error) => console.log(error));



        },
        logout({ commit }) {
            localStorage.removeItem("memberEmail");
            localStorage.removeItem("access_token");

            Vue.swal({ text: "로그아웃되었습니다." })
            router.push('/');
            commit('loginFalse');
        },
        deleteMember({ commit }, loginData) {
            axios.post("http://localhost:8082/itjobgo/member/deleteMember", loginData) //form server 연결
                .then((res) => {
                    if (res.data > 0) {
                        //업데이트 ok
                        Vue.swal({
                            text: "탈퇴가 완료되었습니다. 그동안 ItJobGo를 이용해주셔서 감사합니다.",
                            icon: "success"
                        })

                        localStorage.removeItem("memberEmail");
                        localStorage.removeItem("access_token");
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
        getMemberInfo({ commit }) {

            let memberEmail = localStorage.getItem("memberEmail")
            let token = localStorage.getItem("access_token")
            console.log("memberEmail: " + memberEmail)
            console.log("token: " + token);
            let config = {
                //헤더에 토큰값 포함해서 보내기
                headers: {
                    "access-token": token
                }
            }
            if (token != null || memberEmail != null) {
                //토큰으로 member return  
                axios
                    .get('http://localhost:8082/itjobgo/member/getMember?memberEmail=' + memberEmail, config)
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
                            memberPostition: response.data.memberPostition
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