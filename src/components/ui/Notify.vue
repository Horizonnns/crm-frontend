<script setup>
import { ref, watch } from 'vue';
import {
	notify,
	notifyStatus,
	notifyMessage,
} from '../../composables/notify';
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
			:class="{
				'bg-red-100 text-red-800':
					notifyMessage.type === 'error',
				'bg-blue-100 text-blue-10':
					notifyMessage.type === 'message',
			}"
			class="flex items-center px-3 py-1.5 z-50 rounded-md text-sm fixed top-10 right-5"
		>
			<IconNotify />

			<span class="text-center">{{
				notifyMessage.text
			}}</span>
		</div>
	</transition>
</template>
