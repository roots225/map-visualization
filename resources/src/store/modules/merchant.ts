import { defineStore } from 'pinia'
import { Merchant } from '@/entities/merchant'
import { fetchAllMerchants, fetchPaginatedMerchants } from '@/api/merchants'
import { ElNotification } from 'element-plus'
import { isEmpty } from 'lodash-es'

export class PaginatedMerchant {
  currentPage: number | null
  data: Merchant[]
  from: number
  lastPage: number
  perPage: number
  to: number | null
  total: number

  constructor(data) {
    this.currentPage = data.current_page ?? 1
    this.data = (data.data ?? []).map((item) => Merchant.fromObject(item))
    this.from = data.from ?? 1
    this.lastPage = data.last_page ?? 1
    this.perPage = data.per_page ?? 5
    this.to = data.to ?? 1
    this.total = data.total ?? 1
  }

  static fromJson(data: any) {
    return new PaginatedMerchant(data)
  }
}

export interface MerchantState {
  originalData: PaginatedMerchant
  merchants: Merchant[]
}

export const useMerchantStore = defineStore('merchant', {
  state: (): MerchantState => ({
    originalData: PaginatedMerchant.fromJson({}),
    merchants: []
  }),
  getters: {
    getAllMerchants(): Merchant[] {
      return this.merchants
    },
    getOriginalData(): PaginatedMerchant {
      return this.originalData
    },
    getMerchantJsonData(): any {
      return isEmpty(this.merchants) ? {} : { ...this.merchants[0]?.jsonData }
    }
  },
  actions: {
    async fetchMerchants(): Promise<void> {
      try {
        const response = await fetchAllMerchants()
        this.originalData = PaginatedMerchant.fromJson(response.data)
        this.merchants = this.originalData.data
      } catch (error) {
        ElNotification({
          type: 'error',
          title: 'Erreur de chargement des données',
          message: error?.toString()
        })
      }
    },
    async fetchPaginatedMerchants(page: number = 1): Promise<void> {
      try {
        const response = await fetchPaginatedMerchants(page, this.originalData.perPage)
        this.originalData = PaginatedMerchant.fromJson(response.data)
        this.merchants = this.originalData.data
      } catch (error) {
        ElNotification({
          type: 'error',
          title: 'Erreur de chargement des données',
          message: error?.toString()
        })
      }
    },
    async filterPaginatedMerchants(filterOption: any): Promise<void> {
      try {
        const response = await fetchPaginatedMerchants(1, this.originalData.perPage, filterOption)
        this.originalData = PaginatedMerchant.fromJson(response.data)
        this.merchants = this.originalData.data
      } catch (error) {
        ElNotification({
          type: 'error',
          title: 'Erreur de chargement des données',
          message: error?.toString()
        })
      }
    },
    async updatePageSize(size: number = 10): Promise<void> {
      this.originalData.perPage = size
      await this.fetchPaginatedMerchants()
    }
  }
})
