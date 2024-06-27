<template>
  <div class="card bg-base-300 w-full shadow-xl min-w-0 flex flex-col gap-2 p-2">
    <div>
      <div class="border-b border-b-base-200">Difference Between Script and StartUp Script</div>
      <div class="p-4 pb-1 overflow-hidden">
        Script: Scripts are only runable from this ui and firebase. <br />
        StartUp Script: StartUp Script runs only when server rebooted.
      </div>
    </div>
    <div>
      <div class="border-b border-b-base-200">Running Process</div>
      <div class="p-4 overflow-hidden">
        <div class="mockup-code bg-neutral min-w-0">
          <pre data-prefix="$"><code class="mr-4">echo ${name} && ${script} &</code></pre>
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
          Update Button updates script only for firebase.
        </div>
        <div>
          <div class="input input-bordered input-ghost w-32 h-6 text-center float-left mr-2">
            Delete
          </div>
          Delete Button deletes script only from firebase.
        </div>
        <div>
          <div class="input input-bordered input-ghost w-32 h-6 text-center float-left mr-2">
            Run
          </div>
          Run Button updates script in firebase and Starts Running Process in server.
        </div>
        <div>
          <div class="input input-bordered input-ghost w-32 h-6 text-center float-left mr-2">
            Save
          </div>
          Save Button saves script to firebase.
        </div>
        <div>
          <div class="input input-bordered input-ghost w-32 h-6 text-center float-left mr-2">
            Deploy
          </div>
          Deploy Button saves script to firebase and Starts Running Process in server.
        </div>
      </div>
    </div>
  </div>
</template>