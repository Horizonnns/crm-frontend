<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { notifyStatus } from '../../composables/notify';
import IconNotify from '../icons/IconNotify.vue';

const props = defineProps([
	'ifSuccess',
	'ifError',
]);

const store = useStore();
const localNotifyStatus = ref(notifyStatus.value);

watch(notifyStatus, (newValue) => {
	localNotifyStatus.value = newValue;
});

const slideDown = {
	enterActiveClass: 'duration-300',
	enterFromClass: '-translate-y-32',
	enterToClass: 'translate-y-0',
	leaveActiveClass: 'duration-500',
	leaveToClass: '-translate-y-32',
};
</script>

<template>
	<transition
		as="template"
		v-bind="slideDown"
		v-show="localNotifyStatus"
	>
		<div
			:class="{
				'bg-red-100 text-red-800':
					store.state.notify === 'error',

				'bg-blue-100 text-blue-10':
					store.state.notify === 'success',
			}"
			class="flex items-center px-3 py-1.5 rounded-md text-sm fixed top-10 right-5"
		>
			<IconNotify />
			<p>
				{{
					store.state.notify === 'success'
						? ifSuccess
						: ifError
				}}
			</p>
		</div>
	</transition>
</template>
