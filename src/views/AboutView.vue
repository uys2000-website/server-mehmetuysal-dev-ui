<template>
  <section class="prose max-w-2xl m-auto bg-base-300 p-10 flex flex-col gap-4 overflow-hidden">
    <div class="flex flex-nowrap gap-2">
      <a class="btn btn-primary w-full flex-shrink" href="/login">Login</a>
      <a class="btn btn-primary w-full flex-shrink" href="/home">Dashboard</a>
    </div>
    <DaisyAcordion header="Server-MehmetUysal-Dev-UI" checked>
      <markdown-content />
    </DaisyAcordion>
    <DaisyAcordion header="Server-MehmetUysal-Dev-UI">
      <markdown-content2 />
    </DaisyAcordion>
  </section>
</template>

<script lang="ts">
import { VueComponent as readMe } from "../../README.md"
import { VueComponent as readMeServer } from "../../README-SERVER.md"
import DaisyAcordion from "@/components/daisy/DaisyAcordion.vue"
export default {
  components: {
    DaisyAcordion,
    MarkdownContent: readMe,
    MarkdownContent2: readMeServer,
  },
}
</script>