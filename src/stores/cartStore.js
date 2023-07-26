// 封装购物车模块
import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI } from "@/apis/cart";
import { delCartAPI } from "@/apis/cart";

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  // 获取最新购物车列表
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  // 定义state -> cartList
  const cartList = ref([])
  // 定义action -> addCart
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      // 登录之后的加入购物车逻辑
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      // 商品添加购物车操作
      /* 
        思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到
        如果找到，则表示添加过；没有找到则没添加过
      */
      const item = cartList.value.find((item) => {
        goods.skuId === item.skuId
        console.log(goods.skuId)
      })

      if (item) {
        // 已添加过 -> count+1
        item.count++
      } else {
        // 没有添加过 -> 直接push
        cartList.value.push(goods)
      }
    }

  }

  // 购物车删除商品操作
  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      updateNewList()
    } else {
      /* 
      思路：1.找到要删除项的下标值 -> splice
           2.使用数组的过滤方法 -> filter
      */
      const idx = cartList.value.findIndex((item) => { skuId === item.skuId })
      cartList.value.splice(idx, 1)
    }

  }

  // 清除购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
    // 通过skuId找到要修改的哪一项，然后把他的selected修改为传过来的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选功能
  const allCheck = (selected) => {
    // 把cartList中的每一项的selected都设置为当前状态的全选框状态
    cartList.value.forEach(item => item.selected = selected)
  }

  // 计算属性
  // 1.总的数量 -> 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2.总价 -> 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))


  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  // 已选择数量 -> 先筛选已选中的，然后相加
  const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0))

  // 已选择商品价钱总和
  const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList
  }
}, {
  // 数据持久化管理：使用pinia-plugin-persistedstate插件实现，自动将数据保存到浏览器中local storage
  persist: true
})



