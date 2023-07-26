import httpInstance from "@/utils/http";

// 获取banner图
export function getBannerAPI(params = {}) {
  // 默认为1，商品为2
  const {distributionSite = '1'} = params  //解构赋值，默认为1
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
} 

// 获取首页新鲜好物数据
export function findNewAPI() {
  return httpInstance({
    url: '/home/new'
  })
}

// 获取首页人气推荐数据
export function getHotAPI() {
  return  httpInstance({
    url: 'home/hot'
  })
}

// 获取首页产品列表数据
export const getGoodsAPI = () => {
  return httpInstance({
    url: 'home/goods'
  })
}