<template>
  <div class="start-view">
    <h3 class="start-view__title">Привет!</h3>

    <div ref="descriptionRef" class="start-view__description"></div>

    <ButtonLink :visible="visibleButton" to="/six-mounts" text="Поехали" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { gsap } from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
gsap.registerPlugin(TextPlugin)

import ButtonLink from '@/components/ButtonLink.vue'

const descriptionRef = ref(null)

const visibleButton = ref(false)

onMounted(() => {
  // стартовое состояние
  gsap.to(descriptionRef.value, {
    duration: 3,
    text:
      'Я подготовил для тебя зашифрованное послание и серию мини игр, пройдя которые ты сможешь его\n' +
      'расшифровать, удачи!',
    ease: 'none',
    onComplete: () => {
      visibleButton.value = true
    },
  })
})
</script>

<style scoped lang="scss">
.start-view {
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
