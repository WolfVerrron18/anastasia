<template>
  <div class="end-view">
    <h3 class="end-view__title">Ух ты ж сыщик!</h3>

    <span ref="rowPraiseRef" class="end-view__description"></span>
    <span ref="rowConfessionRef" class="end-view__description"></span>
    <span ref="rowLoveRef" class="end-view__description"></span>
    <span ref="rowTAntoshkinsRef" class="end-view__description"></span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { gsap } from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
gsap.registerPlugin(TextPlugin)

const rowPraiseRef = ref(null)
const rowConfessionRef = ref(null)
const rowLoveRef = ref(null)
const rowTAntoshkinsRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    ease: 'none',
  })

  // стартовое состояние
  tl.to(rowPraiseRef.value, {
    duration: 4,
    text:
      '      Какая ты у меня умничка, что дошла до этого шага, я очень тобой горжусь и горжусь тем фактом,' +
      '      что могу называть тебя своей девушкой.',
  })
    .to(rowConfessionRef.value, {
      duration: 4,
      text:
        'Я очень счастлив встретить с' +
        '      тобой эту дату, у нас бывает не всё так гладко, как хотелось бы, но мы стараемся найти выход' +
        '      из любого кризиса!',
    })
    .to(rowLoveRef.value, {
      duration: 2,
      text: 'Я тебя сильно люблю и постоянно по тебе скучаю!',
    })
    .to(rowTAntoshkinsRef.value, {
      duration: 2,
      text: 'Как неожиданно, что антошкины замешаны в этом...',
    })
})
</script>

<style scoped lang="scss">
.end-view {
  background: #111;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
  gap: 16px;

  &__title {
    position: relative;
    margin: 0;
  }

  &__description {
    text-align: center;
  }
}
</style>
