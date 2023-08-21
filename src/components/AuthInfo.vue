<template lang="pug">
.auth-info-wrapper(v-if="user.first_name && isAuth")
  .auth-info(v-click-out-side="hide" :class="{show : show}")
    .auth-info__label(@click="show = !show")
      .auth-info__label-ico
        SvgIcon.ic16(name="i-usercircle" title="")
      .auth-info__label-name {{ user.first_name }}
      .auth-info__label-arr
        SvgIcon.ic16(name="chevron-down" title="")
    .auth-info__dropdown
      .name {{ user.first_name }}
      .text «Федеральный методический центр по финансовой грамотности системы общего и среднего профессионального образования»
      ul.auth-info__list
        li
          a.link-box(href="#")
            SvgIcon.ic16(name="i-gearsix" title="")
            .link-box__label Техническая поддержка
        li
          a.link-box.link--red(href="#")
            SvgIcon.ic16(name="i-door" title="")
            .link-box__label Выйти
  button.btn.btn--inline(@click="logout")
    SvgIcon.ic16(name="i-door" title="")
    | Выйти
.auth-info-wrapper(v-else)
  button.btn(@click="logout") Авторизация {{ user.first_name }}
</template>

<script>
// import { useRoute } from 'vue-router';
// import store from '@/store';
import clickOutSide from "@mahdikhashan/vue3-click-outside";

import { mapState } from "vuex";

export default {
  name: "AuthInfo",
  components: {},
  directives: {
    clickOutSide
  },
  computed: {
    ...mapState("auth", ["user", "isAuth"])
  },
  data() {
    return {
      show: false
    };
  },
  async mounted() {
    // await store.dispatch('auth/init');
    // this.popupItem = this.$el
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
    },
    hide() {
      console.log("hidee");
      this.show = false;
    }
  }
};
</script>

<style scoped></style>
