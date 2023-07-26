import httpInstance from "@/utils/http";

// 一级分类列表--面包屑导航接口 
export function getCategoryAPI(id) {
  return httpInstance({
    url: '/category',
    // params--传参
    params: {
      id
    }
  })
}

// 二级分类列表--面包屑导航接口
export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}

// 二级商品列表
export const getSubCategoryAPI = (data) => {
  return httpInstance({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}