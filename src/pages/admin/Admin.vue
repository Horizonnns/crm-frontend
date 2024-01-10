<script setup>
import { ref, computed } from 'vue';
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
import IconLogout from '../../components/icons/IconLogout.vue';
import IconExit from '../../components/icons/IconExit.vue';
import IconLogo from '../../components/icons/IconLogo.vue';
import IconProcessing from '../../components/icons/IconProcessing.vue';

const store = useStore();
const router = useRouter();
const users = computed(() => store.state.users);

const jobеtitles = [
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
		value: 'Ux/Ui Дизайн',
		label: 'Ux/Ui Дизайн',
	},
];

const isOpen = ref(false);
function closeModal() {
	isOpen.value = false;
	form.value = '';
}
function openModal() {
	isOpen.value = true;
}

const isEditOpen = ref(false);
function closeEditModal() {
	isEditOpen.value = false;
}
function openEditModal() {
	isEditOpen.value = true;
}

const form = ref({
	name: '',
	role: '',
	job_title: '',
	phonenum: '',
	email: '',
	password: '',
});

const errors = ref({
	name: [],
	email: [],
	job_title: [],
	phonenum: [],
	password: [],
});

const roleVariants = [
	{ value: 'back-office', label: 'Бэк-офис' },
	{ value: 'front-office', label: 'Фронт-офис' },
];

const loading = ref(false);

async function authUser() {
	try {
		loading.value = true;

		const response = await axios.post(
			'http://127.0.0.1:8000/api/authUser',
			form.value
		);

		store.commit('setUsers', response.data.users);
		notify(
			'message',
			'Менеджер успешно зарегистрирован!'
		);

		closeModal();

		loading.value = false;
	} catch (error) {
		loading.value = false;

		if (error.response.data.error) {
			errors.value = error.response.data.error;
			notify(
				'error',
				'Заполните правильно все поля!'
			);
		}
	}
}

async function deleteUser(userId) {
	try {
		const response = await fetch(
			`http://127.0.0.1:8000/api/deleteUser/${userId}`,
			{
				method: 'DELETE',
			}
		);

		if (response.ok) {
			store.commit('deleteUser', userId);

			if (store.state.users.length === 0) {
				logOut();
			} else {
				const adminUsers =
					store.state.users.filter(
						(user) => user.role === 'admin'
					);
				if (adminUsers.length === 0) {
					logOut();
				}
			}
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

const editingUser = ref(null);
const editedUser = ref({
	name: '',
	email: '',
	phonenum: '',
	role: '',
});

async function editUser(userId) {
	openEditModal();
	const userToEdit = users.value.find(
		(user) => user.id === userId
	);

	if (userToEdit) {
		editedUser.value = { ...userToEdit };
		editingUser.value = userId;
	}
}

function saveEditedUser() {
	fetch(
		`http://127.0.0.1:8000/api/updateUser/${editingUser.value}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(editedUser.value),
		}
	)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				console.error(
					'Ошибка при редактировании пользователя:',
					response.statusText
				);
			}
		})
		.then((data) => {
			store.commit('setUsers', data.users);
			editingUser.value = null;

			if (data.user.role !== 'admin') {
				const adminCount = data.users.filter(
					(user) => user.role === 'admin'
				).length;

				if (adminCount === 0) {
					logOut();
				}
			}
		})
		.catch((error) => {
			console.error(
				'Ошибка при редактировании пользователя:',
				error.message
			);
		});

	closeEditModal();
}

function cancelEdit() {
	editingUser.value = null;
	closeEditModal();
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
	<section class="bg-gray-50 w-full h-screen">
		<div
			class="bg-blue-10 flex items-center justify-between shadow-md px-4 py-4"
		>
			<IconLogo />

			<div class="flex space-x-2 items-center">
				<h2
					class="border rounded-full text-blue-10 bg-white font-bold px-6 pb-1.5 pt-1"
				>
					Админ
				</h2>

				<button @click="logOut">
					<IconLogout />
				</button>
			</div>
		</div>

		<!-- User list table -->
		<div
			class="inline-block min-w-full align-middle md:px-6 lg:px-8 mt-6"
		>
			<div
				class="shadow-md px-2 py-3 space-y-4 bg-white overflow-hidden border border-gray-200 md:rounded-lg"
			>
				<div
					class="flex justify-between items-center px-3 border-b pb-3"
				>
					<p class="text-xl font-bold">
						Список менеджеров
					</p>

					<button
						@click="openModal"
						type="submit"
						class="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-200 border rounded-full text-sm font-bold px-4 pt-1.5 pb-2"
					>
						Создать менеджера
					</button>
				</div>

				<!-- create user -->
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
							<div
								class="fixed inset-0 bg-black/25"
							/>
						</TransitionChild>

						<div
							class="fixed inset-0 overflow-y-auto"
						>
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
												<h2
													class="text-xl font-bold"
												>
													Новый менеджер
												</h2>

												<IconExit
													@click="closeModal"
												/>
											</div>

											<div
												class="flex justify-between space-x-5 border-b-2 pb-5"
											>
												<div
													class="w-full space-y-4"
												>
													<div class="space-y-1">
														<AppInput
															size="lg"
															type="text"
															title="ФИО"
															placeholder="Иван Иванов"
															:disabled="loading"
															v-model="form.name"
															:error="errors.name"
														/>
													</div>

													<div class="space-y-1">
														<AppInput
															size="lg"
															type="text"
															title="Email"
															placeholder="Введите email"
															:disabled="loading"
															v-model="form.email"
															:error="
																errors.email
															"
														/>
													</div>

													<BaseSelect
														:classes="'p-4 border w-full rounded-md focus:outline-none focus:ring-0 focus:border-blue-10'"
														v-model="form.role"
														:options="
															roleVariants
														"
														placeholder="Выберите роль"
													/>
												</div>

												<div
													class="w-full space-y-4"
												>
													<div class="space-y-1">
														<AppInput
															size="lg"
															type="text"
															:maska="'#########'"
															title="Номер телефона"
															placeholder="901000801"
															:disabled="loading"
															v-model="
																form.phonenum
															"
															:error="
																errors.phonenum
															"
														/>
													</div>

													<div class="space-y-1">
														<AppInput
															size="lg"
															type="password"
															title="Пароль"
															placeholder="Введите пароль"
															:disabled="loading"
															v-model="
																form.password
															"
															:error="
																errors.password
															"
														/>
													</div>

													<BaseSelect
														:classes="'p-4 border w-full rounded-md focus:outline-none focus:ring-0 focus:border-blue-10'"
														:disabled="loading"
														v-model="
															form.job_title
														"
														:options="jobеtitles"
														:error="
															errors.job_title
														"
														placeholder="Выберите должность"
													/>
												</div>
											</div>
										</div>

										<button
											@click="authUser"
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

				<table
					class="min-w-full divide-y divide-gray-200"
				>
					<thead class="bg-gray-50">
						<tr>
							<th
								scope="col"
								class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right"
							>
								<button
									class="flex items-center gap-x-3 focus:outline-none font-bold"
								>
									<span>Менеджер</span>

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
								class="px-12 py-3.5 text-sm text-left rtl:text-right font-bold"
							>
								Роль
							</th>

							<th
								scope="col"
								class="px-4 py-3.5 text-sm text-left rtl:text-right font-bold"
							>
								Номер телефона
							</th>

							<th
								scope="col"
								class="px-10 py-3.5 text-sm text-left rtl:text-right font-bold"
							>
								Должность
							</th>

							<th
								scope="col"
								class="px-4 py-3.5 text-sm text-left rtl:text-right font-bold"
							>
								Дата создания
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
						class="bg-white divide-y divide-gray-200"
					>
						<tr
							v-for="user in users"
							:key="user.id"
						>
							<td
								class="px-4 py-4 text-sm font-medium whitespace-nowrap"
							>
								<h2
									class="font-medium text-gray-700"
								>
									{{ user.name }}
								</h2>
							</td>

							<td
								class="px-7 py-4 text-sm font-medium whitespace-nowrap"
							>
								<div
									class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60"
								>
									{{ user.role }}
								</div>
							</td>

							<td
								class="px-8 py-4 text-sm whitespace-nowrap"
							>
								<h4 class="flex text-gray-700">
									{{ user.phonenum }}
								</h4>
							</td>

							<td
								class="px-4 py-4 text-sm whitespace-nowrap"
							>
								<h4 class="flex text-gray-700">
									{{ user.job_title }}
								</h4>
							</td>

							<td
								class="px-8 py-4 text-sm whitespace-nowrap"
							>
								<h4 class="flex text-gray-700">
									{{ user.created_at }}
								</h4>
							</td>

							<td
								scope="row"
								class="pl-7 pr-4 py-4 whitespace-nowrap space-x-2"
							>
								<button
									@click="editUser(user.id)"
									title="Изменить пользователя"
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
									@click="deleteUser(user.id)"
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

				<!-- edit user -->
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
							<div
								class="fixed inset-0 bg-black/25"
							/>
						</TransitionChild>

						<div
							class="fixed inset-0 overflow-y-auto"
						>
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
												<h2
													class="text-xl font-bold"
												>
													Изменить пользователя
												</h2>

												<IconExit
													@click="cancelEdit"
												/>
											</div>

											<div
												class="flex justify-between space-x-5 border-b-2 pb-5"
											>
												<div
													class="w-full space-y-4"
												>
													<AppInput
														size="lg"
														type="text"
														title="ФИО"
														placeholder="Иван Иванов"
														v-model="
															editedUser.name
														"
													/>

													<AppInput
														size="lg"
														type="text"
														title="Email"
														placeholder="Введите email"
														v-model="
															editedUser.email
														"
													/>

													<BaseSelect
														:classes="'p-4 border w-full rounded-md focus:outline-none focus:ring-0 focus:border-blue-10'"
														v-model="
															editedUser.role
														"
														:options="
															roleVariants
														"
														placeholder="Выберите роль"
													/>
												</div>

												<div
													class="w-full space-y-4"
												>
													<AppInput
														size="lg"
														type="text"
														:maska="'#########'"
														title="Номер телефона"
														placeholder="901000801"
														v-model="
															editedUser.phonenum
														"
													/>

													<BaseSelect
														:classes="'p-4 border w-full rounded-md focus:outline-none focus:ring-0 focus:border-blue-10'"
														v-model="
															editedUser.job_title
														"
														:options="jobеtitles"
														placeholder="Выберите должность"
													/>
												</div>
											</div>
										</div>

										<button
											@click="saveEditedUser"
											type="submit"
											class="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-200 border rounded-full text-sm font-bold px-4 mt-5 pt-1.5 pb-2 w-full"
										>
											Изменить
										</button>
									</DialogPanel>
								</TransitionChild>
							</div>
						</div>
					</Dialog>
				</TransitionRoot>
			</div>
		</div>
	</section>
</template>
