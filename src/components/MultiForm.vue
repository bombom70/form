<script setup>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { computed, reactive, ref, watch } from 'vue';

const stepsTitle = ['Личные данные', 'Паспорт', 'Подтверждение', 'Подписание договора'];
const maxStep = 4;
const doRequest = ref(true);
const route = useRoute();
const router = useRouter();
const stateForm1 = reactive({
  "lastName": "",
  "firstName": "",
  "secondName": "",
  "date": "",
  "country": "",
  "mail": "",
});

const stateForm2 = reactive({
  "pasport": "",
});

watch(
  () => stateForm1,
  () => doRequest.value = true,
  { deep: true }
);

watch(
  () => stateForm2,
  () => doRequest.value = true,
  { deep: true }
);

const step = computed(() => {
  return route.params.id;
});

const submit = async ({ target }) => {
  try {
    if (!doRequest.value) {
      toNext();
      // router.push({name: 'step', params: { id: `${+step.value + 1}` }});
      return ;
    }
    const data = new FormData(target);
    const { status } = await axios.post(`http://localhost:3001/step${step.value}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 12345'
      }
    });
    doRequest.value = false;
    if (status === 201) {
      toNext();
      // router.push({name: 'step', params: { id: `${+step.value + 1}` }});
    }
  } catch(e) {
    alert('Что-то пошло не так')
  }
}

const toBack = () => {
  if (step.value < 2) {
    return ;
  }
  router.push({name: 'step', params: { id: `${+step.value - 1}` }});
}

const toNext = () => {
  router.push({name: 'step', params: { id: `${+step.value + 1}` }});
}
</script>

<template>
  <div class="form-wrapper">
    <div v-if="+step <= maxStep" class="form-wrapper__header">
      <div class="form-wrapper__header_top">
        <RouterLink class="btn-back" to="/" @click="toBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6.06651 2.10552C5.86342 2.30867 5.74933 2.58417 5.74933 2.87143C5.74933 3.15869 5.86342 3.43419 6.06651 3.63735L11.429 8.99985L6.06651 14.3623C5.86917 14.5667 5.75998 14.8403 5.76245 15.1244C5.76491 15.4084 5.87885 15.6801 6.07971 15.881C6.28057 16.0818 6.55228 16.1958 6.83633 16.1982C7.12037 16.2007 7.39402 16.0915 7.59834 15.8942L13.7268 9.76576C13.9299 9.56261 14.0439 9.28711 14.0439 8.99985C14.0439 8.71259 13.9299 8.43709 13.7268 8.23393L7.59834 2.10552C7.39519 1.90242 7.11969 1.78833 6.83243 1.78833C6.54517 1.78833 6.26967 1.90242 6.06651 2.10552Z" fill="#e63232"/>
          </svg>
        </RouterLink>
        <h1 class="form-wrapper__title">{{ stepsTitle[+step - 1] }}</h1>
      </div>
      <div class="form-wrapper__header_nav">
        <span>шаг {{ step }} из {{ maxStep }}</span>
        <span v-if="+step < maxStep">Следующий шаг: {{ stepsTitle[step] }} </span>
        <span v-else>Подписать договор</span>
      </div>
    </div>
    <form class="form-wrapper__form" v-if="step === '1'" @submit.prevent="submit">
      <input 
        class="form-wrapper__input" 
        name="lastName" 
        type="text" 
        placeholder="Фамилия*" 
        required 
        v-model="stateForm1.lastName"
      >
      <input 
        class="form-wrapper__input" 
        name="firstName" 
        type="text" 
        placeholder="Имя*" 
        required 
        v-model="stateForm1.firstName"
      >
      <input 
        class="form-wrapper__input" 
        name="secondName" 
        type="text" 
        placeholder="Отчество*" 
        required 
        v-model="stateForm1.secondName"
      >
      <input 
        class="form-wrapper__input" 
        name="date" type="date" 
        placeholder="Дата рождения*" 
        required 
        v-model="stateForm1.date"
      >
      <input 
        class="form-wrapper__input"
        name="country"
        type="text"
        placeholder="Страна места рождения*"
        required
        v-model="stateForm1.country"
      >
      <input 
        class="form-wrapper__input"
        name="mail"
        type="text"
        placeholder="E-mail"
        required
        v-model="stateForm1.mail"
      >
      <div>
        <label for="confirm">
          Даю согласие на <a href="#">обработку личных данных</a> и подписание документов в электронном виде
        </label>
        <input class="form-wrapper__input" type="checkbox" id="confirm" name="confirm" required/>
      </div>
      <button class="btn" type="submit">Продолжить</button>
    </form>
    <form class="form-wrapper__form" v-else-if="step === '2'" @submit.prevent="submit">
      <input
        class="form-wrapper__input w-100"
        name="pasport"
        type="text"
        placeholder="Серия и номер паспорта*"
        required
        v-model="stateForm2.pasport"
      >
      <button class="btn" type="submit">Продолжить</button>
    </form>
    <form v-else-if="step === '3'" @submit.prevent="submit">
      <div class="price-wrapper">
        <div class="price-wrapper__item">
          <span>Сумма займа:</span>
          <span>23 000Р</span>
        </div>
        <div class="price-wrapper__item">
          <span>Дата возврата:</span>
          <span>23 000Р</span>
        </div>
        <div class="price-wrapper__item">
          <span>Плата займа:</span>
          <span>23 000Р</span>
        </div>
        <div class="price-wrapper__item">
          <span>Ставка:</span>
          <span>0.9%</span>
        </div>
        <div class="price-wrapper__item">
          <span>Сумма займа:</span>
          <span>23 000Р</span>
        </div>
      </div>
      <div class="links">
        <a href="#">Проект сертификата дистанционной Помощи</a>
        <a href="#">Проект</a>
        <a href="#">Проект</a>
      </div>
      <button class="btn" type="submit">Подписать договор</button>
    </form>
    <form class="form-code" v-else-if="step === '4'" @submit.prevent="submit">
      <h1>Подтверждение удаленной идентификации</h1>
      <p>Мы отправили SMS с кодом на ваш номер телефона</p>
      <div class="form-code__input-wrapper">
        <label for="code">Код</label>
        <input class="form-wrapper__input w-100" name="code" type="text" placeholder="Введите код из смс*" id="code" required>
      </div>
      <button class="btn" type="submit">Проверить код</button>
    </form>
    <div
      class="chech-wrapper"
      v-if="+step > maxStep"
    >
      <p class="chech-wrapper__text">Идет проверка ваших данных</p>
      <p class="chech-wrapper__text">Это займет до 30 минут</p>
    </div>
  </div>
</template>

<style scoped>

.form-wrapper {
  max-width: 768px;
  padding: 20px;
  margin: 0 auto;
  background: white;
  color: black;
  border-radius: 3px;
  box-sizing: border-box;
}

.form-wrapper__header_top {
  display: flex;
  align-items: center;
  text-align: center;
}

.form-wrapper__title {
  margin: 0 auto;;
}

.form-wrapper__header_nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.form-wrapper__form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 20px;
}

.form-wrapper__input {
  flex: 1 1 277px;
  padding: 16px;
  border: 1px solid #e3dddd;
  border-radius: 4px;
}

.btn {
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
}

.w-100 {
  width: 100%;
}

.price-wrapper__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
}

.btn-back {
  transform: rotate(180deg);
  cursor: pointer;
}

.form-code {
  text-align: center;
}

.form-code__input-wrapper {
  margin-bottom: 40px;
  text-align: start;
}

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
</style>