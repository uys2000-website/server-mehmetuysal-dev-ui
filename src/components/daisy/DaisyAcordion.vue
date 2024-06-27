<template>
  <div class="collapse bg-base-200 flex-shrink-0" :class="{ 'lg:w-[calc(50%-5px)]': useHalfSize }">
    <input type="radio" :name="name" :checked="checked" />
    <div class="collapse-title text-xl font-medium" :class="{ 'use-bg': useBackgorund }">{{ header }}</div>
    <div class="collapse-content  min-w-0">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      default: "item"
    },
    header: {
      type: String,
      default: ""
    },
    useBackgorund: {
      type: Boolean,
      default: false
    },
    useHalfSize: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.collapse-title {
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  text-wrap: nowrap;
}

.collapse:not(.collapse-close)>input[type="radio"]:not(:checked)~.collapse-title::before {
  position: absolute;
  top: 65px;
  content: "";
  background-image: url("https://mehmetuysal.dev/logo.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: black;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  width: calc(100% - 2rem);
  height: calc(100% - 80px);
}
</style>
