import service from "@/utils/request";

/**
 * 列表
 */
 export function GetList(data){
  return service.request({
    method: 'post',
    url: '/news/getList/',
    data
  })
}



/**
 * 新增
 */
 export function AddInfo(data){
  return service.request({
    method: 'post',
    url: '/news/add/',
    data
  })
}

/**
 * 修改
 */
 export function EditInfo(data){
  return service.request({
    method: 'post',
    url: '/news/editInfo/',
    data
  })
}

/**
 * 删除信息
 */
 export function DeleteInfo(data){
  return service.request({
    method: 'post',
    url: '/news/deleteInfo/',
    data
  })
}


/**
 * 编辑
 */
 export function EditCategory(data){
  return service.request({
    method: 'post',
    url: '/news/editCategory/',
    data
  })
}


/**
 * 删除分类
 */
 export function DeleteCategory(data){
  return service.request({
    method: 'post',
    url: '/news/deleteCategory/',
    data
  })
}

/**
 * 添加一级分类
 */
export function AddFirstCategory(data){
  return service.request({
    method: 'post',
    url: '/news/addFirstCategory/',
    data
  })
}
/**
 * 添加子集分类
 */
 export function AddChildrenCategory(data){
  return service.request({
    method: 'post',
    url: '	/news/addChildrenCategory/',
    data
  })
}

/**
 * 获取分类
 */
 export function GetCategory(data){
  return service.request({
    method: 'post',
    url: '/news/getCategoryAll/',
    data
  })
}