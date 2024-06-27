<template>
  <article class="prose max-w-2xl m-auto bg-base-300 p-10">
    <markdown-content />
  </article>
</template>

<script lang="ts">
import { VueComponent } from "../../README.md"
export default {
  components: {
    MarkdownContent: VueComponent
  },
}
</script>