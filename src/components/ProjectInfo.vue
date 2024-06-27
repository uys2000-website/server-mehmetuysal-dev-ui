<template>
  <div class="card bg-base-300 w-full shadow-xl min-w-0 flex flex-col gap-2 p-2">
    <div>
      <div class="border-b border-b-base-200">Deployin Process</div>
      <div class="p-4 overflow-hidden">
        <div class="mockup-code bg-neutral min-w-0">
          <pre data-prefix="$"><code class="mr-4">rm -r --force ../${folder}</code></pre>
          <pre data-prefix="$"><code class="mr-4">git clone ${repo} ../${folder}</code></pre>
          <pre data-prefix="$"><code class="mr-4">echo "${env}" > ../${folder}/.env</code></pre>
          <pre data-prefix="$"><code class="mr-4">cd ../${folder} && ${command} &</code></pre>
        </div>
      </div>
    </div>
    <div>
      <div class="border-b border-b-base-200">Actions</div>
      <div class="p-4 flex flex-col gap-2 overflow-y-hidden overflow-x-auto text-nowrap">
        <div>
          <div class="input input-bordered input-ghost w-32 h-6 text-center float-left mr-2">
            Update
          </div>
          Update Button updates projects settings only for firebase.
        </div>
        <div>
          <div class="input input-bordered input-ghost w-32 h-6 text-center float-left mr-2">
            Delete
          </div>
          Delete Button deletes project only from firebase.
        </div>
        <div>
          <div class="input input-bordered input-ghost w-32 h-6 text-center float-left mr-2">
            Run
          </div>
          Run Button updates projects settings in firebase and Runs Deploying Process in server.
        </div>
        <div>
          <div class="input input-bordered input-ghost w-32 h-6 text-center float-left mr-2">
            Save
          </div>
          Save Button saves projects settings to firebase.
        </div>
        <div>
          <div class="input input-bordered input-ghost w-32 h-6 text-center float-left mr-2">
            Deploy
          </div>
          Deploy Button saves projects settings to firebase and Runs Deploying Process in server.
        </div>
      </div>
    </div>
  </div>
</template>