<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <form class="flex flex-col gap-2 p-4 shadow-2xl" method="post" @submit.prevent="submit">
      <div>Login</div>
      <label class="input input-bordered flex items-center gap-2">
        <span class="material-symbols-rounded text-base opacity-80"> mail </span>
        <input type="text" class="grow" placeholder="Email" v-model="mail" />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        <span class="material-symbols-rounded text-base opacity-80"> key </span>
        <input type="password" class="grow" placeholder="Password" v-model="pass" />
      </label>
      <input class="btn" type="submit" value="Sign In" />
    </form>

    <dialog ref="modal" id="modal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{{ name }}</h3>
        <p class="py-4">{{ message }}</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script lang="ts">
import { signIn } from "@/services/fireauth";
export default {
  data() {
    return {
      name: "",
      message: "",
      mail: "",
      pass: "",
    };
  },
  methods: {
    submit() {
      let mail = this.mail
      let pass = this.pass
      if (import.meta.env.VITE_USE_AUTH == "FALSE") {
        mail = "test@mehmetuysal.dev"
        pass = "123456"
      }
      signIn(mail, pass)
        .then((result) => {
          const modal = this.$refs.modal as HTMLDialogElement;
          this.name = "Success";
          this.message = "Login Success, you will be redirected soon.";
          modal.showModal();
        })
        .catch((error) => {
          const modal = this.$refs.modal as HTMLDialogElement;
          this.name = error.name;
          this.message = error.message;
          modal.showModal();
        });
    },
    mounted() {
    },
  }
};
</script>
