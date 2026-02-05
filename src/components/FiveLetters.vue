<template>
  <div class="five-letters">
    <h2 class="five-letters__title">5 БУКВ</h2>

    <div v-if="messageVisible" ref="messageRef" class="message-row">{{ currentMessage }}</div>

    <div class="five-letters__grid">
      <input
        v-for="(letter, index) in letters"
        ref="inputRefs"
        :value="letter"
        class="five-letters__char"
        maxlength="1"
        :class="inputStyles[index]"
        :disabled="gameOver || Math.floor(index / COLS) !== activeIndex"
        @input="onCharUpdated($event, index)"
        @keydown.enter.prevent="onEnter"
        @keydown.delete.prevent="onBackSpace(index)"
      />
    </div>

    <ButtonLink :visible="gameOver" to="/end" text="Угадала, что же дальше?" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

import { gsap } from 'gsap'
import ButtonLink from '@/components/ButtonLink.vue'

const secretWord = ref('настя')

const inputRefs = ref(null)
const messageRef = ref(null)
const activeIndex = ref(0)

const COLS = 5
const letters = ref(Array(COLS * 6).fill(''))
const gameOver = ref(false)

const messageVisible = ref(false)
const currentMessage = ref('')

const inputStyles = computed(() => {
  const styles = []
  const totalRows = Math.ceil(letters.value.length / COLS)

  for (let row = 0; row < totalRows; row++) {
    const start = row * COLS
    const end = start + COLS
    const currentLetters = letters.value.slice(start, end)

    // Строка активна и игра не закончена — пустой стиль
    if (row === activeIndex.value && !gameOver.value) {
      styles.push(...Array(currentLetters.length).fill(''))
      continue
    }

    const secretLetters = secretWord.value.split('')

    const rowStyles = Array(currentLetters.length).fill('')
    const secretLetterUsed = Array(secretLetters.length).fill(false)

    // 1️⃣ Правильные позиции
    currentLetters.forEach((letter, i) => {
      if (letter === secretLetters[i]) {
        rowStyles[i] = 'five-letters__char_correct'
        secretLetterUsed[i] = true
      }
    })

    // 2️⃣ Правильные буквы, но не на месте
    currentLetters.forEach((letter, i) => {
      if (rowStyles[i]) return

      const idx = secretLetters.findIndex((l, j) => l === letter && !secretLetterUsed[j])
      if (idx !== -1) {
        rowStyles[i] = 'five-letters__char_present'
        secretLetterUsed[idx] = true
      } else {
        rowStyles[i] = 'five-letters__char_absent'
      }
    })

    styles.push(...rowStyles)
  }

  return styles
})

const onCharUpdated = (event, index) => {
  letters.value[index] = event.target.value

  if (letters.value[index] && index < letters.value.length - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus()
    })
  }
}

const onBackSpace = (index) => {
  letters.value[index] = ''

  if (!letters.value[index] && index > 0) {
    nextTick(() => {
      inputRefs.value[index - 1]?.focus()
    })
  }
}

const animateRow = async (row) => {
  await nextTick()

  const start = row * COLS
  const end = start + COLS
  const rowInputs = inputRefs.value.slice(start, end)

  rowInputs.forEach((input, i) => {
    const styleClass = inputStyles.value[start + i]

    if (!styleClass) return

    // добавим классы цвета (CSS) сразу
    input.classList.add(styleClass)

    // Анимация
    if (styleClass === 'five-letters__char_correct') {
      gsap.fromTo(input, { rotateX: 90 }, { rotateX: 0, duration: 0.4, ease: 'back.out(1.7)' })
    } else if (styleClass === 'five-letters__char_present') {
      gsap.fromTo(input, { y: -10 }, { y: 0, duration: 0.3, ease: 'bounce.out' })
    } else if (styleClass === 'five-letters__char_absent') {
      gsap.fromTo(input, { opacity: 0.5 }, { opacity: 1, duration: 0.3 })
    }
  })
}

const onEnter = async () => {
  if (gameOver.value) return

  const start = activeIndex.value * COLS
  const end = start + COLS
  const currentWord = letters.value.slice(start, end).join('')

  if (currentWord.length < COLS) return // не полностью введено

  // Проверяем победу
  if (currentWord === secretWord.value) {
    showMessage(getRowMatchMessage(activeIndex.value))

    gameOver.value = true
    // Можно добавить сообщение "Поздравляем!"
    return
  }

  await nextTick()
  animateRow(activeIndex.value)

  showMessage(getRowMatchMessage(activeIndex.value))

  // Если неверно и последняя строка — добавляем ещё
  if (end >= letters.value.length) {
    letters.value.push(...Array(COLS).fill(''))
  }

  // Переход на следующую строку
  if (!gameOver.value) {
    activeIndex.value++
    await nextTick()
    inputRefs.value[activeIndex.value * COLS]?.focus()
  }
}

const getRowMatchMessage = (row) => {
  const start = row * COLS
  const end = start + COLS
  const currentLetters = letters.value.slice(start, end)
  const secretLetters = secretWord.value.split('')

  const secretLetterUsed = Array(secretLetters.length).fill(false)
  let correctCount = 0
  let presentCount = 0

  // 1️⃣ Сначала правильные позиции
  currentLetters.forEach((letter, i) => {
    if (letter === secretLetters[i]) {
      correctCount++
      secretLetterUsed[i] = true
    }
  })

  // 2️⃣ Правильные буквы, но не на месте
  currentLetters.forEach((letter, i) => {
    if (letter === secretLetters[i]) return // уже correct
    const idx = secretLetters.findIndex((l, j) => l === letter && !secretLetterUsed[j])
    if (idx !== -1) {
      presentCount++
      secretLetterUsed[idx] = true
    }
  })

  // 3️⃣ Формируем сообщение
  if (correctCount === COLS) return '🎉 Отлично! Ты угадала своё имя!'
  if (correctCount > 0 && presentCount > 0)
    return `Есть ${correctCount} на месте и ${presentCount} не на месте`
  if (correctCount > 0) return `Есть ${correctCount} буквы на месте`
  if (presentCount > 0) return `Есть ${presentCount} буквы в слове, но не на месте`
  return 'Ни одной буквы не угадано'
}

const showMessage = (text) => {
  currentMessage.value = text
  messageVisible.value = true

  nextTick(() => {
    if (!messageRef.value) return

    // стартовое состояние
    gsap.set(messageRef.value, { y: -20, opacity: 0, scale: 0.8 })

    // анимация появления
    gsap.to(messageRef.value, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' })
  })
}
</script>

<style scoped lang="scss">
.five-letters {
  display: grid;
  gap: 16px;
  justify-content: center;

  &__title {
    text-align: center;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(40px, 1fr));
    grid-auto-rows: minmax(40px, 1fr);
    grid-auto-flow: row;
    gap: 10px;
    padding: 10px;
  }

  &__char {
    font-size: 20px;
    text-align: center;
    border-radius: 6px;
    border: 1px solid darkgrey;

    &_correct {
      background-color: green;
      color: white;
    }

    &_present {
      background-color: orange;
      color: white;
    }

    &_absent {
      background-color: gray;
      color: white;
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
