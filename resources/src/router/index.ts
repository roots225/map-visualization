import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: t('router.dashboard'),
      icon: 'mdi-light:view-dashboard',
      alwaysShow: true
    },
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/Dashboard/Analysis.vue'),
        name: 'Analysis',
        meta: {
          title: t('router.analysis'),
          icon: 'ep:house',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    meta: {},
    name: 'MapVisualization',
    children: [
      {
        path: 'index',
        name: 'MapIndex',
        meta: {
          title: t('router.map'),
          icon: 'mdi-light:map-marker'
        },
        component: () => import('@/views/Map/Index.vue')
      }
    ]
  },
  {
    path: '/data-import',
    component: Layout,
    meta: {},
    name: 'DataImportation',
    children: [
      {
        path: 'index',
        name: 'ImportExcelData',
        meta: {
          title: t('router.import'),
          icon: 'ep:upload-filled'
        },
        component: () => import('@/views/Import/Index.vue')
      }
    ]
  },
  {
    path: '/merchants',
    component: Layout,
    meta: {},
    name: 'Merchants',
    children: [
      {
        path: 'index',
        name: 'ListMerchants',
        meta: {
          title: t('router.merchants'),
          icon: 'mdi-light:bank'
        },
        component: () => import('@/views/Merchants/Index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
