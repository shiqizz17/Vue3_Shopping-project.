import httpInstance from "@/utils/http";

// 商品详情接口
export const getDetail = (id) => {
  return httpInstance({
    url: '/goods',
    params: {
      id
    }
  })
}

// 24小时热榜、周热榜接口
export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return httpInstance({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}