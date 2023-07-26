<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

// 触发获取导航列表的action
import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getCategory()
})
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 添加key，破坏他的复用机制，强制销毁重建--
    这种方法太过于简单粗暴，容易造成内存浪费，页面中存在不因路由跳转而改变的内容时，不推荐使用
    不考虑性能问题时可以使用key，简单粗暴
  -->
  <!-- <RouterView :key="$route.fullPath"/> -->  
  <RouterView />
  <LayoutFooter />
</template>

<style scoped>

</style>