<template lang="pug">
.over
  header.header
    .all
      .b-link
        router-link(to="/").link-main
          SvgIcon.ic16(name="arrow-l" title="")
          | Главная
      .header-content
        .header-message
          .header-message__text Методика проведения занятий математического кружка занятий математического кружка занятий математического кружка занятий математического кружка
        .header-btns
          a.btn.btn--second(href="#")
            SvgIcon.ic16(name="i-present" title="")
            | Предпросмотр
          a.btn(href="#") Сохранить в черновик
          a.btn.btn-second.--disabled(href="#") Отправить на согласование
          AuthInfo
  .main-wrapper
    aside.aside
      .nav-steps
        a.step-item(href="#")
          .num
            SvgIcon(name="num1" title="")
          .text Титул
        a.step-item(href="#")
          .num
            SvgIcon(name="num2" title="")
          .text Характеристика
        a.step-item(href="#")
          .num
            SvgIcon(name="num3" title="")
          .text Компетенции
        a.step-item(href="#")
          .num
            SvgIcon(name="num4" title="")
          .text Результаты
        a.step-item(href="#")
          .num
            SvgIcon(name="num5" title="")
          .text Содержание
        a.step-item(href="#")
          .num
            SvgIcon(name="num6" title="")
          .text Аттестация
        a.step-item(href="#")
          .num
            SvgIcon(name="num7" title="")
          .text Литература
        a.step-item(href="#")
          .num
            SvgIcon(name="num8" title="")
          .text Реализация
        a.step-item(href="#")
          .num
            SvgIcon(name="num9" title="")
          .text Кадровые условия
    main.main
      .main-header
        .all
          h1.h1 Титульная страница контсруктор
          Pagination
      section.content
        .all
          | 11
          router-link(to="/constructor2") констурктор 2 <br>
          router-link(to="/programs") программы <br>
          ButtonModal(
            class="control-item control-item__youtube"
            modal-local-component="Revision"
            :comp-params="{ modalClass: '', modalBodyClass: 'just-modal--right', modalComponentClass: ''}"
            :modal-local-component-params='{"videoTitle": "dd", "videoDate": "test"}'
            ) текст кнопки
  
          

          // StepsForm
  footer.footer
    .all
      Pagination
  ModalPopup
//- end over
</template>

<script>
import Pagination from "@/components/Pagination";
import StepsForm from "@/components/steps/StepsForm";
import store from "@/store";
export default {
  components: {
    Pagination,
    StepsForm
  },
	async mounted() {
		console.log('mounter constructor')
		await store.commit("general/setTheme", "theme-dark")

	},
	methods: {

	}
};


</script>

<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
