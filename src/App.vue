<template lang="pug">
.over-wrapper(:class="theme")
	router-view
	#mq-detect.box--special
		#mq-xs
		#mq-sm
		#mq-md
		#mq-lg
		#mq-xl
		#mq-hd
		#mq-full
//- end over
</template>

<script>
// import { useRoute } from 'vue-router';
import store from "@/store";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {},
  computed: {
    ...mapState("general", ["theme", "mqSize"])
  },
  async mounted() {
    await store.dispatch("auth/init");
    // определение типа отображения в зависимости от ширины экрана (в 100% соответствии с медиа запросами css)
    this.initMqDetect();
  },
  methods: {
    initMqDetect() {
      let widthSize = window.innerWidth;
      let mqBreakpoint = null;
      // console.log('widthSize', widthSize)
      switch (true) {
        case widthSize <= this.mqSize.xs:
          mqBreakpoint = "mq-xs";
          break;
        case widthSize <= this.mqSize.sm:
          mqBreakpoint = "mq-sm";
          break;
        case widthSize <= this.mqSize.md:
          mqBreakpoint = "mq-md";
          break;
        case widthSize <= this.mqSize.lg:
          mqBreakpoint = "mq-lg";
          break;
        case widthSize <= this.mqSize.xl:
          mqBreakpoint = "mq-xl";
          break;
        case widthSize <= this.mqSize.hd:
          mqBreakpoint = "mq-hd";
          break;
        default:
          mqBreakpoint = "mq-full";
      }
      console.log("mqBreakpoint", mqBreakpoint);
      this.$store.commit("general/SET_MEDIA_QUERY_DETECTED", mqBreakpoint);
    }
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
