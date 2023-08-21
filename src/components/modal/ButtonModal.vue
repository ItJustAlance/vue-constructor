<template>
  <div>
    <div @click="openModal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/*
<button-modal
            button-text="Нажми Кнопку"
            modal-local-component="JustForm"
            :comp-params="{
            modalClass: 'modal-form-normal mobile-modal-bottom',
            modalComponentClass: 'class-component2'
            }"
            :modal-local-component-params='{"formId":12345435,"userId":3123435534,"fp":32135345,"formUrl":"/api/default/send-phone","formTitle":"Уз2нать о появлении квартир","formText":"Мы свяжемся с вами, чтобы вы первыми узнали о появлении в продаже квартир в данном ЖК или сможем вам предложить похожие варианты.","formInputs":[{"name":"name-phone","value":"","type":"phone","mask":"+7 (###) ###-##-##","validate":{"required":true,"regex":"/^+7s(d{3})sd{3}-d{2}-d{2}$/"},"errorMessage":{"required":"Обязательное поле для заполнения","regex":"Неправильный формат телефона"},"placeholder":"Ваш телефон"},{"name":"name-pass","value":"","placeholder":"пароль"},{"name":"name-email","value":"","placeholder":"Электронная почта","validate":"email","errorMessage":{"email":"Неправильный формат почты"}}],"formSubmitText":"Отправить заявку","formSmallText":"Нажимая на кнопку, вы соглашаетесь на обработку персональных данных в соответствии с <a>политикой конфиденциальности</a>"}'
    ></button-modal>

 */
import { mapActions } from "vuex";

// Кнопка вызывает модальное окно с передачей данных в store

export default {
  name: "ButtonModal",
  components: {},
  props: {
    modalLocalComponent: {
      // Название компонента передано локально
      type: String,
      default: null
    },
    modalLocalComponentParams: {
      // Передача параметров в компонент локально
      type: [Array, Object],
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    compParams: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },

  data() {
    return {
      isLoaded: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions("modals", [
      "toggleModal",
      "setCurrentModalParams",
      "setModalComponent",
      "setModalComponentClass",
      "setModalBodyClass",
      "setModalClass"
    ]),
    openModal() {
      this.toggleModal(true);
      this.setCurrentModalParams(this.modalLocalComponentParams);
      this.setModalBodyClass(
        this.compParams.modalBodyClass ? this.compParams.modalBodyClass : ""
      ); // класс для Body модального окна
      this.setModalClass(
        this.compParams.modalClass ? this.compParams.modalClass : ""
      ); // класс для модального окна
      this.setModalComponentClass(
        this.compParams.modalComponentClass
          ? this.compParams.modalComponentClass
          : ""
      ); // класс для компонента
      //this.setModalComponent('FormLearnApartment'); // название компонента
      this.setModalComponent(this.modalLocalComponent); // название компонента
    }
  }
};
</script>

<style scoped lang="scss">
// @import "./src/assets/scss/common";
</style>
