import type { App } from 'vue'

//
import { ElLoading, ElScrollbar } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const plugins = [ElLoading]

const components = [ElScrollbar]

export const setupElementPlus = (app: App<Element>) => {
  plugins.forEach((plugin) => {
    app.use(plugin)
  })

  components.forEach((component) => {
    app.component(component.name, component)
  })

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
