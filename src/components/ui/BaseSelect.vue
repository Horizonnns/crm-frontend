<script setup>
import { computed } from 'vue';

const props = defineProps({
	options: {
		type: Array,
		required: true,
	},
	classes: String,
	modelValue: { type: String, default: null },
	placeholder: {
		required: true,
		type: String,
	},
	error: {
		type: [Boolean, String, Array],
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});

const hasErrors = computed(() => {
	return (
		Array.isArray(props.error) &&
		props.error.length > 0
	);
});

const emit = defineEmits(['update']);
</script>

<template>
	<div class="flex flex-col space-y-1">
		<select
			:disabled="disabled"
			:class="[
				hasErrors &&
					'bg-red-100 !border-red-500 !text-red-600 !placeholder-red-700',
				disabled &&
					'!bg-gray-50 cursor-not-allowed',
				classes,
			]"
			:placeholder="placeholder"
			@change="
				emit(
					'update:modelValue',
					$event.target.value
				)
			"
		>
			<option selected disabled>
				{{ placeholder }}
			</option>
			<option
				class="bg-white"
				v-for="{ value, label } in options"
				:key="value"
				:value="value"
				@click="emit('select', label)"
			>
				{{ label }}
			</option>
		</select>

		<p
			v-if="hasErrors"
			class="text-xs text-red-500 leading-3"
		>
			{{ error.join(', ') }}
		</p>
	</div>
</template>
