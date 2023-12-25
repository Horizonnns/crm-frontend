<script setup>
import { ref } from 'vue';
import BaseSelect from '../../components/ui/BaseSelect.vue';
import AppInput from '../../components/ui/AppInput.vue';

const form = ref({
	email: '',
	password: '',
	password_confirmation: '',
});

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
					v-model="form.email"
				/>
				<AppInput
					size="lg"
					type="password"
					title="Пароль"
					placeholder="Введите пароль"
					v-model="form.password"
				/>
				<AppInput
					size="lg"
					type="password"
					title="Повторите пароль"
					placeholder="Повторите пароль"
					v-model="form.password_confirmation"
				/>
			</div>
		</div>

		<button
			class="w-full duration-300 hover:text-white hover:bg-blue-10 border rounded-md font-bold px-5 py-2 mt-5"
		>
			Регистрация
		</button>
	</section>
</template>
