<template>
  <div class="hidden flex-none lg:block">
    <ul class="menu menu-horizontal">
      <TheNavBarItems />
    </ul>
  </div>
</template>
<script lang="ts">
import TheNavBarItems from "@/components/TheNavBarItems.vue"
export default {
  components: { TheNavBarItems }
}
</script>