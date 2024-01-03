<script setup>
import { ref } from 'vue';
import axios from 'axios';
import AppInput from '../../components/ui/AppInput.vue';

const emit = defineEmits(['changeTab']);

const form = ref({
	name: '',
	email: '',
	password: '',
});

const errors = ref({
	name: [],
	email: [],
	password: [],
});

async function auth() {
	try {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/authAdmin',
			form.value
		);
		console.log(response, 'response');
		emit('changeTab', 1);
	} catch (error) {
		if (error.response.data.error) {
			const backendError =
				error.response.data.error;
			errors.value = backendError;
		}
	}
}
</script>

<template>
	<section>
		<div class="flex flex-col space-y-2">
			<div class="flex flex-col space-y-4">
				<div class="space-y-1">
					<AppInput
						size="lg"
						type="text"
						title="Имя"
						placeholder="Введите имя"
						v-model="form.name"
						:error="errors.name[0]"
					/>
				</div>

				<div class="space-y-1">
					<AppInput
						size="lg"
						type="text"
						title="Email"
						placeholder="Введите email"
						v-model="form.email"
						:error="errors.email[0]"
					/>
				</div>

				<div class="space-y-1">
					<AppInput
						size="lg"
						type="password"
						title="Пароль"
						placeholder="Введите пароль"
						v-model="form.password"
						:error="errors.password[0]"
					/>
				</div>
			</div>
		</div>

		<button
			@click="auth"
			class="w-full duration-300 hover:text-white hover:bg-blue-10 border rounded-md font-bold px-5 py-2 mt-5"
		>
			Регистрация
		</button>
	</section>
</template>
