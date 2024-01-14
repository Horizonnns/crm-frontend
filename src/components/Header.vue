<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { notify } from '../composables/notify';
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
} from '@headlessui/vue';
import IconLogo from '../components/icons/IconLogo.vue';
import AppInput from '../components/ui/AppInput.vue';
import IconLogout from '../components/icons/IconLogout.vue';

const store = useStore();
const router = useRouter();
const user = computed(() => store.state.user);

const searchTerm = ref('');
const apps = ref([]);
const errorMessage = ref('');

const isSearchOpen = ref(false);
function openSearch() {
	isSearchOpen.value = true;
}
function closeSearch() {
	isSearchOpen.value = false;
	searchTerm.value = '';
	apps.value = '';
	errorMessage.value = '';
}

const loadingSearch = ref(false);
const searchApplications = async () => {
	try {
		loadingSearch.value = true;

		const response = await axios.post(
			'http://127.0.0.1:8000/api/searchApps',
			{ search_term: searchTerm.value }
		);
		apps.value = response.data.applications;
		notify('message', 'Заявка успешно найдена!');

		loadingSearch.value = false;
	} catch (error) {
		loadingSearch.value = false;

		apps.value = [];
		errorMessage.value =
			'Такой заявки не существует...';

		notify(
			'error',
			'Такой заявки не существует!'
		);
	}
};

async function deleteApp(appId) {
	try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/deleteApp/${appId}`,
			{
				method: 'DELETE',
			}
		);

		if (response.ok) {
			store.commit('deleteApp', appId);
		} else {
			console.error(
				'Ошибка при удалении пользователя:',
				response.statusText
			);
		}
	} catch (error) {
		console.error(
			'Ошибка при удалении пользователя:',
			error.message
		);
	}
}

async function logOut() {
	store.commit('logout');

	await axios.post(
		'http://127.0.0.1:8000/api/logout',
		router.push('/register')
	);
}
</script>

<template>
	<!-- Search apps -->
	<TransitionRoot
		appear
		:show="isSearchOpen"
		as="template"
	>
		<Dialog
			as="div"
			@close="closeSearch"
			class="relative z-10"
		>
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
						<DialogPanel>
							<div
								class="bg-white rounded-lg min-w-[1250px] py-5 mt-5"
							>
								<div class="px-5">
									<label
										for="searchTerm"
										class="text-xl font-bold"
										>Поиск</label
									>

									<div class="relative py-4">
										<AppInput
											size="lg"
											type="text"
											title="Поиск заявок"
											placeholder="По Фио, по номеру, по лиц/счет"
											v-model="searchTerm"
											:disabled="loadingSearch"
										/>

										<button
											@click="searchApplications"
											class="absolute top-6 right-3"
										>
											<svg
												class="w-9 h-9 border rounded-full p-2 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 duration-200"
												aria-hidden="true"
												fill="none"
												stroke-width="1.5"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
													stroke-linecap="round"
													stroke-linejoin="round"
												></path>
											</svg>
										</button>
									</div>
								</div>

								<table
									v-if="apps.length > 0"
									class="min-w-full"
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
												class="py-3.5 px-6 text-sm font-normal text-left rtl:text-right"
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
												class="px-8 py-3.5 text-sm text-left rtl:text-right font-bold"
											>
												Статус
											</th>

											<th
												scope="col"
												class="px-8 py-3.5 text-sm text-left rtl:text-right font-bold"
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
												class="px-12 py-3.5 text-sm text-left rtl:text-right font-bold"
											>
												Коментарии
											</th>

											<th
												scope="col"
												class="pl-6 pr-8 py-3.5 text-sm text-left rtl:text-right font-bold"
											>
												Редактировать
											</th>
										</tr>
									</thead>

									<tbody>
										<tr
											v-for="app in apps"
											:key="app.id"
											class="border-y border-gray-200"
										>
											<td
												class="px-4 py-4 whitespace-nowrap"
											>
												{{ app.specialist_name }}
											</td>

											<td
												class="px-4 py-4 whitespace-nowrap"
											>
												<h4>{{ app.topic }}</h4>
											</td>

											<td
												class="px-4 py-4 whitespace-nowrap"
											>
												<h4>
													{{ app.account_number }}
												</h4>
											</td>

											<td
												class="px-4 py-4 font-medium whitespace-nowrap"
											>
												<div
													:class="{
														'bg-yellow-300 text-white':
															app.status ==
															'В процессе',

														' bg-secondary text-white':
															app.status ==
															'Передан специалисту',

														'bg-emerald-100/60 text-emerald-500':
															app.status ==
															'Завершен',
													}"
													class="inline px-3 py-1 text-sm font-normal rounded-full gap-x-2"
												>
													{{ app.status }}
												</div>
											</td>

											<td
												class="px-4 py-4 text-sm whitespace-nowrap"
											>
												<h4
													class="flex text-gray-700"
												>
													{{ app.job_title }}
												</h4>
											</td>

											<td
												class="px-4 py-4 whitespace-nowrap"
											>
												<h4>
													{{ app.phonenum }}
												</h4>
											</td>

											<td
												class="px-4 py-4 text-sm"
											>
												<span
													class="flex text-gray-700 text-center max-w-40 max-h-16 overflow-y-auto whitespace-normal border opacity-60 hover:opacity-100 duration-100 px-3 py-2 select-none cursor-pointer rounded-full text-xs font-mono"
												>
													{{ app.comment }}
												</span>
											</td>

											<td
												scope="row"
												class="px-2 py-4 whitespace-nowrap space-x-2"
											>
												<button
													@click="
														deleteApp(app.id)
													"
													title="Удалить пользователя"
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

								<div v-if="errorMessage">
									<p>{{ errorMessage }}</p>
								</div>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
	<!-- Search apps -->

	<div
		class="bg-blue-10 flex items-center justify-between shadow-md p-4"
	>
		<IconLogo />

		<div class="flex items-center space-x-3">
			<!-- Search apps -->
			<div
				v-if="user.role !== 'admin'"
				class="relative"
				@click="openSearch"
			>
				<input
					type="text"
					placeholder="Поиск заявок"
					class="border rounded-full text-sm px-3 py-[7px] appearance-none focus:outline-none focus:ring-0 focus:border-blue-10"
				/>

				<button
					class="absolute top-1.5 right-2.5"
				>
					<svg
						class="w-6 h-6 border rounded-full p-1 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 duration-200"
						aria-hidden="true"
						fill="none"
						stroke-width="1.5"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
				</button>
			</div>

			<div class="flex space-x-2 items-center">
				<div
					class="border rounded-full text-blue-10 bg-white font-bold px-6 pb-1.5 pt-1"
				>
					<h2 v-if="user.role === 'admin'">
						Админ
					</h2>

					<h2 v-if="user.role === 'front-office'">
						Фронт-офис
					</h2>

					<h2 v-if="user.role === 'back-office'">
						Бэк-офис
					</h2>
				</div>

				<button @click="logOut">
					<IconLogout />
				</button>
			</div>
		</div>
	</div>
</template>
