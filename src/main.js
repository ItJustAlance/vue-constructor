import "@/scss/_app.scss";

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

/** МОИ **/
import SvgIcon from "./components/SvgIcon";
import AuthInfo from "@/components/AuthInfo";
import ButtonModal from "@/components/modal/ButtonModal";
import ModalPopup from "@/components/modal/ModalPopup";

/*** библиотеки **/
import PrimeVue from "primevue/config";
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional

import Paginator from "primevue/paginator";

/* intialize Vue app */
const app = createApp(App);

// App.component('SvgIcon', SvgIcon);
app.use(store);
app.use(router);
app.use(PrimeVue);

app.component("SvgIcon", SvgIcon);
app.component("AuthInfo", AuthInfo);
app.component("ButtonModal", ButtonModal);
app.component("ModalPopup", ModalPopup);

/** primeVue components **/
import "primeicons/primeicons.css";

app.component("MultiSelect", MultiSelect);
app.component("InputText", InputText);
app.component("Dropdown", Dropdown);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Paginator", Paginator);

/* mount Vue app */
app.mount("#app");
/*
createApp(App)
  .use(store)
  .mount("#app");
*/
