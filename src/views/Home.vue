<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  router.push({name: 'step', params: { id: '1' }});
});
</script>
<template>
</template>