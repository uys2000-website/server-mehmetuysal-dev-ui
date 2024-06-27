<template>
  <div class="p-2 flex flex-col gap-2 h-full overflow-y-auto lg:flex-row lg:flex-wrap">
    <template v-for="(item, index) in data" :key="index">
      <TheProject @updateItem="updateItem" @deleteItem="deleteItem" @runItem="runItem" :id="item.id"
        :item="item.item" />
    </template>
    <div class="collapse use-bg bg-base-200 flex-shrink-0 lg:w-[calc(50%-5px)]">
      <input type="radio" name="data" />
      <div class="collapse-title text-xl font-medium">New Project</div>
      <div class="collapse-content overflow-hidden w-full">
        <div class="card bg-base-300 text-base-content w-full">
          <div class="card-body items-center text-center w-full">
            <label class="input input-ghost input-bordered flex items-center gap-2 w-full min-w-0">
              Name:
              <input type="text" class="grow w-auto" placeholder="project-mehmetuysal-dev?" v-model="item.name" />
            </label>
            <label class="input input-ghost input-bordered flex items-center gap-2 w-full min-w-0">
              Repo:
              <input type="text" class="grow w-auto"
                placeholder="https://github.com/uys2000-website/server-mehmetuysal-dev?" v-model="item.repo" />
            </label>
            <label class="input input-ghost input-bordered flex items-center gap-2 w-full min-w-0">
              Folder:
              <input type="text" class="grow w-auto" placeholder="project-mehmetuysal-dev?" v-model="item.folder" />
            </label>
            <label class="input input-ghost input-bordered flex items-center gap-2 w-full min-w-0">
              Run Command:
              <input type="text" class="grow w-auto" placeholder="npm run serve?" v-model="item.command" />
            </label>
            <textarea class="textarea textarea-ghost textarea-bordered w-full" placeholder=".env values"
              v-model="item.env"></textarea>
            <div class="w-full overflow-hidden flex flex-row justify-center flex-nowrap gap-2">
              <button class="btn btn-ghost w-full flex-shrink" @click="add">Save</button>
              <button class="btn btn-primary w-full flex-shrink" @click="run">Deploy & Run</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="collapse use-bg bg-base-200 flex-shrink-0 lg:w-[calc(50%-5px)]">
      <input type="radio" name="data" />
      <div class="collapse-title text-xl font-medium">Project Run Info</div>
      <div class="collapse-content overflow-hidden w-full">
        <div class="card bg-base-300 text-base-content w-full">
          <div class="card-body text-left w-full">
            Run Order
            <label class="input input-ghost input-bordered h-auto p-2 px-3">
              1 - Change Project status updated <br />
              2 - Clear Project folder from server <br />
              3 - Clone Project from Repo <br />
              4 - Run project command <br />
            </label>
            Commands
            <label class="input input-ghost input-bordered h-auto p-2 px-3">
              $ rm -r --force ../{folder} <br />
              $ git clone ${repo} ../${folder} <br />
              $ cd ../${folder} && ${command} & <br />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PROJECTSETTINGS } from '@/constants';
import { addDocument, deleteDocument, docsListener, getDocuments, updateDocument } from '@/services/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import { ProjectSettings } from '@/classes/settings';
import TheProject from '@/components/TheProject.vue';
export default {
  components: { TheProject },
  data() {
    return {
      path: PROJECTSETTINGS,
      data: [] as Array<{ id: string, item: ProjectSettings }>,
      item: new ProjectSettings("", "", "", "", "", false, Date.now()),
      unsubscribe: undefined as undefined | Unsubscribe
    }
  },
  methods: {
    updateItem(item: { id: string, item: ProjectSettings }) {
      updateDocument(this.path, item.id, item.item)
    },
    deleteItem(item: { id: string, item: ProjectSettings }) {
      this.data = this.data.filter(d => d.id != item.id)
      deleteDocument(this.path, item.id)
    },
    runItem(item: { id: string, item: ProjectSettings }) {
      item.item.outdated = true
      updateDocument(this.path, item.id, item.item)
    },
    add() {
      this.item.outdated = false
      this.item.timestamp = Date.now();
      addDocument(this.path, this.item)
    },
    run() {
      this.item.outdated = true
      this.item.timestamp = Date.now();
      addDocument(this.path, this.item)
    },
  },
  mounted() {
    getDocuments(this.path).then(async snapshots => {
      this.data = snapshots.docs.map(snapshot => ({ id: snapshot.id, item: snapshot.data() as ProjectSettings }))
    })
    this.unsubscribe = docsListener(this.path, (snapshots) => {
      snapshots.docs.forEach(snapshot => {
        const data = snapshot.data() as ProjectSettings;
        const index = this.data.findIndex(item => item.id == snapshot.id);
        if (index != -1) this.data[index] = { id: snapshot.id, item: data as ProjectSettings }
        else this.data.push({ id: snapshot.id, item: data as ProjectSettings })
      })
    })
  },
  unmounted() {
    if (this.unsubscribe) this.unsubscribe()
  }
}
</script>