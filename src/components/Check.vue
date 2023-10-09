<script setup>
import { onMounted, ref } from 'vue';

const isCheck = ref(false)

onMounted(() => {
  setTimeout(() => {
    isCheck.value = true;
  }, 4000);
})
</script>

<template>
  <div class="chech-wrapper">
    <div v-if="!isCheck">
      <p class="chech-wrapper__text">Идет проверка ваших данных</p>
      <p class="chech-wrapper__text">Это займет до 30 минут</p>
    </div>
    <div v-else-if="isCheck" class="chech-wrapper__result">
      <p class="chech-wrapper__text">Договор подписан</p>
      <p class="chech-wrapper__text">Ожидайте поступление денежных средств</p>
      <a href="/" class="btn-ok">Ok</a>
    </div>
  </div>
</template>

<style scoped>
.chech-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  min-height: 500px;
}

.chech-wrapper__text {
  text-align: center;
}

.btn-ok {
  display: block;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  border-radius: 25px;
  border: none;
  background: #e63232;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none;
}

.chech-wrapper__result {
  text-align: center;
}
</style>