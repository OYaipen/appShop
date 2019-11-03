import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import jQuery from 'jquery';
import Popper from 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/app.scss';

window.Popper = Popper
window.$ = window.jQuery = jQuery;


//Components
Vue.component('Navbar', require('./components/Navbar.vue').default);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
