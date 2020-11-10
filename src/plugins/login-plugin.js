//register 오류 메세지 한국어로 변환
import VeeValidate, { Validator } from "vee-validate";
import KoreanValidate from "vee-validate/dist/locale/ko";
Validator.localize("ko", KoreanValidate);




export default {
  head: {
    script: [
      { src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js' }
    ]
  },
  install(Vue) {
    Vue.use(VeeValidate, { locale: KoreanValidate });
  }
};
