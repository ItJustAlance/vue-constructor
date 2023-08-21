import { createRouter, createWebHistory } from "vue-router";
// import AppLayout from '@/App.vue';
import store from "@/store";
import { searchFirstRoute } from "@/utils/helpers";

let routes = [
  {
    path: "/",
    //component: AppLayout,
    name: "main",
    redirect: { path: "/programs" },
    // component: () => import("@/pages/Main.vue"),
    meta: {
      //permissionAccess: USER_MENU_PERMS.UPLOADING_REPORTS,
      noProtected: true
      //permissionAccess: true,
    }
    // children: [
    //       {
    //           path: '/constructor',
    //           name: 'constructor',
    //           component: () => import('@/pages/constructor/constructor.vue')
    //       },
    //
    //   ]
  },

  {
    path: "/constructor",
    name: "constructor",
    //redirect: { path: '/forms/list' },
    component: () => import("@/pages/constructor/constructor.vue"),
    meta: {
      //permissionAccess: USER_MENU_PERMS.UPLOADING_REPORTS,
      //permissionAccess: true,
    }
  },
  {
    // для примера, потом удалить
    path: "/constructor2",
    name: "constructor2",
    //redirect: { path: '/forms/list' },
    component: () => import("@/pages/constructor/constructor2.vue"),
    meta: {
      //permissionAccess: USER_MENU_PERMS.UPLOADING_REPORTS,
      permissionAccess: true
    }
  },
  {
    path: "/programs",
    name: "programs",
    //redirect: { path: '/forms/list' },
    component: () => import("@/pages/programs/index"),
    meta: {
      //permissionAccess: USER_MENU_PERMS.UPLOADING_REPORTS,
      //permissionAccess: false,
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/pages/NotFound.vue")
  },
  {
    path: "/auth/login",
    name: "login",
    
    component: () => import("@/pages/auth/Login.vue")
  }
  // {
  //     path: '/auth/access',
  //     name: 'accessDenied',
  //     component: () => import('@/views/pages/auth/Access.vue')
  // },
  // {
  //     path: '/auth/error',
  //     name: 'error',
  //     component: () => import('@/views/pages/auth/Error.vue')
  // }
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

// router.beforeEach(async (to,from,next) => {
//   const token = await localStorage.getItem('token')
//   const isNoAuthRoute = to.meta.permissionAccess;
//   if (!isNoAuthRoute && !token) return next({ name: 'login'})
//   next()
// })

router.beforeResolve(async (to, from, next) => {
  console.log("to", to);

  if (to.name === "login") {
    next();
    return;
  }

  await store.dispatch("auth/getUserBeforeReload");
  const userPermissions = store.getters["auth/userPermissionsObject"];
  const { name: userFirstRouteName } =
    searchFirstRoute(routes, userPermissions) || {};
  const routePermissions = to.meta.permissionAccess;
  if (to.meta.noProtected) {
    next();
    return;
  }

  if (to.name !== "login" && !store.state.auth.isAuth) {
    next({ name: "login" });
    return;
  }

  // if (from.name === 'login' && !store.state.checkedAfterLogin) {
  //   store.commit('general/setCheckedAfterLogin', true)
  //   next({ name: userFirstRouteName })
  //   return
  // }
  if (
    routePermissions &&
    routePermissions.length &&
    routePermissions.every(p => !userPermissions[p])
  ) {
    next({ name: userFirstRouteName });
    return;
  }
  next();
});

export default router;
