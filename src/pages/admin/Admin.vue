<script setup>
import { ref } from 'vue';
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
} from '@headlessui/vue';
import AppInput from '../../components/ui/AppInput.vue';
import BaseSelect from '../../components/ui/BaseSelect.vue';
import IconLogout from '../../components/icons/IconLogout.vue';

const jobеtitles = [
	{
		value: 'fshpd',
		label: 'Инженер эксплуатации фшпд',
	},
	{ value: 'fshpd2', label: 'Фшпд маркетинг' },
	{
		value: 'razrabotka',
		label: 'Фронтенд разработчик',
	},
	{
		value: 'razrabotka2',
		label: 'Бекэнд разработчик',
	},
	{
		value: 'razrabotka3',
		label: 'Ux/Ui Дизайн',
	},
];

const isOpen = ref(false);

function closeModal() {
	isOpen.value = false;
}
function openModal() {
	isOpen.value = true;
}

const form = ref({
	username: '',
	role: '',
	jobеtitle: '',
	phonenum: '',
	ownacc: '',
	createddate: '',
});

const roleVariants = [
	{ value: 'admin', label: 'Админ' },
	{ value: 'backoffice', label: 'Бэк-офис' },
	{
		value: 'frontoffice',
		label: 'Фронт-офис',
	},
];

const users = [
	{
		id: 1,
		username: 'Косимджон Косимов С',
		status: 'Фронт-офис',
		number: '902000821',
		created_at: '01.12.2023',
		job: 'Фронтенд разработчик',
	},
	{
		id: 2,
		username: 'Алиакбар Боистов А',
		status: 'Бэк-офис',
		number: '901000891',
		created_at: '10.12.2023',
		job: 'Бекэнд разработчик',
	},
	{
		id: 3,
		username: 'Фируз Джураева С',
		status: 'Фронт-офис',
		number: '900001010',
		created_at: '14.12.2023',
		job: 'Фулстак разработчик',
	},
];
</script>

<template>
	<section
		class="w-full h-screen bg-hero-pattern"
	>
		<div
			class="bg-white flex items-center justify-between px-4 py-2"
		>
			<!-- logo -->
			<div
				class="cursor-pointer select-none flex items-center space-x-3 bg-white rounded-sm border-2 border-black w-36 px-1 py-1"
			>
				<p
					class="bg-blue-10 text-white px-5 py-1.5"
				>
					MINI
				</p>
				<p class="font-black text-blue-10">CRM</p>
			</div>
			<!-- logo -->

			<div class="flex space-x-2 items-center">
				<h2
					class="border rounded-full text-blue-10 bg-emerald-100/60 font-bold px-6 pb-1.5 pt-1"
				>
					Админ
				</h2>

				<button>
					<IconLogout />
				</button>
			</div>
		</div>

		<!-- User list table -->
		<div
			class="inline-block min-w-full align-middle md:px-6 lg:px-8 mt-6"
		>
			<div
				class="px-2 py-3 space-y-4 bg-white overflow-hidden border border-gray-200 md:rounded-lg"
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

				<TransitionRoot
					appear
					:show="isOpen"
					as="template"
				>
					<Dialog
						as="div"
						@close="closeModal"
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
											<h2
												class="text-2xl font-bold text-center pb-2 mb-4 border-b-2"
											>
												Новый пользователь
											</h2>

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
															form.username
														"
													/>

													<AppInput
														size="lg"
														type="text"
														title="Дата создания"
														placeholder="Дата создания"
														v-model="
															form.createddate
														"
													/>

													<BaseSelect
														:class="'p-4 border w-full rounded-md focus:outline-none focus:ring-0 focus:border-blue-10'"
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
													<AppInput
														size="lg"
														type="text"
														:maska="'#########'"
														title="Номер телефона"
														placeholder="901000801"
														v-model="
															form.phonenum
														"
													/>

													<AppInput
														size="lg"
														type="text"
														title="Лицевой счет"
														placeholder="Ваш лицевой счет"
														v-model="form.ownacc"
													/>

													<BaseSelect
														:class="'p-4 border w-full rounded-md focus:outline-none focus:ring-0 focus:border-blue-10'"
														v-model="
															form.jobеtitle
														"
														:options="jobеtitles"
														placeholder="Выберите специалиста"
													/>
												</div>
											</div>
										</div>

										<div>
											<textarea
												class="p-2 w-full h-32 mt-5 border text-sm rounded-lg outline-none focus:outline-none focus:ring-0 focus:border-blue-10"
												placeholder="Коментарии"
											></textarea>
										</div>

										<button
											@click="closeModal"
											type="submit"
											class="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-200 border rounded-full text-sm font-bold px-4 mt-5 pt-1.5 pb-2 w-full"
										>
											Создать
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
									{{ user.username }}
								</h2>
							</td>

							<td
								class="px-7 py-4 text-sm font-medium whitespace-nowrap"
							>
								<div
									class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60"
								>
									{{ user.status }}
								</div>
							</td>

							<td
								class="px-8 py-4 text-sm whitespace-nowrap"
							>
								<h4 class="flex text-gray-700">
									{{ user.number }}
								</h4>
							</td>

							<td
								class="px-4 py-4 text-sm whitespace-nowrap"
							>
								<h4 class="flex text-gray-700">
									{{ user.job }}
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
			</div>
		</div>
	</section>
</template>
