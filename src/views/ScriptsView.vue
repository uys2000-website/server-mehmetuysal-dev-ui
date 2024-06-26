<template>
  <div class="p-2 flex flex-col gap-2 h-full overflow-y-auto">
    <template v-for="(item, index) in data" :key="index">
      <TheScript @updateItem="updateItem" @deleteItem="deleteItem" @runItem="runItem" :id="item.id" :item="item.item" />
    </template>
    <div class="collapse bg-base-200 flex-shrink-0">
      <input type="radio" name="data" />
      <div class="collapse-title text-xl font-medium">New Script</div>
      <div class="collapse-content overflow-hidden w-full">
        <div class="card bg-base-300 text-base-content w-full">
          <div class="card-body items-center text-center w-full">
            <label class="input input-ghost input-bordered flex items-center gap-2 w-full min-w-0">
              Name:
              <input type="text" class="grow w-auto" placeholder="Reboot?" v-model="script.name" />
            </label>
            <textarea class="textarea textarea-ghost textarea-bordered w-full" placeholder="One Line Code"
              v-model="script.script"></textarea>
            <div class="w-full overflow-hidden flex flex-row justify-center flex-nowrap gap-2">
              <button class="btn btn-ghost w-full flex-shrink" @click="add">Save</button>
              <button class="btn btn-primary w-full flex-shrink" @click="run">Run</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="collapse bg-base-200 flex-shrink-0">
      <input type="radio" name="data" />
      <div class="collapse-title text-xl font-medium">Script Run Info</div>
      <div class="collapse-content overflow-hidden w-full">
        <div class="card bg-base-300 text-base-content w-full">
          <div class="card-body text-left w-full">
            Run Order
            <label class="input input-ghost input-bordered h-auto p-2 px-3">
              1 - Change Script status runned <br />
              2 - Run Script <br />
            </label>
            Commands
            <label class="input input-ghost input-bordered h-auto p-2 px-3">
              $ echo ${name} && ${script} & <br />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Script } from '@/classes/scripts';
import { SCRIPTS } from '@/constants';
import { addDocument, deleteDocument, docsListener, getDocuments, updateDocument } from '@/services/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import TheScript from "@/components/TheScript.vue"
export default {
  components: { TheScript },
  data() {
    return {
      path: SCRIPTS,
      data: [] as Array<{ id: string, item: Script }>,
      script: new Script("", "", false),
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
      this.script.pending = false
      this.script.timestamp = Date.now();
      addDocument(this.path, this.script)
    },
    run() {
      this.script.pending = true
      this.script.timestamp = Date.now();
      addDocument(this.path, this.script)
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