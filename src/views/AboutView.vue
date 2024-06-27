<template>
  <section class="prose max-w-2xl m-auto bg-base-300 p-10 flex flex-col gap-4 overflow-hidden">
    <div class="flex flex-nowrap gap-2">
      <a class="btn btn-primary w-full flex-shrink" href="/login">Login</a>
      <a class="btn btn-primary w-full flex-shrink" href="/home">Dashboard</a>
    </div>
    <article class="collapse bg-base-200">
      <input type="radio" name="my-accordion-1" checked />
      <div class="collapse-title text-xl font-medium">Server-MehmetUysal-Dev-UI</div>
      <div class="collapse-content">
        <markdown-content />
      </div>
    </article>
    <article class="collapse bg-base-200">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">Server-MehmetUysal-Dev</div>
      <div class="collapse-content">
        <markdown-content2 />
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { VueComponent as readMe } from "../../README.md"
import { VueComponent as readMeServer } from "../../README-SERVER.md"
export default {
  components: {
    MarkdownContent: readMe,
    MarkdownContent2: readMeServer,
  },
}
</script>