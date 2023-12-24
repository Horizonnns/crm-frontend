<script setup>
import { ref } from 'vue';
import BaseSelect from '../../components/ui/BaseSelect.vue';
import AppInput from '../../components/ui/AppInput.vue';

const form = ref({
	username: '',
	password: '',
});

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
			<div class="flex flex-col space-y-4">
				<AppInput
					size="lg"
					type="text"
					title="Логин"
					placeholder="Введите логин"
					v-model="form.username"
				/>
				<AppInput
					size="lg"
					type="password"
					title="Пароль"
					placeholder="Введите пароль"
					v-model="form.password"
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
