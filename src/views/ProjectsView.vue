<template>
  <div class="p-2 flex flex-col gap-2 max-h-full overflow-y-auto lg:flex-row lg:flex-wrap">
    <template v-for="(item, index) in data" :key="index">
      <DaisyAcordion name="item" :header="item.item.name" useBackgorund useHalfSize>
        <ProjectFields v-model="item.item">
          <div class="flex flex-row flex-nowrap overflow-hidden gap-2">
            <button class="btn w-full max-w-md flex-shrink btn-warning" @click="() => updateItem(item)">Update</button>
            <button class="btn w-full max-w-md flex-shrink btn-error" @click="() => deleteItem(item)">Delete</button>
            <button class="btn w-full max-w-md flex-shrink btn-success" @click="() => runItem(item)">Run</button>
          </div>
        </ProjectFields>
      </DaisyAcordion>
    </template>
    <DaisyAcordion name="item" header="New Project" useBackgorund useHalfSize>
      <ProjectFields v-model="item">
        <div class="flex flex-row flex-nowrap overflow-hidden gap-2">
          <button class="btn w-full max-w-md flex-shrink btn-warning" @click="add">Save</button>
          <button class="btn w-full max-w-md flex-shrink btn-success" @click="run">Deploy</button>
        </div>
      </ProjectFields>
    </DaisyAcordion>
    <DaisyAcordion name="item" header="Info" useBackgorund useHalfSize>
      <ProjectInfo />
    </DaisyAcordion>
  </div>
</template>

<script lang="ts">
import { PROJECTSETTINGS } from '@/constants';
import { addDocument, deleteDocument, docsListener, getDocuments, updateDocument } from '@/services/firestore';
import type { Unsubscribe } from 'firebase/firestore';
import { ProjectSettings } from '@/classes/settings';
import ProjectInfo from '@/components/ProjectInfo.vue';
import ProjectFields from '@/components/ProjectFields.vue';
import DaisyAcordion from "@/components/daisy/DaisyAcordion.vue"
export default {
  components: { ProjectInfo, ProjectFields, DaisyAcordion },
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