// 封装分类数据业务相关的代码
import { getCategoryAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {onBeforeRouteUpdate} from 'vue-router'

export function useCategory() {
  // 获取数据
  const categoryData = ref({})
  // 在组件参数内部获取路由参数id
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(() => { getCategory() })

  // 目标：路由参数变化时，可以把分类数据接口重新发送(解决点击一级导航跳转，展示内容不变的问题)
  onBeforeRouteUpdate((to) => {
    console.log(to)
    // 存在问题：应使用最新的路由参数请求最新的路由数据
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}