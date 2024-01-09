<script setup>
import { useStore } from 'vuex';
import Notify from './components/ui/Notify.vue';

const store = useStore();
</script>

<template>
	<section>
		<div
			v-show="store.state.token"
			class="fixed top-20 z-20"
		>
			<Notify
				ifSuccess="Вы успешно вошли в систему!"
			/>
		</div>

		<router-view />
	</section>
</template>
