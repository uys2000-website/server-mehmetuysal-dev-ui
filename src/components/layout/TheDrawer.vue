<template>
  <div class="drawer-side z-50">
    <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 min-h-full w-80 p-4">
      <li>
        <a class="block" target="_blank" href="https://mehmetuysal.dev">
          <div class="card h-40 bg-contain bg-no-repeat bg-center bg-black"
            style="background-image: url(https://mehmetuysal.dev/logo.jpg);">
            <div class="card-body flex flex-col justify-center">
              <h2 class="card-title text-primary-content">mehmetuysal.dev</h2>
            </div>
          </div>
        </a>
      </li>
      <TheNavBarItems />
    </ul>
  </div>
</template>

<script lang="ts">
import TheNavBarItems from "@/components/layout/TheNavBarItems.vue"
export default {
  components: { TheNavBarItems }
}
</script>