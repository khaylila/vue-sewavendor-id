import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import Logout from "../views/auth/Logout.vue";
import TermView from "../views/auth/TermView.vue";
import MerchantView from "../views/merchant/MerchantView.vue";
import ItemsView from "../views/item/ItemsView.vue";
import ItemsDetail from "../views/item/ItemsDetail.vue";
import StoreView from "../views/store/StoreView.vue";
import StoreDetail from "../views/store/StoreDetail.vue";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      alreadyLogin: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      alreadyLogin: false,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile/change-password",
    name: "change-password",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/merchant",
    name: "merchant",
    component: MerchantView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/items",
    name: "items",
    component: ItemsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/items/:id",
    name: "itemsDetail",
    component: ItemsDetail,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/term-condition",
    name: "term",
    component: TermView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue");
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
    meta: {
      requiresAuth: true,
    },
    // beforeEnter: (to, from, next) => {
    //   // Hapus cookie 'Authorization' saat logout
    //   Object.keys(Cookies.get()).forEach(function (cookieName) {
    //     var neededAttributes = {
    //       // Here you pass the same attributes that were used when the cookie was created
    //       // and are required when removing the cookie
    //     };
    //     Cookies.remove(cookieName, neededAttributes);
    //     Cookies.remove("Authorization");
    //   });
    //   // Redirect ke halaman lain atau halaman login setelah logout
    //   window.location.reload();
    //   // next("/login"); // Misalnya, redirect ke halaman login setelah logout
    // },
  },
  {
    path: "/store",
    name: "store",
    component: StoreView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/:merchant",
    name: "merchant-detail",
    component: StoreDetail,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/:merchant/:itemSlug",
    name: "store-detail",
    component: StoreDetail,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to check if the user is authenticated
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Check if the user is logged in
    if (sessionStorage.getItem("role") == "customer") {
      if (to.name == "home") {
        next("store");
      } else {
        next();
      }
    } else {
      const token = Cookies.get("Authorization");
      if (token != null) {
        next();
      } else {
        next("/login");
      }
    }
  } else {
    if (
      Cookies.get("Authorization") == null ||
      sessionStorage.getItem("role") == "customer"
    ) {
      if (to.name == "home") {
        next("store");
      } else {
        next();
      }
    }
  }
  next();
});

export default router;
