<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
} from '@headlessui/vue';
import { notify } from '../../composables/notify';
import AppInput from '../../components/ui/AppInput.vue';
import BaseSelect from '../../components/ui/BaseSelect.vue';
import IconExit from '../../components/icons/IconExit.vue';
import IconProcessing from '../../components/icons/IconProcessing.vue';

const store = useStore();
const router = useRouter();
const applications = computed(
	() => store.state.applications
);

async function getApps() {
	const applicationsResponse = await axios.get(
		'http://127.0.0.1:8000/api/getAllApps',
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	store.commit(
		'setApplications',
		applicationsResponse.data.applications
	);
}

onMounted(() => {
	getApps();
});

const form = ref({
	specialist_name: '',
	topic: '',
	job_title: '',
	status: '',
	phonenum: '',
	account_number: '',
	createddate: '',
	comment: '',
});

const errors = ref({
	specialist_name: '',
	topic: '',
	job_title: '',
	status: '',
	phonenum: '',
	comment: '',
});

function resetModalApp() {
	form.value = {
		specialist_name: '',
		topic: '',
		job_title: '',
		status: '',
		phonenum: '',
		createddate: '',
		comment: '',
	};

	errors.value = {
		specialist_name: '',
		topic: '',
		job_title: '',
		status: '',
		phonenum: '',
		comment: '',
	};
}

const token = JSON.parse(
	localStorage.getItem('accessToken')
);

const loading = ref(false);
async function createApp() {
	try {
		loading.value = true;

		await axios
			.post(
				'http://127.0.0.1:8000/api/createApp',
				form.value,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				console.log(res, 'res');
				store.commit(
					'setApplications',
					res.data.applications
				);

				closeModal();

				notify(
					'message',
					'Заявка успешно создана!'
				);
			});

		loading.value = false;
	} catch (error) {
		loading.value = false;

		if (error.response.data.error) {
			errors.value = error.response.data.error;

			notify(
				'error',
				'Проверьте корректность введенных данных!'
			);
		}
	}
}

async function deleteApp(appId) {
	try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/deleteApp/${appId}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (response.ok) {
			store.commit('deleteApp', appId);
			notify(
				'message',
				'Заявка успешно удалена!'
			);
		}
	} catch (error) {
		notify(
			'error',
			'Ошибка при удалении заявки!'
		);

		console.error(
			'Ошибка при удалении заявки:',
			error.message
		);
	}
}

const roleVariants = [
	{
		value: 'Инженер эксплуатации фшпд',
		label: 'Инженер эксплуатации фшпд',
	},
	{
		value: 'Фшпд маркетинг',
		label: 'Фшпд маркетинг',
	},
	{
		value: 'Фронтенд разработчик',
		label: 'Фронтенд разработчик',
	},
	{
		value: 'Бекэнд разработчик',
		label: 'Бекэнд разработчик',
	},
	{
		value: 'Ux/Ui Дизайн',
		label: 'Ux/Ui Дизайн',
	},
];

// Status variants
const statusVariants = [
	{
		value: 'В процессе',
		label: 'В процессе',
	},
	{
		value: 'Передан специалисту',
		label: 'Передан специалисту',
	},
	{
		value: 'Завершен',
		label: 'Завершен',
	},
];

const isOpen = ref(false);
function closeModal() {
	isOpen.value = false;
	resetModalApp();
}
function openModal() {
	isOpen.value = true;
	generateRandomNum();
	setCurrentDate();
}

const isEditOpen = ref(false);
function closeEditModal() {
	isEditOpen.value = false;
	resetModalApp();
}
function openEditModal() {
	isEditOpen.value = true;
	generateRandomNum();
	setCurrentDate();
}

function generateRandomNum() {
	const randomNumber =
		Math.floor(Math.random() * 90000) + 10000;
	form.value.account_number =
		randomNumber.toString();
}

function setCurrentDate() {
	const currentDate = new Date();
	const formattedDate =
		currentDate.toLocaleString('ru-RU', {
			year: 'numeric',
			day: '2-digit',
			month: '2-digit',
		});

	form.value.createddate = formattedDate.replace(
		/\./g,
		''
	);
}

const editingApp = ref(null);
const editedApp = ref({
	specialist_name: '',
	topic: '',
	job_title: '',
	status: '',
	phonenum: '',
	comment: '',
});

async function editApp(appId) {
	openEditModal();
	const appToEdit = applications.value.find(
		(app) => app.id === appId
	);

	if (appToEdit) {
		editedApp.value = { ...appToEdit };
		editingApp.value = appId;
	}
}

const loadingEdit = ref(false);
async function saveEditedApp() {
	try {
		loadingEdit.value = true;

		await axios
			.put(
				`http://127.0.0.1:8000/api/updateApp/${editingApp.value}`,
				editedApp.value,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				notify(
					'message',
					'Заявка успешно обновлена!'
				);

				store.commit(
					'setApplications',
					res.data.applications
				);

				console.log(
					res.data.application,
					'data.application'
				);

				closeEditModal();
			});
		loadingEdit.value = false;
	} catch (error) {
		loadingEdit.value = false;

		if (error.response.data.error) {
			errors.value = error.response.data.error;

			notify(
				'error',
				'Проверьте корректность введенных данных!'
			);
		}
	}
}

function cancelEdit() {
	editingApp.value = null;
	closeEditModal();
}

const getApplication = (app) => {
	router.push({
		name: 'app',
		params: { app: app.account_number },

		query: {
			id: app.id,
			name: app.specialist_name,
			topic: app.topic,
			account_number: app.account_number,
			status: app.status,
			job_title: app.job_title,
			phonenum: app.phonenum,
			comment: app.comment,
		},
	});
};
</script>

<template>
	<!-- create application -->
	<TransitionRoot
		appear
		:show="isOpen"
		as="template"
	>
		<Dialog as="div" class="relative z-10">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black/25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div
					class="flex min-h-full items-center justify-center p-4 text-center"
				>
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel
							class="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
						>
							<div>
								<div
									class="flex justify-between items-center pb-2 mb-5 border-b-2"
								>
									<h2 class="text-xl font-bold">
										Новая заявка
									</h2>

									<IconExit @click="closeModal" />
								</div>

								<div
									class="flex flex-col sm:flex-row justify-between sm:space-x-5 space-y-5 sm:space-y-0 border-b-2 pb-5"
								>
									<div class="w-full space-y-4">
										<div class="space-y-1">
											<AppInput
												size="lg"
												type="text"
												title="ФИО"
												placeholder="Иван Иванов"
												:disabled="loading"
												v-model="
													form.specialist_name
												"
												:error="
													errors.specialist_name
												"
											/>
										</div>

										<div class="space-y-1">
											<AppInput
												size="lg"
												type="text"
												title="Тема заявки"
												placeholder="Сменить тариф"
												:disabled="loading"
												v-model="form.topic"
												:error="errors.topic"
											/>
										</div>

										<BaseSelect
											:classes="'p-4 border w-full rounded-md focus:outline-none focus:ring-0 focus:border-blue-10'"
											:disabled="loading"
											v-model="form.job_title"
											:options="roleVariants"
											:error="errors.job_title"
											placeholder="Выберите специалиста"
										/>

										<BaseSelect
											:classes="'p-4 border w-full rounded-md focus:outline-none focus:ring-0 focus:border-blue-10'"
											:disabled="loading"
											v-model="form.status"
											:options="statusVariants"
											:error="errors.status"
											placeholder="Статус заявки"
										/>
									</div>

									<div class="w-full space-y-4">
										<div class="space-y-1">
											<AppInput
												size="lg"
												type="text"
												:maska="'#########'"
												title="Номер телефона"
												placeholder="901000801"
												:disabled="loading"
												v-model="form.phonenum"
												:error="errors.phonenum"
											/>
										</div>

										<AppInput
											size="lg"
											type="text"
											title="Лицевой счет"
											disabled
											placeholder="Ваш лицевой счет"
											v-model="
												form.account_number
											"
										/>

										<AppInput
											size="lg"
											type="text"
											disabled
											placeholder="01.12.2023"
											:maska="'##.##.####'"
											title="Дата обращения"
											v-model="form.createddate"
										/>
									</div>
								</div>
							</div>

							<div class="space-y-1">
								<textarea
									v-model="form.comment"
									:disabled="loading"
									:class="{
										'!bg-gray-50 cursor-not-allowed':
											loading,

										'!border-red-500 !text-red-600 !placeholder-red-700':
											errors.comment,
									}"
									class="p-2 w-full h-32 mt-5 border text-sm rounded-lg outline-none focus:outline-none focus:ring-0 focus:border-blue-10"
									placeholder="Коментарии"
								></textarea>

								<p
									v-if="errors.comment"
									class="text-red-500 text-xs"
								>
									{{ errors.comment[0] }}
								</p>
							</div>

							<button
								@click="createApp"
								:disabled="loading"
								:class="{
									'bg-blue-10 opacity-80':
										loading,
								}"
								class="flex justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-200 border rounded-full text-sm font-bold px-4 mt-5 pt-1.5 pb-2 w-full"
							>
								<IconProcessing
									class="fill-blue-10"
									v-if="loading"
								/>
								<p v-else>Создать</p>
							</button>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>

	<!-- edit app -->
	<TransitionRoot
		appear
		:show="isEditOpen"
		as="template"
	>
		<Dialog as="div" class="relative z-10">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black/25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div
					class="flex min-h-full items-center justify-center p-4 text-center"
				>
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel
							class="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
						>
							<div>
								<div
									class="flex justify-between items-center pb-2 mb-5 border-b-2"
								>
									<h2 class="text-xl font-bold">
										Изменить заявку
									</h2>

									<IconExit @click="cancelEdit" />
								</div>

								<div
									class="flex flex-col sm:flex-row justify-between sm:space-x-5 space-y-5 sm:space-y-0 border-b-2 pb-5"
								>
									<div class="w-full space-y-4">
										<div class="space-y-1">
											<AppInput
												size="lg"
												type="text"
												title="ФИО"
												placeholder="Иван Иванов"
												:disabled="loadingEdit"
												v-model="
													editedApp.specialist_name
												"
												:error="
													errors.specialist_name
												"
											/>
										</div>

										<div class="space-y-1">
											<AppInput
												size="lg"
												type="text"
												title="Тема заявки"
												placeholder="Сменить тариф"
												:disabled="loadingEdit"
												v-model="editedApp.topic"
												:error="errors.topic"
											/>
										</div>

										<BaseSelect
											:classes="'p-4 border w-full rounded-md focus:outline-none focus:ring-0 focus:border-blue-10'"
											:disabled="loadingEdit"
											v-model="
												editedApp.job_title
											"
											:options="roleVariants"
											:error="errors.job_title"
											placeholder="Выберите специалиста"
										/>

										<BaseSelect
											:classes="'p-4 border w-full rounded-md focus:outline-none focus:ring-0 focus:border-blue-10'"
											:disabled="loadingEdit"
											v-model="editedApp.status"
											:options="statusVariants"
											:error="errors.status"
											placeholder="Статус заявки"
										/>
									</div>

									<div class="w-full space-y-4">
										<div class="space-y-1">
											<AppInput
												size="lg"
												type="text"
												:maska="'#########'"
												title="Номер телефона"
												placeholder="901000801"
												:disabled="loadingEdit"
												v-model="
													editedApp.phonenum
												"
												:error="errors.phonenum"
											/>
										</div>

										<AppInput
											size="lg"
											type="text"
											title="Лицевой счет"
											:disabled="true"
											placeholder="Ваш лицевой счет"
											v-model="
												form.account_number
											"
										/>

										<AppInput
											size="lg"
											type="text"
											:disabled="true"
											placeholder="01.12.2023"
											:maska="'##.##.####'"
											title="Дата обращения"
											v-model="form.createddate"
										/>
									</div>
								</div>
							</div>

							<div class="space-y-1">
								<textarea
									v-model="editedApp.comment"
									:disabled="loadingEdit"
									:class="{
										'!bg-gray-50 cursor-not-allowed':
											loadingEdit,

										'!border-red-500 !text-red-600 !placeholder-red-700':
											errors.comment,
									}"
									class="p-2 w-full h-32 mt-5 border text-sm rounded-lg outline-none focus:outline-none focus:ring-0 focus:border-blue-10"
									placeholder="Коментарии"
								></textarea>

								<p
									v-if="errors.comment"
									class="text-red-500 text-xs"
								>
									{{ errors.comment[0] }}
								</p>
							</div>

							<button
								@click="saveEditedApp"
								:disabled="loadingEdit"
								:class="{
									'bg-blue-10 opacity-80':
										loadingEdit,
								}"
								class="flex justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-200 border rounded-full text-sm font-bold px-4 mt-5 pt-1.5 pb-2 w-full"
							>
								<IconProcessing
									class="fill-blue-10"
									v-if="loadingEdit"
								/>
								<p v-else>Изменить</p>
							</button>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>

	<section
		class="bg-gray-50 w-full h-screen overflow-scroll"
	>
		<!-- User list table -->
		<div
			class="inline-block min-w-full align-middle px-4 mt-6"
		>
			<div
				class="shadow-md px-2 py-3 space-y-4 bg-white overflow-hidden border border-gray-200 md:rounded-lg"
			>
				<div
					class="flex justify-center sm:justify-between items-center px-3 border-b pb-3"
				>
					<p class="text-xl font-bold">
						Список заявок
					</p>

					<button
						@click="openModal"
						type="submit"
						class="hidden sm:block bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-200 border rounded-full text-sm font-bold px-4 pt-1.5 pb-2"
					>
						Создать заявку
					</button>
				</div>

				<!-- desktop table -->
				<div class="hidden xl:block">
					<table
						class="min-w-full divide-y divide-gray-200"
					>
						<thead class="bg-gray-50">
							<tr>
								<th
									scope="col"
									class="px-12 py-3.5 text-sm text-left rtl:text-right font-bold"
								>
									ФИО
								</th>

								<th
									scope="col"
									class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right"
								>
									<button
										class="flex items-center gap-x-3 focus:outline-none font-bold"
									>
										<span>Тема заявки</span>

										<svg
											class="h-3"
											viewBox="0 0 10 11"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
												fill="currentColor"
												stroke="currentColor"
												stroke-width="0.1"
											/>
											<path
												d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
												fill="currentColor"
												stroke="currentColor"
												stroke-width="0.1"
											/>
											<path
												d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
												fill="currentColor"
												stroke="currentColor"
												stroke-width="0.3"
											/>
										</svg>
									</button>
								</th>

								<th
									scope="col"
									class="px-1 py-3.5 text-sm text-left rtl:text-right font-bold"
								>
									Лицевой счёт
								</th>

								<th
									scope="col"
									class="px-6 py-3.5 text-sm text-left rtl:text-right font-bold"
								>
									Статус
								</th>

								<th
									scope="col"
									class="px-4 py-3.5 text-sm text-left rtl:text-right font-bold"
								>
									Специалист
								</th>

								<th
									scope="col"
									class="px-2 py-3.5 text-sm text-left rtl:text-right font-bold"
								>
									Номер телефона
								</th>

								<th
									scope="col"
									class="px-8 py-3.5 text-sm text-left rtl:text-right font-bold"
								>
									Коментарии
								</th>

								<th
									scope="col"
									class="px-4 py-3.5 text-sm text-left rtl:text-right font-bold"
								>
									Редактировать
								</th>
							</tr>
						</thead>

						<tbody
							v-if="applications.length > 0"
							class="bg-white divide-y divide-gray-200"
						>
							<tr
								v-for="app in applications"
								:key="app.id"
								@click="getApplication(app)"
								class="cursor-pointer hover:bg-gray-50 active:bg-gray-100 duration-100"
							>
								<td
									class="px-4 py-4 whitespace-nowrap"
								>
									{{ app.specialist_name }}
								</td>

								<td
									class="px-4 py-4 whitespace-nowrap"
								>
									<h4
										class="flex text-gray-700 w-40 whitespace-break-spaces font-bold text-sm"
									>
										{{ app.topic }}
									</h4>
								</td>

								<td
									class="px-4 py-4 whitespace-nowrap"
								>
									<h4
										class="flex text-gray-700 w-40 whitespace-break-spaces font-bold text-sm"
									>
										{{ app.account_number }}
									</h4>
								</td>

								<td
									class="px-4 py-4 font-medium whitespace-nowrap"
								>
									<div
										:class="{
											'bg-yellow-100/60 text-yellow-500':
												app.status ==
												'В процессе',

											'bg-purple-100/60 text-secondary':
												app.status ==
												'Передан специалисту',

											'bg-emerald-100/60 text-emerald-500':
												app.status == 'Завершен',
										}"
										class="inline px-3 py-1 text-sm font-normal rounded-full gap-x-2"
									>
										{{ app.status }}
									</div>
								</td>
								<td
									class="px-4 py-4 text-sm whitespace-nowrap"
								>
									<h4 class="flex text-gray-700">
										{{ app.job_title }}
									</h4>
								</td>
								<td
									class="px-8 py-4 text-sm whitespace-nowrap"
								>
									<h4 class="flex text-gray-700">
										+992-{{ app.phonenum }}
									</h4>
								</td>

								<td class="px-4 py-4 text-sm">
									<span
										class="flex text-gray-700 text-center max-w-40 max-h-16 overflow-y-auto whitespace-normal border opacity-60 hover:opacity-100 duration-100 px-3 py-2 select-none cursor-pointer rounded-full text-xs font-mono"
									>
										{{ app.comment }}
									</span>
								</td>

								<td
									scope="row"
									class="pl-12 pr-4 py-4 whitespace-nowrap space-x-2"
								>
									<button
										@click.stop="editApp(app.id)"
										title="Изменить заявку"
										class="rounded-lg text-red-500 p-2 bg-white hover:bg-gray-100 border"
									>
										<svg
											width="20"
											height="20"
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M10 18.1213H19M14.5 1.62132C14.8978 1.2235 15.4374 1 16 1C16.2786 1 16.5544 1.05487 16.8118 1.16148C17.0692 1.26808 17.303 1.42434 17.5 1.62132C17.697 1.8183 17.8532 2.05216 17.9598 2.30953C18.0665 2.5669 18.1213 2.84274 18.1213 3.12132C18.1213 3.3999 18.0665 3.67574 17.9598 3.93312C17.8532 4.19049 17.697 4.42434 17.5 4.62132L5 17.1213L1 18.1213L2 14.1213L14.5 1.62132Z"
												stroke="#00B956"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</button>

									<button
										@click.stop="
											deleteApp(app.id)
										"
										title="Удалить заявку"
										class="rounded-lg text-red-500 p-2 bg-white hover:bg-gray-100 border"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-5 h-5"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- mobile table -->
				<div class="xl:hidden">
					<table
						class="min-w-full divide-y divide-gray-200"
					>
						<tbody
							v-if="applications.length > 0"
							class="bg-white divide-y divide-gray-200"
						>
							<tr
								v-for="app in applications"
								:key="app.id"
								@click="getApplication(app)"
								class="cursor-pointer hover:bg-gray-50 active:bg-gray-100 duration-100 flex items-start justify-between p-3"
							>
								<td
									class="flex flex-col items-start space-y-8 font-bold"
								>
									<div>
										<p>ФИО</p>
										<p
											class="bg-gray-100/60 -ml-2 px-2 py-1 rounded-full text-gray-500 text-sm font-normal"
										>
											{{ app.specialist_name }}
										</p>
									</div>

									<div>
										<p>Тема заявки</p>
										<p
											class="truncate w-28 sm:w-full bg-gray-100/60 -ml-2 px-2 py-1 rounded-full text-gray-500 text-sm font-normal"
										>
											{{ app.topic }}
										</p>
									</div>

									<div>
										<p>Лицевой счёт</p>
										<p
											class="bg-gray-100/60 -ml-2 px-2 py-1 w-fit rounded-full text-gray-500 text-sm font-normal"
										>
											{{ app.account_number }}
										</p>
									</div>

									<div>
										<p>Номер телефона</p>
										<p
											class="bg-gray-100/60 -ml-2 px-2 py-1 rounded-full text-gray-500 text-sm font-normal"
										>
											+992-{{ app.phonenum }}
										</p>
									</div>
								</td>

								<td
									class="flex flex-col items-end text-end space-y-6 font-bold"
								>
									<div class="space-y-1">
										<p>Редактировать</p>

										<div
											class="flex flex-col items-end space-y-1"
										>
											<button
												@click.stop="
													editApp(app.id)
												"
												class="hover:bg-gray-100 bg-yellow-100/60 text-yellow-500 border border-red-300 rounded-full font-medium text-sm px-2 py-1"
											>
												Изменить
											</button>

											<button
												@click.stop="
													deleteApp(app.id)
												"
												class="hover:bg-gray-100 bg-red-100/60 text-red-500 border border-red-300 rounded-full font-medium text-sm px-3.5 py-1"
											>
												Удалить
											</button>
										</div>
									</div>

									<div class="space-y-1">
										<p>Коментарии</p>
										<p
											class="w-40 sm:w-64 truncate overflow-auto bg-gray-100/60 text-gray-500 text-center text-sm font-normal -mr-3 px-2 py-1 rounded-full"
										>
											{{ app.comment }}
										</p>
									</div>

									<div class="space-y-1">
										<p>Специалист</p>
										<p
											class="bg-gray-100/60 text-gray-500 text-sm font-normal -mr-3 px-2 py-1 rounded-full"
										>
											{{ app.job_title }}
										</p>
									</div>

									<div class="space-y-1">
										<p>Статус</p>
										<p
											:class="{
												'bg-yellow-100/60 text-yellow-500':
													app.status ==
													'В процессе',

												'bg-purple-100/60 text-secondary':
													app.status ==
													'Передан специалисту',

												'bg-emerald-100/60 text-emerald-500':
													app.status ==
													'Завершен',
											}"
											class="text-center font-medium text-sm -mr-3 px-2 py-1 rounded-full"
										>
											{{ app.status }}
										</p>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="border-t pt-3 text-center">
					<button
						@click="openModal"
						type="submit"
						class="sm:hidden bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-200 border rounded-full text-sm font-bold px-4 pt-1.5 pb-2"
					>
						Создать заявку
					</button>
				</div>

				<div
					v-if="applications.length === 0"
					class="bg-white border-y border-gray-200"
				>
					<p
						class="text-center text-lg mx-auto p-4"
					>
						Список заявок пуст...
					</p>
				</div>
			</div>
		</div>
	</section>
</template>
