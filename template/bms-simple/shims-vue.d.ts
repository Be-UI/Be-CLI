// import Vue from "vue";
// import VueRouter, { Route } from "vue-router";

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  interface Vue {
    // $router: VueRouter; // 这表示this下有这个东西
    // $route: Route;
    // $https: any;
    // $urls: any;
    // $Message: any;
    $modal: any
  }

  const component: DefineComponent<{}, {}, Vue, any>
  export default component
}
