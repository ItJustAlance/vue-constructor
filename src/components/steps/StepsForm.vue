<template lang="pug">
.formSteps
  .form
    .form-row
      label.form-label
        span.text Организация
      .form-input
        textarea.input
    .form-row
      label.form-label
        span.text Название программы
      .form-input
        textarea.input
    .form-row
      label.form-label
        span.text Цель программы
        SvgIcon(name="brain" title="")
      .form-input
        textarea.input
    .form-row
      label.form-label
        span.text Выберите авторов
      .form-input
        JustMultiselect(
          :list="[{title: 'Иванова Мария Сергееевна', value: 'val1'}, {title: 'Трамп Иванка Дональдовна', value: 'val2'}, {title: 'Иванов Василий Яковлевич', value: 'val3'}]"
          placeholder="Выберите авторов"
        )
</template>

<script>
// import { ref } from "vue";
import { useStore } from "vuex";
import JustMultiselect from "@/components/just/justMultiSelect";
export default {
  name: "StepsForm",
  components: { JustMultiselect },
  setup() {
    const store = useStore();
    const Step = step => {
      store.dispatch("todos/onDeleteTodo", step);
    };
    return {
      Step
    };
  }
};
</script>

<style scoped></style>
