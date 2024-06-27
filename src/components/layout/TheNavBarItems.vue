<template>
  <li>
    <RouterLink to="/home/settings">
      Settings
    </RouterLink>
  </li>
  <li>
    <RouterLink to="/home/scripts">
      Scripts
    </RouterLink>
  </li>
  <li>
    <RouterLink to="/home/projects">
      Projects
    </RouterLink>
  </li>
  <li>
    <RouterLink to="/home/startup">
      Startup
    </RouterLink>
  </li>
  <li>
    <RouterLink to="/home/logs">
      Logs
    </RouterLink>
  </li>
  <li>
    <ThemeButton />
  </li>
  <li><a href="javascript:;" @click="signOut">Exit</a></li>
</template>

<script lang="ts">
import { signOut } from '@/services/fireauth';
import { RouterLink } from 'vue-router';
import ThemeButton from "./ThemeButton.vue"

export default {
  components: { RouterLink, ThemeButton },
  methods: {
    signOut: function () {
      signOut();
    }
  }
}
</script>