import {
  createRouter,
  createWebHistory,
  isNavigationFailure,
  NavigationFailureType,
  RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import SessionStorageService from "@/services/sessionStorage";
import { Role } from "@/types";
import AppLayout from "@/components/layout/dashboard/DashboardLayout.vue";
import AuthLayout from "@/components/layout/auth/AuthLayout.vue";
import PasswordLayout from "@/components/layout/password/PasswordLayout.vue";
import SetupLayout from "@/components/layout/password/SetupLayout.vue";
import PaymentLayout from "@/components/layout/dashboard/PaymentLayout.vue";

/*eslint-disable @typescript-eslint/no-explicit-any */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "../views/Dashboard/DashboardIndex.vue"
      ),
    meta: {
      layout: AppLayout,
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/",
    name: "Overview",
    component: () =>
      import(/* webpackChunkName: "overview" */ "../views/auth/AuthView.vue"),
    meta: {
      allowedRoles: [Role.GUEST],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/LoginView.vue"),
    meta: {
      layout: AuthLayout,
      allowedRoles: [Role.GUEST],
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../views/auth/Registration/IndexView.vue"
      ),
    meta: {
      layout: AuthLayout,
      allowedRoles: [Role.GUEST],
    },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () =>
      import(
        /* webpackChunkName: "passwordReset" */ "../views/auth/Password/IndexView.vue"
      ),
    meta: {
      layout: PasswordLayout,
      allowedRoles: [Role.GUEST],
    },
  },
  {
    path: "/get-qoute",
    name: "GetQuote",
    component: () =>
      import(/* webpackChunkName: "getQuote" */ "../views/Quote/GetQuote.vue"),
    meta: {
      layout: AppLayout,
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/start-quote",
    name: "StartQuote",
    component: () =>
      import(
        /* webpackChunkName: "QuoteIndex" */ "../views/Quote/QuoteIndex.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/quote-details",
    name: "QuoteDetails",
    component: () =>
      import(
        /* webpackChunkName: "QuoteDetails" */ "../views/Quotation/QuoteDetails.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/payment-history",
    name: "PaymentHistory",
    component: () =>
      import(
        /* webpackChunkName: "PaymentHistory" */ "../views/Quotation/PaymentHistory.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/repayment-schedule",
    name: "RepaymentSchedule",
    component: () =>
      import(
        /* webpackChunkName: "RepaymentSchedule" */ "../views/Quotation/RepaymentSchedule.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/issues",
    name: "MonitorIssues",
    component: () =>
      import(
        /* webpackChunkName: "MonitorIssues" */ "../views/Issues/MonitorIssues.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/issue-details",
    name: "IssueDetails",
    component: () =>
      import(
        /* webpackChunkName: "MonitorIssues" */ "../views/Issues/IssueDetails.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/post-issue",
    name: "PostIssue",
    component: () =>
      import(
        /* webpackChunkName: "MonitorIssues" */ "../views/Issues/PostIssue.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/installation-details",
    name: "InstallationDetails",
    component: () =>
      import(
        /* webpackChunkName: "InstallationDetails" */ "../views/Installation/InstallationDetails.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/payment",
    name: "Payment",
    component: () =>
      import(
        /* webpackChunkName: "PaymentBreakdown" */ "../views/Payment/PaymentIndex.vue"
      ),
    meta: {
      layout: PaymentLayout,
      allowedRoles: [Role.AUTH],
    },
  },
  //Profile
  {
    path: "/settings",
    name: "ProfileSettings",
    component: () =>
      import(
        /* webpackChunkName: "ProfileSettings" */ "../views/Profile/ProfileSettings.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/edit-profile",
    name: "ProfileEdit",
    component: () =>
      import(
        /* webpackChunkName: "ProfileSettings" */ "../views/Profile/ProfileEdit.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/change-password",
    name: "UpdatePassword",
    component: () =>
      import(
        /* webpackChunkName: "ProfileSettings" */ "../views/Profile/UpdatePassword.vue"
      ),
    meta: {
      allowedRoles: [Role.GUEST],
    },
  },
  {
    path: "/notification-setting",
    name: "ProfileNotification",
    component: () =>
      import(
        /* webpackChunkName: "ProfileSettings" */ "../views/Profile/ProfileNotification.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/payment-method",
    name: "PaymentMethod",
    component: () =>
      import(
        /* webpackChunkName: "ProfileSettings" */ "../views/Profile/PaymentMethod.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/add-payment",
    name: "AddPayment",
    component: () =>
      import(
        /* webpackChunkName: "ProfileSettings" */ "../views/Profile/AddPaymentMethod.vue"
      ),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      allowedRoles: [Role.AUTH],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, _from, failure) => {
  if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
    window.location.reload();
    return;
  }
});

router.beforeEach((to: any, _from, next) => {
  const userObject = SessionStorageService.decodeToken();
  // console.log(userObject);

  if (!to.meta?.allowedRoles) return next();

  if (to.meta.allowedRoles.includes(Role.AUTH)) {
    if (!userObject) {
      // next({ name: "Login" });
      next({ name: "Login", query: { redirect: to.path } });
    } else {
      next();
    }
    return;
  }

  if (to.meta.allowedRoles.includes(Role.GUEST)) {
    if (!userObject) {
      next();
    } else {
      next({ name: "Dashboard" });
    }
    return;
  }
});

export default router;
