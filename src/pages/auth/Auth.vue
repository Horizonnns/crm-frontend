<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { notify } from '../../composables/notify';
import AppInput from '../../components/ui/AppInput.vue';
import IconProcessing from '../../components/icons/IconProcessing.vue';

const store = useStore();
const loading = ref(false);
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
		loading.value = true;

		const response = await axios.post(
			'http://127.0.0.1:8000/api/authAdmin',
			form.value
		);

		store.commit(
			'setNotify',
			response.data.success
		);
		notify();
		emit('changeTab', 1);

		loading.value = false;
	} catch (error) {
		loading.value = false;

		if (error.response.data.error) {
			errors.value = error.response.data.error;
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
						:disabled="loading"
						placeholder="Введите имя"
						v-model="form.name"
						:error="errors.name"
					/>
				</div>

				<div class="space-y-1">
					<AppInput
						size="lg"
						type="text"
						title="Email"
						:disabled="loading"
						placeholder="Введите email"
						v-model="form.email"
						:error="errors.email"
					/>
				</div>

				<div class="space-y-1">
					<AppInput
						size="lg"
						type="password"
						title="Пароль"
						:disabled="loading"
						placeholder="Введите пароль"
						v-model="form.password"
						:error="errors.password"
					/>
				</div>
			</div>
		</div>

		<button
			@click="auth"
			:disabled="loading"
			:class="{
				'bg-blue-10 opacity-80': loading,
			}"
			class="w-full flex justify-center duration-300 hover:text-white hover:bg-blue-10 border rounded-md font-bold px-5 py-2 mt-5"
		>
			<IconProcessing v-if="loading" />
			<p v-else>Регистрация</p>
		</button>
	</section>
</template>
