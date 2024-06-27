<template>
  <div class="collapse bg-base-200 flex-shrink-0 lg:w-[calc(50%-5px)]">
    <input type="radio" name="data" />
    <div class="collapse-title text-xl font-medium">{{ item.name }}</div>
    <div class="collapse-content overflow-hidden w-full">
      <div class="card bg-base-300 text-base-content w-full">
        <div class="card-body items-center text-center w-full">
          <label class="input input-ghost input-bordered flex items-center gap-2 w-full min-w-0">
            Name:
            <input type="text" class="grow w-auto" placeholder="project-mehmetuysal-dev?" v-model="item.name" />
          </label>
          <label class="input input-ghost input-bordered flex items-center gap-2 w-full min-w-0">
            Repo:
            <input type="text" class="grow w-auto"
              placeholder="https://github.com/uys2000-website/server-mehmetuysal-dev?" v-model="item.repo" />
          </label>
          <label class="input input-ghost input-bordered flex items-center gap-2 w-full min-w-0">
            Folder:
            <input type="text" class="grow w-auto" placeholder="project-mehmetuysal-dev?" v-model="item.folder" />
          </label>
          <label class="input input-ghost input-bordered flex items-center gap-2 w-full min-w-0">
            Run Command:
            <input type="text" class="grow w-auto" placeholder="npm run serve?" v-model="item.command" />
          </label>
          <textarea class="textarea textarea-ghost textarea-bordered w-full" placeholder=".env values"
            v-model="item.env"></textarea>
          <div class="w-full overflow-hidden flex flex-row justify-center flex-nowrap gap-2">
            <button class="btn btn-warning w-full flex-shrink"
              @click="() => $emit('updateItem', { id: id, item })">Update</button>
            <button class="btn btn-error w-full flex-shrink"
              @click="() => $emit('deleteItem', { id: id, item })">Delete</button>
          </div>
          <div class="w-full overflow-hidden flex flex-row justify-center flex-nowrap gap-2">
            <button class="btn btn-primary w-full flex-shrink"
              @click="() => $emit('runItem', { id: id, item })">Run</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProjectSettings } from '@/classes/settings';
import type { PropType } from 'vue';

export default {
  props: {
    id: {
      type: String
    },
    item: {
      type: Object as PropType<ProjectSettings>,
      required: true
    }
  },
  emits: ["updateItem", "deleteItem", "runItem"]
}
</script>