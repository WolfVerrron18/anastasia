<script setup lang="ts">
import { gsap } from 'gsap'

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },

  to: {
    type: String,
    default: '/',
  },

  text: { type: String, default: 'Идём дальше' },
})

const onEnter = (el, done) => {
  gsap.to(el, { y: 0, opacity: 1, duration: 0.25, onComplete: done })
}
</script>

<template>
  <Transition @enter="onEnter">
    <router-link v-if="visible" class="button-link" :to="to">{{ text }}</router-link>
  </Transition>
</template>

<style scoped lang="scss">
.button-link {
  opacity: 0;
  background: #3389ff;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.25s ease-in-out;
  text-decoration: none;
  position: relative;
  transform: translateY(25px);
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    background: #006bff;
  }
}
</style>
