<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const application = ref(
	router.currentRoute.value.query
);
</script>

<template>
	<div
		class="bg-gray-50 w-full h-screen overflow-scroll"
	>
		<div
			class="bg-white border shadow rounded-lg flex flex-col items-center space-y-6 mt-6 py-5 mx-4"
		>
			<span class="text-2xl font-bold">
				Заявка №{{ application.id }}</span
			>

			<div
				class="flex flex-col justify-start w-full space-y-3"
			>
				<div class="space-x-1.5">
					<span
						class="bg-gray-400 text-white pl-1 py-1"
					>
						Лицевой счёт:
					</span>

					<span class="font-bold">
						{{ application.account_number }}
					</span>
				</div>

				<div class="space-x-1.5">
					<span
						class="bg-gray-400 text-white pl-1 py-1"
					>
						Имя клиента:
					</span>

					<span class="font-bold">
						{{ application.name }}
					</span>
				</div>

				<div class="space-x-1.5">
					<span
						class="bg-gray-400 text-white pl-1 py-1"
					>
						Номер телефона:
					</span>

					<span class="font-bold">
						{{ application.phonenum }}
					</span>
				</div>

				<div class="space-x-1.5">
					<span
						class="bg-gray-400 text-white pl-1 py-1"
					>
						Тема заявки:
					</span>

					<span class="font-bold">
						{{ application.topic }}
					</span>
				</div>

				<div class="space-x-1.5">
					<span
						class="bg-gray-400 text-white pl-1 py-1"
					>
						Статус заявки:
					</span>

					<span class="font-bold">
						{{ application.status }}
					</span>
				</div>

				<div class="space-y-1">
					<div>
						<p
							v-if="application.comment"
							class="font-bold text-xl w-fit mx-auto"
						>
							Коментарии по заявке:
						</p>

						<p
							v-if="application.comment"
							class="text-gray-600 text-center px-5"
						>
							{{ application.comment }}
						</p>
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
