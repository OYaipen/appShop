import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router.js'
import store from './store'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/app.scss';

window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('bootstrap');


//Components
Vue.component('Navbar', require('./components/Navbar.vue').default);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
