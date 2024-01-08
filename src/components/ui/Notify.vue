<script setup>
import { ref, watch } from 'vue';
import { notifyStatus } from '../../composables/notify';
import IconNotify from '../icons/IconNotify.vue';

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
			class="flex items-center bg-blue-100 text-blue-10 px-3 py-1.5 rounded-md text-sm fixed top-10 right-5"
		>
			<IconNotify />
			<p>Вы успешно зарегистрировались</p>
		</div>
	</transition>
</template>
