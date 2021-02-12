import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/axios'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import './assets/css/style.less'
import plugins from "./plugins/libiary/public"

Vue.use(antd);
Vue.use(plugins);
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
