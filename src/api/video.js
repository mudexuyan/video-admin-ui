import request from '@/utils/request'

var service_name='videos'

export function getList(token) {
  return request({
    url: '/'+service_name,
    method: 'get',
    params: { token },
  })
}

export function getOne(data,token) {
  return request({
    url: '/'+service_name,
    method: 'get',
    params: { token },
    data
  })
}

