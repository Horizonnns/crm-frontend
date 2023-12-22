<script setup>
import { ref } from 'vue';
import BaseSelect from '../../components/ui/BaseSelect.vue';

let role = ref();

const roleVariants = [
	{ value: 'admin', label: 'Админ' },
	{ value: 'backoffice', label: 'Бэк-офис' },
	{
		value: 'frontoffice',
		label: 'Фронт-офис',
	},
];
</script>

<template>
	<section>
		<div class="flex flex-col space-y-2">
			<div class="space-y-1">
				<p class="font-bold">Логин</p>
				<input
					type="text"
					placeholder="Логин"
					class="w-full border rounded-md p-3 focus:outline-none focus:ring-0 focus:border-blue-10 placeholder:text-sm"
				/>
			</div>

			<div class="space-y-1">
				<p class="font-bold">Пароль</p>

				<input
					type="password"
					placeholder="Пароль"
					class="w-full border rounded-md p-3 focus:outline-none focus:ring-0 focus:border-blue-10 placeholder:text-sm"
				/>
			</div>

			<BaseSelect
				:class="'p-3 border w-full rounded-md focus:outline-none focus:ring-0 focus:border-blue-10'"
				v-model="role"
				:options="roleVariants"
				placeholder="Выберите роль"
			/>
		</div>

		<button
			class="w-full duration-300 hover:text-white hover:bg-blue-10 border rounded-md font-bold px-5 py-2 mt-5"
		>
			Регистрация
		</button>
	</section>
</template>
