<template>
  <div class="w-full h-full p-5 overflow-hidden">
    <div class="mockup-code w-full h-full overflow-hidden flex-shrink-0">
      <div class="w-full h-full flex flex-col-reverse overflow-auto pb-4">
        <template v-for="log, i in logs" :key="i">
          <div class="collapse flex-shrink-0 overflow-hidden">
            <input type="radio" class="absolute block w-full h-[24px] min-h-0" name="logs" />
            <div class="w-full overflow-hidden">
              <span class="pl-2 flex-shrink-0 text-warning">{{ log.timestamp }}</span>
              <span class="pl-2 flex-shrink-0" :class="`${statusClass(log.status)}`">{{ log.status }}</span>
              <span class="pl-2 flex-shrink-0" :class="`${statusClass(log.status)}`">{{ log.name }}</span>
            </div>
            <div class="collapse-content overflow-x-hidden !p-0 flex flex-col gap-1">
              <template v-for="(data, index) in log.data" :key="index">
                <template v-if="data">
                  <pre class="overflow-x-auto w-full">{{ JSON.stringify(data, null, 4) }} </pre>
                </template>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Log } from '@/classes/logs';
import { LOGS } from '@/constants';
import { docsListener, getDocuments } from '@/services/firestore';
import type { Unsubscribe } from 'firebase/firestore';

export default {
  data() {
    return {
      logs: [] as Log[],
      unsubscribe: undefined as undefined | Unsubscribe
    }
  },
  methods: {
    statusClass(status: string): string {
      if (status == 'Run') return "text-info"
      else if (status == 'Res') return "text-success"
      else if (status == 'Err') return "text-error"
      else return ""
    }
  },
  mounted() {
    getDocuments(LOGS).then(async snapshots => {
      this.logs = snapshots.docs.map(snapshot => snapshot.data() as Log)
    })

    this.unsubscribe = docsListener(LOGS, snapshots => {
      snapshots.docs.forEach(snapshot => {
        this.logs.unshift(snapshot.data() as Log)
      })
    })
  },
  unmounted() {
    if (this.unsubscribe) this.unsubscribe()
  }
}
</script>