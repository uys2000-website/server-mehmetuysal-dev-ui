<template>
  <div class="p-2 flex flex-col gap-2 h-full overflow-y-auto lg:flex-row lg:flex-wrap">
    <template v-for="(item, index) in data" :key="index">
      <DaisyAcordion name="item" :header="item.item.name" useBackgorund useHalfSize>
        <ScriptFields v-model="item.item">
          <div class="flex flex-row flex-nowrap overflow-hidden gap-2">
            <button class="btn w-full max-w-md flex-shrink btn-warning" @click="() => updateItem(item)">Update</button>
            <button class="btn w-full max-w-md flex-shrink btn-error" @click="() => deleteItem(item)">Delete</button>
            <button class="btn w-full max-w-md flex-shrink btn-success" @click="() => runItem(item)">Run</button>
          </div>
        </ScriptFields>
      </DaisyAcordion>
    </template>
    <DaisyAcordion name="item" header="New Script" useBackgorund useHalfSize>
      <ScriptFields v-model="item">
        <div class="flex flex-row flex-nowrap overflow-hidden gap-2">
          <button class="btn w-full max-w-md flex-shrink btn-warning" @click="add">Save</button>
          <button class="btn w-full max-w-md flex-shrink btn-success" @click="run">Deploy</button>
        </div>
      </ScriptFields>
    </DaisyAcordion>
    <DaisyAcordion name="item" header="Info" useBackgorund useHalfSize>
      <ScriptInfo />
    </DaisyAcordion>

  </div>
</template>

<script lang="ts">
import { Script } from '@/classes/scripts';
import { SCRIPTS } from '@/constants';
import { addDocument, deleteDocument, docsListener, getDocuments, updateDocument } from '@/services/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import DaisyAcordion from '@/components/daisy/DaisyAcordion.vue';
import ScriptFields from '@/components/ScriptFields.vue';
import ScriptInfo from '@/components/ScriptInfo.vue';
export default {
  components: { DaisyAcordion, ScriptFields, ScriptInfo },
  data() {
    return {
      path: SCRIPTS,
      data: [] as Array<{ id: string, item: Script }>,
      item: new Script("", "", false),
      unsubscribe: undefined as undefined | Unsubscribe
    }
  },
  methods: {
    updateItem(item: { id: string, item: Script }) {
      updateDocument(SCRIPTS, item.id, item.item)
    },
    deleteItem(item: { id: string, item: Script }) {
      this.data = this.data.filter(d => d.id != item.id)
      deleteDocument(SCRIPTS, item.id)
    },
    runItem(item: { id: string, item: Script }) {
      item.item.pending = true
      updateDocument(SCRIPTS, item.id, item.item)
    },
    add() {
      this.item.pending = false
      this.item.timestamp = Date.now();
      addDocument(this.path, this.item)
    },
    run() {
      this.item.pending = true
      this.item.timestamp = Date.now();
      addDocument(this.path, this.item)
    },
  },
  mounted() {
    getDocuments(this.path).then(async snapshots => {
      this.data = snapshots.docs.map(snapshot => ({ id: snapshot.id, item: snapshot.data() as Script }))
    })
    this.unsubscribe = docsListener(this.path, (snapshots) => {
      snapshots.docs.forEach(snapshot => {
        const data = snapshot.data() as Script;
        const index = this.data.findIndex(item => item.id == snapshot.id);
        if (index != -1) this.data[index] = { id: snapshot.id, item: data as Script }
        else this.data.push({ id: snapshot.id, item: data as Script })
      })
    })
  },
  unmounted() {
    if (this.unsubscribe) this.unsubscribe()
  }
}
</script>