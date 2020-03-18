import Vue from 'vue'
import {
    BootstrapVue,
    IconsPlugin
} from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Bootstrap css files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import Post from './components/post.vue'

Vue.component('post', Post);

Vue.config.productionTip = true

new Vue({
    render: h => h(App),
}).$mount('#app')