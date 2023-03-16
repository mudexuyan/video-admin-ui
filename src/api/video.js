import request from '@/utils/request'

var service_name='videos'

export function getAllVideos(token) {
  return request({
    url: '/'+service_name,
    method: 'get',
    params: { token },
  })
}

export function getOneVideo(data,token) {
  return request({
    url: '/'+service_name,
    method: 'get',
    params: { token },
    data
  })
}

export function editVideo(id,data,token) {
    return request({
      url:  `/${service_name}/${id}`,
      method: 'patch',
      params: { token },
      data
    })
  }
export function model(data,token) {
    return request({
      url:  `/${service_name}/model`,
      method: 'post',
      params: { token },
      data
    })
  }
