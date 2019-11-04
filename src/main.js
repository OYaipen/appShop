import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router.js'
import { fb } from './firebase'
import VueFirestore from 'vue-firestore'
require('firebase/firestore')


Vue.use(VueFirestore)

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/app.scss';

window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('bootstrap');


//Components
Vue.component('Navbar', require('./components/Navbar.vue').default);

let app = '';
fb.auth().onAuthStateChanged(function (user) {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
    console.log(user)
  }
});