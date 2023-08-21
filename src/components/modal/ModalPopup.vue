<template>
  <div
    v-if="isOpenState"
    class="just-modal fade"
    :class="[{ open: isOpenState, in: isShowAnimate }, modalClass]"
  >
    <div class="just-modal__wrapper">
      <div class="just-modal__overlay" @click="closeModal"></div>
      <div class="just-modal__container">
        <div class="just-modal__body">
          <div v-if="isModalHeaderVisibility" class="modal-search__header">
            <div class="just-modal__header-box">
              <slot name="header"></slot>
            </div>
          </div>
          <!--end modal-search__header -->
          <div v-if="modalContentUpHtml" class="modal-search__header">
            <div
              class="just-modal__header-box"
              v-html="modalContentUpHtml"
            ></div>
          </div>
          <!--end modal-search__header -->
          <div v-if="isModalContentUp" class="just-modal__content">
            <div class="just-modal__content-wrap">
              <slot name="contentUp"></slot>
            </div>
          </div>
          <component
            v-if="modalComponentState !== ''"
            :class="modalComponentClass"
            :is="modalComponentState"
            :componentParams="componentParamsState"
          ></component>
          <div v-if="isModalContentDown" class="just-modal__content">
            <div class="just-modal__content-wrap">
              <slot name="contentDown"></slot>
            </div>
          </div>
          <div v-if="modalContentDownHtml" class="just-modal__content">
            <div
              class="just-modal__content-wrap"
              v-html="modalContentDownHtml"
            ></div>
          </div>
          <div class="just-modal__close-wrapper">
            <button type="button" class="just-modal__close" @click="closeModal">
              <SvgIcon class="ic32" name="close" title=""></SvgIcon>
            </button>
          </div>
        </div>
        <!--end just-modal__container -->
      </div>
      <!--end just-modal__body -->
    </div>
  </div>
</template>

<script>
/** {mobile-modal-bottom} - означает что в мобильной версии попап будет появляться снизу
 *
 * <button-modal
 *         class="control-item control-item__youtube"
 *         modal-local-component="JustModalVideo"
 *         :comp-params="{
 *             modalClass: 'just-modal-video',
 *             modalComponentClass: 'modal-video-adfox',
 *
 *             }"
 *         :modal-local-component-params='{"videoTitle": dataAdfox.novos, "videoSrc": dataAdfox.youtube,  "data":dataAdfox}'
 *     ><svg fill="#017eec" class="w_24 ic-video-youtube"><use xlink:href="#ic-video-youtube"></use></svg></button-modal>
 */

// import Spinner from "@/modules/app-search/components/spinner";
import { mapState, mapActions } from "vuex";

// Dynamic components которые можно использовать в попапах, у всех есть componentParams
import Revision from "@/components/modal/author/Revision";
//import FormLearnApartment from "@/modules/listing/listing-item/FormLearnApartment";
//import JustForm from "@/components/forms/JustForm";
//import JustModalVideo from "@/components/just-modal/JustModalVideo";

export default {
  name: "ModalPopup",
  components: {
    // Spinner,
    Revision
  },
  props: {
    modalSlots: {
      type: Boolean,
      required: false
    },
    showModal: {
      type: Boolean,
      default: false
    },
    data: {
      type: [Array, Object],
      required: false
    },
    isLoader: {
      type: Boolean,
      default: false
    },
    isLegend: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isShowAnimate: false,
      isLoaded: false
    };
  },
  computed: {
    ...mapState("modals", [
      "isOpenState",
      "modalClass",
      "modalBodyClass",
      "modalComponentClass",
      "modalComponentState",
      "componentParamsState",
      "options",
      "isModalHeaderVisibility",
      "isModalContentDown",
      "isModalContentUp",
      "modalContentDownHtml", // содержимое html
      "modalContentUpHtml" // содержимое html
    ])
  },
  watch: {
    isOpenState(value) {
      if (value) {
        document.body.classList.add("lock");
        document.body.classList.add(this.modalBodyClass);
        setTimeout(() => (this.isShowAnimate = true), 300);
      }
    }
  },
  methods: {
    ...mapActions("modals", ["toggleModal"]),
    closeModal() {
      document.body.classList.remove("lock");
      document.body.classList.remove(this.modalBodyClass);
      this.isShowAnimate = false;
      setTimeout(() => this.toggleModal(false), 200);
    }
  }
};
</script>

<style scoped lang="scss">
// @import "./src/assets/scss/common";
</style>
