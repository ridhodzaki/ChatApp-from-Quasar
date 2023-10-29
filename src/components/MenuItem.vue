<template>
  <div class="flex flex-center">
    <q-separator v-if="isLine" color="white" inset="" size="1px" style="width: 70%" />
  </div>
  <q-item
    clickable
    exact
    class="item"
    active-class="item-active"
    :to="{ name: link}"
  >
    <q-item-section
      v-if="icon"
      class="flex flex-center"
    >
      <q-icon :name="icon" size="xs" />
      <q-item-label class="q-mt-sm">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },

    isLine: {
      type: Boolean,
      default: false
    }

  }
})
</script>
