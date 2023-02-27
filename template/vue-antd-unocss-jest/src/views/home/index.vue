<script lang="ts" setup name="home">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const count = ref(0)
</script>

<template>
  <div class="card">
    <a-button type="button" size="large" @click="count++">
      count is {{ count }}
    </a-button>
  </div>
  <a-button type="primary" @click="router.push('/hello')">
    click to hello page
  </a-button>
</template>

<style scoped lang="scss">
.card {
  margin: 10px 0;
}
</style>
