<script setup>
import { useStore } from 'vuex';
import Notify from './components/ui/Notify.vue';

const store = useStore();
</script>

<template>
	<section>
		<Notify class="fixed top-16 z-20" />

		<router-view />
	</section>
</template>
