<template>
  <div class="w-full h-full flex justify-center items-center py-5 md:py-10 lg:py-20">
    <div class="card bg-base-100 w-96 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Settings</h2>
        <form action="post" @submit.prevent="submit" class="flex flex-col gap-2">
          <label class="input input-bordered flex items-center gap-2">
            Name
            <input type="text" class="grow" placeholder="server-mehmetuysal-dev" v-model="name" />
          </label>
          <label class="input input-bordered flex items-center justify-between gap-2 cursor-pointer">
            Connection Status
            <input type="checkbox" class="toggle toggle-primary" v-model="connected" />
          </label>
          <input type="submit" class="btn btn-primary" value="Update">
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { SETTINGS } from '@/constants';
import { docListener, setDocument } from '@/services/firestore';
import type { Unsubscribe } from 'firebase/firestore';

export default {
  data() {
    return {
      name: "",
      connected: false,
      unsubscribe: undefined as undefined | Unsubscribe
    }
  },
  methods: {
    submit() {
      setDocument(SETTINGS, SETTINGS, { name: this.name, connected: this.connected })
    }
  },
  mounted() {
    this.unsubscribe = docListener(SETTINGS, SETTINGS, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        this.name = data.name;
        this.connected = true;
        this.connected = data.connected;
      }
    })
  },
  unmounted() {
    if (this.unsubscribe) this.unsubscribe()

  }
}
</script>