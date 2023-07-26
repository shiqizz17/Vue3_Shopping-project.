import httpInstance from "@/utils/http";

// 会员中心 -> 封装获取订单接口
export const getUserOrder = (params) => {
  return httpInstance({
    url: '/member/order',
    params
  })
}