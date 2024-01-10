<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { notify } from '../../composables/notify';
import AppInput from '../../components/ui/AppInput.vue';
import IconProcessing from '../../components/icons/IconProcessing.vue';

const store = useStore();
const router = useRouter();
const loading = ref(false);

const form = ref({
	email: '',
	password: '',
});

const errors = ref({
	email: [],
	password: [],
});

async function getApps() {
	const applicationsResponse = await axios.get(
		'http://127.0.0.1:8000/api/getAllApps'
	);

	store.commit(
		'setApplications',
		applicationsResponse.data.applications
	);
}

async function login() {
	try {
		loading.value = true;

		const response = await axios.get(
			'http://127.0.0.1:8000/api/login',
			{ params: form.value }
		);

		getApps();

		if (response.data.accessToken) {
			notify(
				'message',
				'Вы успешно вошли в систему!'
			);

			// save the token in localStorage and store
			store.commit(
				'setToken',
				response.data.accessToken
			);
			localStorage.setItem(
				'token',
				`Bearer ${response.data.accessToken}`
			);

			// save user data in store
			store.commit('setUser', response.data.user);

			store.commit(
				'setUsers',
				response.data.users
			);

			// redirect to page depending on role
			const role = response.data.user.role;
			if (role === 'admin') {
				router.push('/admin');
			} else if (role === 'front-office') {
				router.push('/frontoff');
			} else if (role === 'back-office') {
				router.push('/backoff');
			}
		}

		loading.value = false;
	} catch (error) {
		loading.value = false;

		if (error.response.data.error) {
			errors.value = error.response.data.error;

			notify(
				'error',
				'Неправильный email или пароль!'
			);
		}
	}
}
</script>

<template>
	<section>
		<div class="flex flex-col space-y-4">
			<div class="space-y-1">
				<AppInput
					size="lg"
					type="text"
					title="Email"
					placeholder="Введите email"
					:disabled="loading"
					v-model="form.email"
					:error="errors.email"
				/>
			</div>

			<div class="space-y-1">
				<AppInput
					size="lg"
					title="Пароль"
					type="password"
					placeholder="Введите пароль"
					:disabled="loading"
					v-model="form.password"
					:error="errors.password"
				/>
			</div>
		</div>

		<button
			@click="login"
			:disabled="loading"
			:class="{
				'bg-blue-10 opacity-80': loading,
			}"
			class="w-full flex justify-center duration-300 hover:text-white hover:bg-blue-10 border rounded-md font-bold px-5 py-2 mt-5"
		>
			<IconProcessing v-if="loading" />
			<p v-else>Вход</p>
		</button>
	</section>
</template>
