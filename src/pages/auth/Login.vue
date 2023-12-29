<script setup>
import { ref } from 'vue';
import axios from 'axios';
import AppInput from '../../components/ui/AppInput.vue';

const form = ref({
	email: '',
	password: '',
});

const token = ref('');

const getUser = async () => {
	await axios
		.get('http://127.0.0.1:8000/api/user', {
			headers: {
				Authorization: token.value,
			},
		})
		.then((res) => {
			console.log(res, 'user');
		});
};

async function login() {
	await axios
		.get('http://127.0.0.1:8000/api/login', {
			params: form.value,
		})
		.then((response) => {
			if (response.data.accessToken) {
				token.value = `Bearer ${response.data.accessToken}`;

				localStorage.setItem(
					'user',
					JSON.stringify(
						response.data.accessToken
					)
				);
				console.log(token.value, 'token');
			}

			getUser();
		});
}
</script>

<template>
	<section>
		<div class="flex flex-col space-y-4">
			<AppInput
				size="lg"
				type="text"
				title="Email"
				placeholder="Введите email"
				v-model="form.email"
			/>
			<AppInput
				size="lg"
				title="Пароль"
				type="password"
				placeholder="Введите пароль"
				v-model="form.password"
			/>
		</div>

		<button
			@click="login"
			class="w-full duration-300 hover:text-white hover:bg-blue-10 border rounded-md font-bold px-5 py-2 mt-5"
		>
			Вход
		</button>
	</section>
</template>
