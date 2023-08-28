<template lang="pug">
.over
	header.header
		.all
			.b-link
				router-link(to="/").link-logo
					img(src="@img/logo-sm.svg" alt="")
			.header-search
				input.input.input--search(placeholder="Поиск по моим программам")
			.header-content
				.header-btns
					router-link.btn(:to="{name: 'constructor'}") Добавить программу
					AuthInfo
	
	.main-wrapper
		aside.aside.aside--middle
			.aside-column
				.aside-column__content
					nav.aside-menu-wrapper
						ul.aside-menu
							li.aside-menu__item
								router-link(to="programs").btn.btn--white
									SvgIcon(name="i-file" title="")
									| Программы
							li.aside-menu__item
								router-link(to="programs").btn.btn--white
									SvgIcon(name="i-file-dotted" title="")
									| Черновики программ
							li.aside-menu__item
								router-link(to="programs").btn.btn--white
									SvgIcon(name="i-trash" title="")
									| Корзина
				.aside-column__footer
					router-link(to="programs").btn.btn--gray
						SvgIcon(name="i-gearsix" title="")
						| Техническая поддержка
		main.main
			.main-header
				.all
					h1.h1.h1--big Титульная страница
			
			section.content
				.all
					.table-header
						.table-header__left.table-header--filter
							.lg-icon
								SvgIcon.ic20(name="i-faders-horizontal" title="")
							Dropdown.dropdown--status(v-model="selectedStatusProgramm" :options="statusProgramm" optionLabel="name" appendTo="self" placeholder="Статус" @change="onLoadPrograms" class="w-full md:w-14rem")

							Dropdown(v-model="selectedCategoryProgramm" appendTo="self" :options="categoryProgramm" optionLabel="name" placeholder="Категория программы" @change="onLoadPrograms" class="")
						
						.table-header__right.table-header--sort
							.lg-icon
								SvgIcon.ic20(name="i-arrows-down-up" title="")
							Dropdown.dropdown--sorting(v-model="selectedSortProgramm" appendTo="self" :options="sortProgramm" optionLabel="name" placeholder="По дате создания" @change="onLoadPrograms" class="")
					DataTable.table-programm(
						:value="programs"
						lazy
						paginator
						:rows="2"
						:rowsPerPageOptions="[2, 5, 10, 50]"
						v-model:filters="filters"
						v-model:expandedRows="expandedRows"
						ref="dt"
						dataKey="id"
						:totalRecords="totalRecords"
						:loading="loading"
						selectionMode="single"
						v-model:selection="selectedProduct"
						@row-click="showAction($event)"
						@page="onPage($event)"
						@sort="onSort($event)"
						@filter="onFilter($event)"
						paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
						)
						Column.td-name(field="name" expander header="Название программы" filterMatchMode="startsWith")
							template(#body="slotProps")
								.text-name
									| {{ slotProps.data.id }} - {{ slotProps.data.name }}
								.text-date
									| {{ slotProps.data.created_at.date }}
								.text-row(v-if="mqSize.lg > windowsSize && slotProps.data.status" v-html="getStatus(slotProps.data.status.name)")
								
						getSeverity(slotProps.data.status)
						Column.td-status(field="status" v-if="mqSize.lg < windowsSize" header="Статус" filterField="status" filterMatchMode="contains")
							template(#body="slotProps")
								.flex.align-items-center.gap-2(v-if="slotProps.data.status" :value="slotProps.data.status.name" v-html="getStatus(slotProps.data.status.name)" )
						Column.td-category.td-toggler(field="name" expander header="Категория" filterMatchMode="contains")
							template(#body="slotProps")
								.tuggler-text( :value="slotProps.data.categories.name")
									.category-item(v-for="(category, index) in slotProps.data.categories" :key="index")
										| {{ category.name }}
								.tuggler-buttons
									a.btn.btn--inline(href="#")
										SvgIcon(name="i-eye" title="")
										| Посмотреть
									a.btn.btn--inline(href="#")
										SvgIcon(name="i-download" title="")
										| Скачать
									a.btn.btn--inline(href="#")
										SvgIcon(name="i-eyeglasses" title="")
										| Результат экспертизы
						//Column(field="representative.name" header="Representative" filterField="representative.name" sortable)
						//  template( #filter="{filterModel,filterCallback}")
						//    InputText.p-column-filter(type='text' v-model='filterModel.value' @keydown.enter='filterCallback()' placeholder='Search')
						template(#expansion="slotProps" v-if="mqSize.lg > windowsSize")
							// | {{ slotProps.data.id }}
							.tuggler-buttons.--mobile
								a.btn.btn--inline(href="#")
									SvgIcon(name="i-eye" title="")
									| Посмотреть
								a.btn.btn--inline(href="#")
									SvgIcon(name="i-download" title="")
									| Скачать
								a.btn.btn--inline(href="#")
									SvgIcon(name="i-eyeglasses" title="")
									| Результат экспертизы
		
	
	.footer-navigation
		ul.footer-navigation__list
			li.footer-navigation__item
				router-link.footer-navigation__item-link.active(to="programs")
					.b-icon
						SvgIcon.ic24(name="i-file" title="")
					.b-label Программы
			li.footer-navigation__item
				router-link.footer-navigation__item-link(to="programs")
					.b-icon
						SvgIcon.ic24(name="i-file-dotted" title="")
					.b-label Черновики
			li.footer-navigation__item
				router-link.btn-add-modal(:to="{name: 'constructor'}")
					SvgIcon.ic24(name="i-plus" title="")
			li.footer-navigation__item
				router-link.footer-navigation__item-link(to="programs")
					.b-icon
						SvgIcon.ic24(name="i-trash" title="")
					.b-label Корзина
			li.footer-navigation__item
				router-link.footer-navigation__item-link(to="programs")
					.b-icon
						SvgIcon.ic24(name="i-usercircle" title="")
					.b-label Профиль
	ModalPopup
//- end over
</template>
<script setup>
import "primevue/resources/themes/lara-light-blue/theme.css";

import { ref, computed, onMounted } from "vue";
import { ProgramsService } from "@/service/ProgramsService";

import store from "@/store";

// eslint-disable-next-line no-unused-vars
const mqSize = computed(() => store.state.general.mqSize);
// eslint-disable-next-line no-unused-vars
const windowsSize = computed(() => store.state.general.windowsSize);
// eslint-disable-next-line no-unused-vars
const selectedProduct = ref();
// eslint-disable-next-line no-unused-vars
const expandedRows = ref([]);




const dt = ref();
const loading = ref(false);
const totalRecords = ref(0);
const programs = ref();
const selectedCustomers = ref();
const selectAll = ref(false);
// const filters = ref({
//   name: { value: "", matchMode: "contains" },
//   "country.name": { value: "", matchMode: "contains" },
//   company: { value: "", matchMode: "contains" },
//   "representative.name": { value: "", matchMode: "contains" }
// });

// eslint-disable-next-line no-unused-vars
const selectedSortProgramm = ref();
// eslint-disable-next-line no-unused-vars
const sortProgramm = ref([
  {name: "По дате создания от большего к меньшему", params: {sort_order: "asc", sort_by: "date_create", type: "sortProgramm"}},
  {name: "По дате создания от меньшего к большему", params: {sort_order: "desc", sort_by: "date_create", type: "sortProgramm"}},
  {name: "По алфавиту от А до Я", params: {sort_order: "asc", sort_by: "name", type: "sortProgramm"}},
  {name: "По алфавиту от Я до А", params: {sort_order: "desc", sort_by: "name", type: "sortProgramm"}}
]);

// eslint-disable-next-line no-unused-vars
const selectedStatusProgramm = ref();
// eslint-disable-next-line no-unused-vars
const statusProgramm = ref([
	{name: "Все", code: "0", params: {status_id: "0", type: "sortProgramm"}},
	{name: "На доработку", code: "revision", params: {status_id: "0", type: "sortProgramm"}},
  {name: "На экспертизе", code: "examination", params: {status_id: "0", type: "sortProgramm"}},
  {name: "Одобрена", code: "approved", params: {status_id: "0", type: "sortProgramm"}},
  {name: "Отклонена", code: "rejected", params: {status_id: "0", type: "sortProgramm"}},
  {name: "На портале ДПО", code: "dpo", params: {status_id: "0", type: "sortProgramm"}}
]);

// eslint-disable-next-line no-unused-vars
const selectedCategoryProgramm = ref();
// eslint-disable-next-line no-unused-vars
const categoryProgramm = ref([
  { name: "Категория 1", code: "revision" },
  { name: "Специалисты, сопровождающие деятельность ОО", code: "examination" },
  { name: "Категория 2", code: "approved" },
  { name: "Категория 3", code: "rejected" },
  { name: "пециалисты, сопровождающ", code: "dpo" },
  { name: "Категория 1", code: "revision" },
  { name: "Специалисты, сопровождающие деятельность ОО", code: "examination" },
  { name: "Категория 2", code: "approved" },
  { name: "Категория 3", code: "rejected" },
  { name: "пециалисты, сопровождающ", code: "dpo" },
  { name: "Категория 1", code: "revision" },
  { name: "Специалисты, сопровождающие деятельность ОО", code: "examination" },
  { name: "Категория 2", code: "approved" },
  { name: "Категория 3", code: "rejected" },
  { name: "пециалисты, сопровождающ", code: "dpo" }
]);

const lazyParams = ref({});


onMounted(() => {
	store.commit("general/setTheme", "theme-light");
	loading.value = true;
	lazyParams.value = {
		page: 1,
		per_page: dt.value.rows,
	};
	loadLazyData();
});

// eslint-disable-next-line no-unused-vars
const showAction = (event) => { // туглер таблицы для мобилы
	const isExpanded = expandedRows.value.find((p) => p.id === event.data.id)
	console.log('isExpanded', isExpanded)
	if (isExpanded === undefined) {
		expandedRows.value = [event.data, ...expandedRows.value];
	} else {
		expandedRows.value = expandedRows.value.filter(x => x.id !== event.data.id)
	}
	//
	//
}
// eslint-disable-next-line no-unused-vars
const getStatus = status => {
	console.log('status', status)
  switch (status) {
    case "На доработку":
      return '<span class="badge-status --revision">На доработку</span>';

    case "На экспертизе":
      return '<span class="badge-status --examination">На экспертизе</span>';

    case "Одобрена":
      return '<span class="badge-status --approved">Одобрена</span>';

    case "Отклонена":
      return '<span class="badge-status --rejected">Отклонена</span>';

    case "На портале ДПО":
      return '<span class="badge-status --dpo">На портале ДПО</span>';

    case "":
      return null;
  }
};

const loadLazyData = () => {
  loading.value = true;

  setTimeout(() => {
    ProgramsService.getCustomers(
       lazyParams.value
    ).then(data => {
      // console.log("data", data.data);
			//console.log('slotProps.data.status.name', data.data.items[0].status)
      programs.value = data.data.items;
      totalRecords.value = data.data.pagination.total;
      loading.value = false;
    });
  }, Math.random() * 1000 + 250);
};
// eslint-disable-next-line no-unused-vars
const onPage = event => {
	console.log('onPage', JSON.parse(JSON.stringify(event)));
	let params = null;
	let val = JSON.parse(JSON.stringify(event));
	// формируем нужный нам вид
	params = {
		value: {params: {page: val.page + 1, per_page: val.rows}}
	}
  // lazyParams.value = event;
	onLoadPrograms(params);
};
// eslint-disable-next-line no-unused-vars
// const onSort = event => {
//   lazyParams.value = event;
//   loadLazyData();
// };
// eslint-disable-next-line no-unused-vars
// const onFilter = () => {
//   lazyParams.value.filters = filters.value;
//   loadLazyData();
// };

// eslint-disable-next-line no-unused-vars
const onRowSelect = () => {
  selectAll.value = selectedCustomers.value.length === totalRecords.value;
};
// eslint-disable-next-line no-unused-vars
const onRowUnselect = () => {
  selectAll.value = false;
};

// eslint-disable-next-line no-unused-vars
const onLoadPrograms = (event, param) => {

	console.log('event', event)
	// обьединяем установленные параметры и новые
	Object.assign(lazyParams.value, event.value.params)
	
  ProgramsService.getCustomers(lazyParams.value).then(
    data => {
      programs.value = data.data.items;
      totalRecords.value = data.data.pagination.total;
      loading.value = false;
    }
  );
};
</script>

<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
