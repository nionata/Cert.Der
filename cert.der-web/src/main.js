// Imports
import Vue from 'vue'
import {
    BootstrapVue,
    IconsPlugin
} from 'bootstrap-vue'

// Packages
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// require('dotenv').config()

// Bootstrap css files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Component imports
import App          from './App.vue'
import Post         from './components/post.vue'
import Dashboard    from './components/dashboard.vue'

// Make the components usable globally
Vue.component('post', Post);
Vue.component('dashboard', Dashboard)

// Don't show the vue production tip
Vue.config.productionTip = false

// Actually make the Vue app
new Vue({
    render: h => h(App),
}).$mount('#app')
