<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <TheHeader />
      <!-- Page content here -->
      Content
    </div>
    <TheDrawer />
  </div>
</template>

<script>
import TheDrawer from "@/components/layout/TheDrawer.vue";
import TheHeader from "@/components/layout/TheHeader.vue"
export default {
  components: { TheHeader, TheDrawer }
}
</script>