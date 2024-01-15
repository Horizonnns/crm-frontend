<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const application = ref(
	router.currentRoute.value.query
);
</script>

<template>
	<div class="bg-gray-50 w-full h-screen">
		<div
			class="bg-white border shadow rounded-lg flex flex-col items-center space-y-6 mt-6 py-5 mx-4 px-5"
		>
			<span class="text-2xl font-bold">
				Заявка №{{ application.id }}</span
			>

			<div
				class="flex flex-col justify-start w-full space-y-8"
			>
				<div class="space-y-3">
					<div class="space-x-1.5">
						<span
							class="bg-cyan-100/60 text-cyan-500 font-bold pl-1 py-1"
						>
							Лицевой счёт:
						</span>

						<span
							class="bg-gray-100/60 -ml-2 px-2 py-1 w-fit rounded-full text-gray-500 text-sm font-medium"
						>
							{{ application.account_number }}
						</span>
					</div>

					<div class="space-x-1.5">
						<span
							class="bg-cyan-100/60 text-cyan-500 font-bold pl-1 py-1"
						>
							Имя клиента:
						</span>

						<span
							class="bg-gray-100/60 -ml-2 px-2 py-1 w-fit rounded-full text-gray-500 text-sm font-medium"
						>
							{{ application.name }}
						</span>
					</div>

					<div class="space-x-1.5">
						<span
							class="bg-cyan-100/60 text-cyan-500 font-bold pl-1 py-1"
						>
							Номер телефона:
						</span>

						<span
							class="bg-gray-100/60 -ml-2 px-2 py-1 w-fit rounded-full text-gray-500 text-sm font-medium"
						>
							+992-{{ application.phonenum }}
						</span>
					</div>

					<div class="space-x-1.5">
						<span
							class="bg-cyan-100/60 text-cyan-500 font-bold pl-1 py-1"
						>
							Тема заявки:
						</span>

						<span
							class="bg-gray-100/60 -ml-2 px-2 py-1 w-fit rounded-full text-gray-500 text-sm font-medium"
						>
							{{ application.topic }}
						</span>
					</div>

					<div class="space-x-1.5">
						<span
							class="bg-cyan-100/60 text-cyan-500 font-bold pl-1 py-1"
						>
							Статус заявки:
						</span>

						<span
							class="px-3 py-1 text-sm rounded-full font-medium"
							:class="{
								'bg-yellow-100/60 text-yellow-500':
									application.status ==
									'В процессе',

								'bg-purple-100/60 text-secondary':
									application.status ==
									'Передан специалисту',

								'bg-emerald-100/60 text-emerald-500':
									application.status ==
									'Завершен',
							}"
						>
							{{ application.status }}
						</span>
					</div>
				</div>

				<div class="space-y-1">
					<div
						class="flex flex-col items-center justify-center space-y-2"
					>
						<p
							v-if="application.comment"
							class="font-bold text-xl w-fit mx-auto"
						>
							Коментарии по заявке:
						</p>

						<div
							class="max-w-full overflow-auto bg-gray-100/60 text-gray-700 text-sm font-mono rounded-lg pb-6 p-4"
						>
							<p v-if="application.comment">
								{{ application.comment }}
							</p>
						</div>
					</div>

					<p
						v-if="!application.comment"
						class="font-bold text-xl text-center mx-auto"
					>
						Коментарии по заявке отсутствуют..
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
