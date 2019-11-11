import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router.js";
import jQuery from "jquery";
import Swal from "sweetalert2";
import { fb } from "./firebase";
import VueFirestore from "vue-firestore";
require("firebase/firestore");
fb.analytics();
Vue.use(VueFirestore);

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/app.scss";

window.Popper = require("popper.js").default;
window.$ = window.jQuery = jQuery;
window.Swal = Swal;
require("bootstrap");
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;

//Components
Vue.component("Navbar", require("./components/Navbar.vue").default);

let app = "";
fb.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
