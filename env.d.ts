/// <reference types="vite/client" />

declare module "*.md" {
  // When "Mode.Vue" is requested
  import { ComponentOptions, Component } from "vue";
  const VueComponent: ComponentOptions;
  const VueComponentWith: (
    components: Record<string, Component>
  ) => ComponentOptions;

  // Modify below per your usage
  export { VueComponent, VueComponentWith };
}
