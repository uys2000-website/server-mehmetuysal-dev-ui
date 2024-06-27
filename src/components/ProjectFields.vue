<template>
  <div class="card bg-base-300 w-full shadow-xl min-w-0 flex flex-col gap-2 p-2">
    <label class="input input-ghost input-bordered flex items-center gap-2 min-w-0">
      Name:
      <input type="text" class="grow min-w-0" placeholder="Project Name" v-model="value.name" />
    </label>
    <label class="input input-ghost input-bordered flex items-center gap-2 min-w-0">
      Repo:
      <input type="text" class="grow min-w-0" placeholder="Project Repo Url" v-model="value.repo" />
    </label>
    <label class="input input-ghost input-bordered flex items-center gap-2 min-w-0">
      Folder:
      <input type="text" class="grow min-w-0" placeholder="Project Folder Name In Server" v-model="value.folder">
    </label>
    <label class="input input-ghost input-bordered flex items-center gap-2 min-w-0">
      Command:
      <input type="text" class="grow min-w-0" placeholder="Project Run Command" v-model="value.command" />
    </label>
    <textarea class="textarea textarea-ghost textarea-bordered" placeholder="Bio" v-model="value.env"></textarea>
    <slot />
  </div>
</template>

<script lang="ts">
import { ProjectSettings } from '@/classes/settings';
import type { PropType } from 'vue';


export default {
  props: {
    modelValue: {
      type: Object as PropType<ProjectSettings>,
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
      set(newValue: ProjectSettings) {
        this.$emit('update:modelValue', newValue)
      }
    }
  }
}
</script>