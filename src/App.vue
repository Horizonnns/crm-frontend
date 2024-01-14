<script setup>
import { useStore } from 'vuex';
import Notify from './components/ui/Notify.vue';
import Header from './components/Header.vue';
import { computed } from 'vue';

const store = useStore();

const isAuth = computed(
	() => store.state.token !== null
);
</script>

<template>
	<section>
		<Header v-if="isAuth" />

		<Notify class="fixed top-16 z-20" />

		<router-view />
	</section>
</template>
