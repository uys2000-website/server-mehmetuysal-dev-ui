<template>
  <div class="drawer h-screen overflow-hidden flex flex-col flex-nowrap">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content min-h-full overflow-hidden flex flex-col flex-nowrap">
      <!-- Navbar -->
      <TheHeader />
      <!-- Page content here -->
      <RouterView />
    </div>
    <TheDrawer />
  </div>
</template>

<script lang="ts">
import TheDrawer from "@/components/layout/TheDrawer.vue";
import TheHeader from "@/components/layout/TheHeader.vue"
export default {
  components: { TheHeader, TheDrawer, }
}
</script>