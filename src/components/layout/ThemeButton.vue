<template>
  <div class="dropdown dropdown-top dropdown-start lg:dropdown-bottom lg:dropdown-end m-0 p-0 px-2 lg:px-0 w-full flex">
    <div tabindex="0" role="button"
      class="btn h-9 m-0 p-0 px-2 py-3 min-h-0 bg-transparent border-none w-full justify-start shadow-none capitalize">
      {{
        theme
      }}
    </div>
    <ul tabindex="0"
      class="dropdown-content menu rounded-box w-64 p-2 shadow max-h-40 lg:max-h-96 overflow-y-auto flex flex-col flex-nowrap gap-1 z-50 bg-base-100">
      <template v-for="(theme, index) in themes" :key="index">
        <li>
          <button :data-theme="theme" class="btn flex flex-row items-center w-full px-2 cursor-pointer flex-nowrap"
            @click="() => setTheme(theme)">
            <span class="inline w-full flex-shrink capitalize">{{ theme }}</span>
            <span class="flex-shrink-0 w-2 h-4 p-0 m-0 inline-block bg-primary"></span>
            <span class="flex-shrink-0 w-2 h-4 p-0 m-0 inline-block bg-secondary"></span>
            <span class="flex-shrink-0 w-2 h-4 p-0 m-0 inline-block bg-accent"></span>
            <span class="flex-shrink-0 w-2 h-4 p-0 m-0 inline-block bg-neutral"></span>
            <span class="flex-shrink-0 w-2 h-4 p-0 m-0 inline-block bg-base-100"></span>
            <span class="flex-shrink-0 w-2 h-4 p-0 m-0 inline-block bg-info"></span>
            <span class="flex-shrink-0 w-2 h-4 p-0 m-0 inline-block bg-success"></span>
            <span class="flex-shrink-0 w-2 h-4 p-0 m-0 inline-block bg-warning"></span>
            <span class="flex-shrink-0 w-2 h-4 p-0 m-0 inline-block bg-error"></span>
          </button>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      theme: "Theme",
      themes: [
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset"
      ]
    }
  },
  methods: {
    setTheme(theme: string) {
      this.theme = theme;
      document.body.setAttribute("data-theme", theme)
    }
  },
  mounted() {
    const theme = window.localStorage.getItem("theme")
    if (theme) this.setTheme(theme)
  }
}
</script>