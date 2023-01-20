import request from '@/config/axios'

export const fetchAllMerchants = (): Promise<IResponse<any>> => {
  return request.get({ url: '/api/merchants' })
}
