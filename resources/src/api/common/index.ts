import request from '@/config/axios'

//
export const getDictApi = (): Promise<IResponse> => {
  return request.get({ url: '/dict/list' })
}

//
export const getDictOneApi = async (): Promise<IResponse> => {
  return request.get({ url: '/dict/one' })
}
