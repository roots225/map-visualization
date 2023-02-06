import { defineStore } from 'pinia'
import { Merchant } from '@/entities/merchant'
import { fetchAllMerchants } from '@/api/merchants'

export interface MerchantState {
  merchants: Merchant[]
}

export const useMerchantStore = defineStore('merchant', {
  state: (): MerchantState => ({
    merchants: []
  }),
  getters: {
    getAllMerchants(): Merchant[] {
      return this.merchants
    }
  },
  actions: {
    async fetchMerchants(): Promise<void> {
      try {
        const response = await fetchAllMerchants()
        this.merchants = response.data.map((item) => Merchant.fromObject(item))
      } finally {
        console.log('failed')
      }
    }
  }
})
