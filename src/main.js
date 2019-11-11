import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router.js";
import jQuery from "jquery";
import Swal from "sweetalert2";
import { fb } from "./firebase";
import VueFirestore from "vue-firestore";
require("firebase/firestore");
Vue.use(VueFirestore, {
  key: "id",
  enumerable: true
});

fb.analytics();
Vue.use(VueFirestore);

import Vue2Filters from "vue2-filters";
Vue.use(Vue2Filters);
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/app.scss";

window.Popper = require("popper.js").default;
window.$ = window.jQuery = jQuery;
window.Swal = window.Swal = Swal;
require("bootstrap");
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});
window.Toast = window.Toast = Toast;
import store from "./store.js";

Vue.component("Navbar", require("./components/Navbar.vue").default);
Vue.component("add-to-cart", require("./components/AddToCart.vue").default);
Vue.component("mini-cart", require("./components/MiniCart.vue").default);
Vue.component("products-list", require("./sections/ProductList.vue").default);

import VueCarousel from "vue-carousel";
Vue.use(VueCarousel);

Vue.config.productionTip = false;
let app = "";
fb.auth().onAuthStateChanged(function() {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
