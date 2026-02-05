<template>
  <div class="six-months">
    <h2 class="six-months__title">Сколько месяцев мы вместе?</h2>

    <div
      ref="keyboardRef"
      class="six-months__keyboard"
      :class="{ 'six-months__keyboard_overlay': overlay }"
    >
      <div class="six-months-number">
        <div class="six-months-number__wrapper">1</div>
      </div>
      <div class="six-months-number">
        <div class="six-months-number__wrapper">2</div>
      </div>
      <div class="six-months-number">
        <div class="six-months-number__wrapper">3</div>
      </div>
      <div class="six-months-number">
        <div class="six-months-number__wrapper">4</div>
      </div>
      <div class="six-months-number">
        <div class="six-months-number__wrapper">5</div>
      </div>
      <div id="six-number" class="six-months-number" @click="clickFakeSix">
        <div ref="sixNumber" class="six-months-number__wrapper">
          <FakeSix :active-step="clickCount" />
        </div>
      </div>
      <div class="six-months-number">
        <div class="six-months-number__wrapper">7</div>
      </div>
      <div class="six-months-number">
        <div class="six-months-number__wrapper">8</div>
      </div>
      <div class="six-months-number">
        <div class="six-months-number__wrapper">9</div>
      </div>
    </div>

    <div ref="messageRef" class="six-months__message">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <ButtonLink :visible="clickCount >= 5" to="/five-letters-view" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { gsap } from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
import { Flip } from 'gsap/Flip'
gsap.registerPlugin(Flip)
gsap.registerPlugin(TextPlugin)

import FakeSix from '@/components/six/FakeSix.vue'
import ButtonLink from '@/components/ButtonLink.vue'

const keyboardRef = ref(null)
const messageRef = ref(null)
const overlay = ref(false)

const messages = [
  'К этой дате я надеюсь мы придем, а пока возьми поменьше...',
  'Ой, а у кого это здесь лапки, видимо из за них не получилось ️',
  'Это было то, что лучше всего находишь ты',
  'Ура ты угадала! А... это арабское обозначение, попробуем еще раз?',
  'Что здесь делает Ася?!️',
  'Умничка, почти с первого раза, совсем большая стала!',
]

const clickCount = ref(-1)

const sixNumber = ref(null)

const updateMessage = () => {
  overlay.value = true

  const children = Array.from(messageRef.value.children)

  gsap.to(children[clickCount.value], {
    duration: 1,
    text: messages[clickCount.value],
    ease: 'none',
  })

  const items = Array.from(keyboardRef.value.children)
  const state = Flip.getState(items)

  const fromIndex = items.findIndex((el) => el.id === 'six-number')

  items.sort(() => Math.random() - 0.5)

  const toIndex = items.findIndex((el) => el.id === 'six-number')

  if (toIndex === fromIndex) {
    const swapIndex = (toIndex + 1) % items.length
    ;[items[toIndex], items[swapIndex]] = [items[swapIndex], items[toIndex]]
  }

  items.forEach((i) => keyboardRef.value.appendChild(i))

  Flip.from(state, {
    delay: 1,
    duration: 0.25,
    ease: 'power2.inOut',
    stagger: 0.04,
    onComplete: () => (overlay.value = false),
  })
}

const clickFakeSix = () => {
  gsap.to(sixNumber.value, {
    duration: 1,
    background: 'linear-gradient(90deg, #e74c3c, #f1c40f)',
    ease: 'power2.inOut',
    yoyo: true,
    repeat: 1,
  })

  clickCount.value++

  updateMessage()
}
</script>

<style scoped lang="scss">
.six-months {
  display: grid;
  padding: 20px;
  gap: 16px;

  &__title {
    text-align: center;
  }

  &__keyboard {
    display: grid;
    position: relative;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    &_overlay::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      background: transparent;
      cursor: not-allowed;
      width: 100%;
      height: 100%;
    }
  }

  &-number {
    display: flex;
    align-items: center;
    justify-content: center;

    &__wrapper {
      font-size: 40px;
      font-weight: 700;
      border: 1px solid darkgrey;
      padding: 5px 25px;
      border-radius: 50%;

      &:active {
        background: rgba(245, 218, 218, 0.94);
      }
    }
  }

  &__message {
    display: flex;
    flex-direction: column;
  }

  &__button {
    background: #3389ff;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all 0.25s ease-in-out;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      background: #006bff;
    }
  }
}
</style>
