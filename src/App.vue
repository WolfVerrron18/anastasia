<script setup>
import gsap from 'gsap'

import { RouterView } from 'vue-router'

const enterAnimation = (el, done) => {
  // стартовое состояние
  gsap.fromTo(
    el,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      onComplete: done,
    },
  )
}

const leaveAnimation = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: -30,
    duration: 0.4,
    ease: 'power3.in',
    onComplete: done,
  })
}
</script>

<template>
  <transition mode="out-in" @enter="enterAnimation" @leave="leaveAnimation">
    <router-view :key="$route.fullPath" />
  </transition>
</template>

<style scoped></style>
