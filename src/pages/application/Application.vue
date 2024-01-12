<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import IconLogo from '../../components/icons/IconLogo.vue';
import IconLogout from '../../components/icons/IconLogout.vue';

const router = useRouter();
const application = ref(
	router.currentRoute.value.query
);
</script>

<template>
	<div
		class="bg-gray-50 w-full h-screen overflow-scroll"
	>
		<header
			class="bg-blue-10 flex items-center justify-between shadow-md px-4"
		>
			<IconLogo />

			<div class="flex items-center space-x-3">
				<!-- Search apps -->
				<div
					class="relative py-4"
					@click="openSearch"
				>
					<input
						type="text"
						placeholder="Поиск заявок"
						class="border rounded-full text-sm px-3 py-[7px] appearance-none focus:outline-none focus:ring-0 focus:border-blue-10"
					/>

					<button
						class="absolute top-[23px] right-2.5"
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
					<h2
						class="border rounded-full text-blue-10 bg-white font-bold px-6 pb-1.5 pt-1"
					>
						Бэк-офис
					</h2>

					<button @click="logOut">
						<IconLogout />
					</button>
				</div>
			</div>
		</header>

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
					<p
						class="font-bold text-xl w-fit mx-auto"
					>
						Коментарии по заявке:
					</p>

					<p class="text-gray-800 text-sm px-5">
						{{ application.comment }}
					</p>
				</div>
			</div>

			<!-- <p class="mt-4">{{ application }}</p> -->
		</div>
	</div>
</template>
