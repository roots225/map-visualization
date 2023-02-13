import request from '@/config/axios'

export const fetchAllMerchants = (): Promise<IResponse<any>> => {
  return request.get({ url: '/api/merchants' })
}

export const fetchPaginatedMerchants = (
  page: number = 1,
  perPage: number = 15,
  filterOption: any = {}
): Promise<IResponse<any>> => {
  let url = `/api/merchants?page=${page}&per_page=${perPage}`
  if (filterOption) {
    console.log(filterOption)
    for (const item of Object.keys(filterOption)) {
      const value = filterOption[item]
      if (value) {
        url += `&${item}=${value}`
      }
    }
  }
  return request.get({ url })
}

export class MerchantFilterParams {
  constructor(options: any) {
    for (const item of options) {
      this[item] = options.item
    }
  }
}
