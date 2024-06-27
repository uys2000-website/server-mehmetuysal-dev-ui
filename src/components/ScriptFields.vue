<template>
  <div class="card bg-base-300 w-full shadow-xl min-w-0 flex flex-col gap-2 p-2">
    <label class="input input-ghost input-bordered flex items-center gap-2 min-w-0">
      Name:
      <input type="text" class="grow min-w-0" placeholder="Script Name" v-model="value.name" />
    </label>
    <textarea class="textarea textarea-ghost textarea-bordered" placeholder="One Line Bash Script"
      v-model="value.script"></textarea>
    <slot />
  </div>
</template>

<script lang="ts">
import { Script } from '@/classes/scripts';
import type { PropType } from 'vue';


export default {
  props: {
    modelValue: {
      type: Object as PropType<Script>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(newValue: Script) {
        this.$emit('update:modelValue', newValue)
      }
    }
  }
}
</script>