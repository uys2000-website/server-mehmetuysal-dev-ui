<template>
  <RouterView />
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import { authListener } from './services/fireauth';

export default {
  components: { RouterView },
  mounted() {
    authListener((user => {
      if (user) setTimeout(() => this.$route.path.startsWith("/login") ? this.$router.push("/home") : 0, 1000);
      else setTimeout(() => this.$route.path != "/" ? this.$router.push("/login") : 0, 100);
    }))
  },
}
</script>
