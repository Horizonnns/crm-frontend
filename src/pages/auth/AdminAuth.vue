<script setup>
import { ref } from 'vue';
import AppInput from '../../components/ui/AppInput.vue';

const form = ref({
	username: '',
	password: '',
});
</script>

<template>
	<section>
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

		<button
			class="w-full duration-300 hover:text-white hover:bg-blue-10 border rounded-md font-bold px-5 py-2 mt-5"
		>
			Вход
		</button>
	</section>
</template>
