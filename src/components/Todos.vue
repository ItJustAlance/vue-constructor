<template lang="pug">
div
  | 11
  SvgIcon(name="arrow" title="Название")
  SvgIcon(name="arrow10" title="Название")
  || 22
  .legend
    span Double click to mark as complete
    span
      span.incomplete-box
      |  = Incomplete
    span
      span.complete-box
      |  = Complete
  div
    button.hide(@click='toggleVisibility') Hide Todos
  .todos(v-if='isVisible')
    .todo(v-for='todo in todos' :key='todo.id' @dblclick='updateTodo(todo)' v-bind:class="{ 'is-complete': todo.completed }")
      p {{ todo.title }}
      i.fas.fa-trash-alt(v-on:click='deleteTodo(todo.id)')

</template>
<script>
import { useStore, mapState } from 'vuex'
import { useToggle } from "@/composables/useToggle";

import SvgIcon from '@/components/SvgIcon';

export default {
  name: "Todos",
  components: {
    SvgIcon
   },
  setup() {
    const store = useStore();

    // todos
    const deleteTodo = id => {
      store.dispatch("todos/onDeleteTodo", id);
    };

    const updateTodo = todo => {
      const updatedTodo = {
        title: todo.title,
        id: todo.id,
        completed: !todo.completed
      };
      store.dispatch("todos/onUpdateTodo", updatedTodo);
    };

    // visibility
    const { isVisible, toggleVisibility } = useToggle();

    return {
      isVisible,
      toggleVisibility,
      deleteTodo,
      updateTodo
    };
  },
  computed: {
    ...mapState('todos', ['todos']),
  },
  methods: {
  
  },
  mounted () {
    this.$store.dispatch('todos/onFetchTodos')
  }
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}
.hide {
  background: #a7b597;
  color: #fff;
  border: 1px #a7b597 solid;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
