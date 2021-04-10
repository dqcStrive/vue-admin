import service from '@/utils/request'
/**
 * 列表
 */
 export function GetRole(data = {}){
  return service.request({
    method: 'post',
    url: '/role/',
    data
  })
}

/**
 * 添加用户
 */
 export function AddUser(data = {}){
  return service.request({
    method: 'post',
    url: '/user/add/',
    data
  })
}

/**
 * 删除用户
 */
 export function DeleteUser(data){
  return service.request({
    method: 'post',
    url: '/user/delete/',
    data
  })
}


/**
 * 用户启用
 */
 export function UserActives(data){
  return service.request({
    method: 'post',
    url: '/user/actives/',
    data
  })
}

/**
 * 编辑用户
 */
 export function UserEdit(data){
  return service.request({
    method: 'post',
    url: '/user/edit/',
    data
  })
}

/**
 * 编辑用户
 */
 export function GetUserList(data){
  return service.request({
    method: 'post',
    url: '/user/getList/',
    data
  })
}