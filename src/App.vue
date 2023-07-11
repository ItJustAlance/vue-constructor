<template lang="pug">
.over#app
  header
    .all
      .b-link
        a.link-main
      .header-content
        .header-message Методика проведения занятий математического кружка...
        .header-btns
          a.btn.btn-second
          a.btn.btn-primary
          a.btn.btn-second.--disabled
          
  aside
  main
    .main-header
      .all
        h1 Титульная страница
        .pagination
          .pagination-label 1/9
          .pagination-nav
            .arr-l
              SvgIcon(name="arrow-l" title="")
            .arr-r
              SvgIcon(name="arrow-r" title="")
    section.content
      .all
    .main-footer
      .all
        .pagination
          .pagination-label 1/9
          .pagination-nav
            .arr-l
              SvgIcon(name="arrow-l" title="")
            .arr-r
              SvgIcon(name="arrow-r" title="")
//- end over
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import AddTodo from "@/components/AddTodo.vue";
import SvgIcon from "@/components/SvgIcon";

export default {
  name: "App",
  components: {
    SvgIcon
  },
};
</script>

<style>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
</style>
