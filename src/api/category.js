import request from '@/utils/request'

var service_name='categories'

export function getList(token) {
  return request({
    url: '/'+service_name,
    method: 'get',
    params: { token },
  })
}

export function getOne(id) {
  return request({
    url: '/'+service_name+'/'+id,
    method: 'get',
  })
}

export function add(data,token) {
  return request({
    url: '/'+service_name,
    method: 'post',
    params: { token },
    data
  })
}

export function edit(id,data,token) {
  return request({
    url:  `/${service_name}/${id}`,
    method: 'patch',
    params: { token },
    data
  })
}

export function del(id,token) {
  return request({
    url: `/${service_name}/${id}`,
    method: 'delete',
    params: { token },
  })
}