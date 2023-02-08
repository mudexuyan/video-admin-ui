import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/tokens',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin-user',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/tokens/'+token,
    method: 'delete'
  })
}
