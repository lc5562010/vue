// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// // 导入模块
// import mock from './mock/mock';
// // 引用
// Vue.use(mock);

Vue.use(iView);

axios.defaults.baseURL = 'http://219.143.170.98:10011';
Vue.prototype.$http = axios   //其他页面在使用axios的时候直接this.$http就可以了

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
