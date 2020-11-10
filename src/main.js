import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import Footer from './views/Layout/ContentFooter.vue'
import Header from './components/common/Header.vue'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate' 
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BaseInput from '@/components/Inputs/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import LoginPlugin from './plugins/login-plugin';
import vuetify from './plugins/vuetify';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSession from 'vue-session';
import axios from 'axios';
import store from './store'


Vue.component('Footer', Footer)
Vue.component('Header', Header)
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
Vue.component(BaseInput.name, BaseInput);
Vue.component(BaseButton.name, BaseButton);

Vue.config.productionTip = false
Vue.prototype.$http = axios

//세션관리용
var sessionOptions = {
  persist: true
}
Vue.use(VueSession, sessionOptions)

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(LoginPlugin);

Vue.use(ElementUI);
Vue.use(VeeValidate, { inject: false });

//카카오로그인용 key
window.Kakao.init("9865d6b20cfcf557f7f17640b4431305");
Vue.config.productionTip = false


new Vue({
  router,
  locale: 'ko',
  store,
  render: h => h(App),
  vuetify,
  methods: {
    reload: function() {    
       this.$router.go(this.$router.currentRoute)
    }
  }
}).$mount('#app')
