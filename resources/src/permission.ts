import router from './router'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useCache } from '@/hooks/web/useCache'
import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { usePageLoading } from '@/hooks/web/usePageLoading'

const permissionStore = usePermissionStoreWithOut()

const appStore = useAppStoreWithOut()

const { wsCache } = useCache()

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  if (wsCache.get(appStore.getUserInfo)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (permissionStore.getIsAddRouters) {
        next()
        return
      }

      /*
      if (!dictStore.getIsSetDict) {
        const res = await getDictApi()
        if (res) {
          dictStore.setDictObj(res.data)
          dictStore.setIsSetDict(true)
        }
      }*/

      const roleRouters = wsCache.get('roleRouters') || []
      const userInfo = wsCache.get(appStore.getUserInfo)

      if (appStore.getDynamicRouter) {
        userInfo.role === 'admin'
          ? await permissionStore.generateRoutes('admin', roleRouters as AppCustomRouteRecordRaw[])
          : await permissionStore.generateRoutes('test', roleRouters as string[])
      } else {
        await permissionStore.generateRoutes('none')
      }

      permissionStore.getAddRouters.forEach((route) => {
        router.addRoute(route as unknown as RouteRecordRaw)
      })
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath as string)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      permissionStore.setIsAddRouters(true)
      next(nextData)
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach((to) => {
  useTitle(to?.meta?.title as string)
  done()
  loadDone()
})
