import { defineStore } from 'pinia'
import { store } from '../index'
import en from 'element-plus/es/locale/lang/en'
import fr from 'element-plus/es/locale/lang/fr'
import { useCache } from '@/hooks/web/useCache'
import { LocaleDropdownType } from '@/types/localeDropdown'

const { wsCache } = useCache()

const elLocaleMap = {
  en: en,
  fr
}
interface LocaleState {
  currentLocale: LocaleDropdownType
  localeMap: LocaleDropdownType[]
}

export const useLocaleStore = defineStore('locales', {
  state: (): LocaleState => {
    return {
      currentLocale: {
        lang: wsCache.get('lang') || 'fr',
        elLocale: elLocaleMap[wsCache.get('lang') || 'fr']
      },
      // 多语言
      localeMap: [
        {
          lang: 'en',
          name: 'English'
        },
        {
          lang: 'fr',
          name: 'Français'
        }
      ]
    }
  },
  getters: {
    getCurrentLocale(): LocaleDropdownType {
      return this.currentLocale
    },
    getLocaleMap(): LocaleDropdownType[] {
      return this.localeMap
    }
  },
  actions: {
    setCurrentLocale(localeMap: LocaleDropdownType) {
      // this.locale = Object.assign(this.locale, localeMap)
      this.currentLocale.lang = localeMap?.lang
      this.currentLocale.elLocale = elLocaleMap[localeMap?.lang]
      wsCache.set('lang', localeMap?.lang)
    }
  }
})

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store)
}
