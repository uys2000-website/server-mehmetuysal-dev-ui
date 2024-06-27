<template>
  <div class="p-2 flex flex-col gap-2 h-full overflow-y-auto lg:flex-row lg:flex-wrap">
    <template v-for="(item, index) in data" :key="index">
      <TheScript @updateItem="updateItem" @deleteItem="deleteItem" @runItem="runItem" :id="item.id" :item="item.item" />
    </template>
    <div class="collapse use-bg bg-base-200 flex-shrink-0 lg:w-[calc(50%-5px)]">
      <input type="radio" name="data" />
      <div class="collapse-title text-xl font-medium">New Script</div>
      <div class="collapse-content overflow-hidden w-full">
        <div class="card bg-base-300 text-base-content w-full">
          <div class="card-body items-center text-center w-full">
            <label class="input input-ghost input-bordered flex items-center gap-2 w-full min-w-0">
              Name:
              <input type="text" class="grow w-auto" placeholder="Reboot?" v-model="item.name" />
            </label>
            <textarea class="textarea textarea-ghost textarea-bordered w-full" placeholder="One Line Code"
              v-model="item.script"></textarea>
            <div class="w-full overflow-hidden flex flex-row justify-center flex-nowrap gap-2">
              <button class="btn btn-ghost w-full flex-shrink" @click="add">Save</button>
              <button class="btn btn-primary w-full flex-shrink" @click="run">Run</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="collapse use-bg bg-base-200 flex-shrink-0 lg:w-[calc(50%-5px)]">
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
import { STARTUP } from '@/constants';
import { addDocument, deleteDocument, docsListener, getDocuments, updateDocument } from '@/services/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import { Script } from '@/classes/scripts';
import TheScript from '@/components/TheScript.vue';
export default {
  components: { TheScript },
  data() {
    return {
      path: STARTUP,
      data: [] as Array<{ id: string, item: Script }>,
      item: new Script("", "", false, Date.now()),
      unsubscribe: undefined as undefined | Unsubscribe
    }
  },
  methods: {
    updateItem(item: { id: string, item: Script }) {
      updateDocument(this.path, item.id, item.item)
    },
    deleteItem(item: { id: string, item: Script }) {
      this.data = this.data.filter(d => d.id != item.id)
      deleteDocument(this.path, item.id)
    },
    runItem(item: { id: string, item: Script }) {
      item.item.pending = true
      updateDocument(this.path, item.id, item.item)
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