<template>
  <div class="five-letters-view">
    <h3 class="five-letters-view__title">Попробуй угадать слово!</h3>

    <div ref="wordsRef" class="five-letters-view__words">
      <div v-for="(word, index) in russianWords5" :key="index" class="five-letters-view__word">
        {{ word }}
      </div>
    </div>

    <ButtonLink :visible="visibleButton" to="/five-letters" text="Сейчас как угадаю!" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { gsap } from 'gsap'
import ButtonLink from '@/components/ButtonLink.vue'

const wordsRef = ref(null)
const visibleButton = ref(false)

const russianWords5 = [
  'автор',
  'адрес',
  'актер',
  'альфа',
  'апель',
  'арена',
  'армия',
  'афера',
  'балет',
  'банка',
  'бочка',
  'брату',
  'бремя',
  'брюки',
  'буфер',
  'буйно',
  'бурка',
  'бурля',
  'вакса',
  'весло',
  'вещий',
  'вилка',
  'вирус',
  'вклад',
  'влага',
  'время',
  'второ',
  'выход',
  'вышка',
  'газон',
  'гамма',
  'гладь',
  'глазк',
  'гнезо',
  'гобой',
  'город',
  'гость',
  'грави',
  'грома',
  'груша',
  'далия',
  'данно',
  'дерев',
  'десна',
  'джемп',
  'длина',
  'дозац',
  'драга',
  'дрема',
  'дрова',
  'ежель',
  'желез',
  'житель',
  'живот',
  'завод',
  'задор',
  'зайка',
  'земля',
  'зебра',
  'знойк',
  'игрок',
  'идеал',
  'изъян',
  'икона',
  'индик',
  'инейк',
  'искра',
  'камин',
  'канал',
  'капля',
  'карта',
  'кварк',
  'книга',
  'кнопк',
  'кокос',
  'колос',
  'копия',
  'кошка',
  'красн',
  'крикс',
  'настя',
  'крона',
  'кубик',
  'кукла',
  'кумир',
  'лампа',
  'листя',
  'лунац',
  'любов',
  'лыжня',
  'мания',
  'маска',
  'место',
  'молва',
  'морея',
  'мосты',
  'мужик',
  'музыка',
  'мышка',
  'наука',
  'невод',
  'нефть',
  'нивык',
  'ножка',
  'ночка',
  'обеду',
  'овраг',
  'огонь',
  'озеро',
  'окрик',
  'олень',
].sort(() => Math.random() - 0.5)

onMounted(() => {
  const wordElems = wordsRef.value.querySelectorAll('.five-letters-view__word')

  // Анимация вспышки
  let tl = gsap.timeline({ repeat: -1 })

  wordElems.forEach((el) => {
    tl.set(el, { opacity: 1, scale: 1.5 }) // мгновенно показываем слово и чуть увеличиваем
      .to(el, { opacity: 0, scale: 1, duration: 0.075, ease: 'none' }) // мгновенно скрываем
  })

  visibleButton.value = true
})
</script>

<style lang="scss" scoped>
.five-letters-view {
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #ffffff;
  background: #111;
  font-family: sans-serif;

  &__title {
    font-size: 2rem;
    margin: 0;
    text-align: center;
  }

  &__words {
    height: 20px;
    width: 60px;
    position: relative;
  }

  &__word {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 0;
    left: 0;
    opacity: 0;
    color: #ffffff;
    height: 100%;
    font-size: 14px;
  }
}
</style>
