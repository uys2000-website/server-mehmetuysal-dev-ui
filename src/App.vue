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
      if (user) setTimeout(() => !this.$route.path.startsWith("/home") ? this.$router.push("/home") : 0, 1000);
      else setTimeout(() => this.$route.path != "/" ? this.$router.push("/login") : 0, 100);
    }))
  },
}
</script>


<style>
.collapse-title {
  position: relative;
}

.collapse-title::before {
  position: absolute;
  top: 62px;
  content: "";
  background-image: url("https://mehmetuysal.dev/logo.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: black;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  width: calc(100% - 2rem);
  height: calc(100% - 80px);
}
</style>