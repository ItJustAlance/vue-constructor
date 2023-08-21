<template lang="pug">
.just-multiselect
  .just-multiselect-wrapper
    .just-multiselect__label
    .just-multiselect__dropdown
      ul.just-multiselect__list
        li.just-multiselect__item(v-for="(item, index) in list" @click="check(item.value)")
          .checkbox
          .text {{ item.title }}
  .just-multiselect-result
    .row-result(v-for="(item, index) in listResult")
      .text {{ item.title }}
</template>
<script>
export default {
  name: "justMultiselect",
  components: {},
  props: {
    list: {
      type: [Array, Object],
      required: false
    },
    placeholder: {
      type: String,
      required: false
    }
  },
  setup() {
    return {};
  },
  data: () => ({
    listResult: []
  }),
  computed: {
    // ...mapState('todos', ['todos']),
  },
  mounted() {},
  methods: {
    check(val) {
      const result = this.list.filter(el => el.value == val);
      this.listResult.push(result[0]);
    }
  }
};
</script>

<style scoped></style>
