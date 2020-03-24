// Imports
import Vue from 'vue'
import {
    BootstrapVue,
    IconsPlugin
} from 'bootstrap-vue'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.withCredentials = true

// Packages
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
require('dotenv').config()

// Bootstrap css files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Component imports
import App          from './App.vue'
import Post         from './components/post.vue'
import Dashboard    from './components/dashboard.vue'
import Banner       from './components/banner.vue'
import User         from './components/user.vue'

// Make the components usable globally
Vue.component('post', Post)
Vue.component('dashboard', Dashboard)
Vue.component('banner', Banner)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('user', User)

// Don't show the vue production tip
Vue.config.productionTip = false

// Actually make the Vue app
new Vue({
    render: h => h(App),
}).$mount('#app')
