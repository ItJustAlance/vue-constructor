<template lang="pug">
.pagination
  .pagination-label 1/9
  .pagination-nav
    a.btn.arr-l.--disabled(href="#")
      SvgIcon(name="arrow-l" title="")
    a.btn.arr-r(href="#")
      SvgIcon(name="arrow-r" title="")
</template>

<script>
// import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "FilterTodos",

  setup() {
    const store = useStore();
    const nextPage = page => {
      store.dispatch("todos/onDeleteTodo", page);
    };
    return {
      nextPage
    };
  }
};
</script>

<style scoped></style>
