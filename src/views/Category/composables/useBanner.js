// 封装Banner轮播图相关的业务代码
import {ref, onMounted} from 'vue'
import { getBannerAPI } from '@/apis/home'

export function useBanner() {
  // 获取分类列表Banner
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI({
      // 传递参数：改为商品对应的2
      distributionSite: '2'
    })
    console.log(res)
    bannerList.value = res.result
  }
  onMounted(() => { getBanner() })

  return {
    bannerList
  }
}