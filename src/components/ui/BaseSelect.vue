<script setup>
const props = defineProps({
	options: {
		type: Array,
		required: true,
	},
	class: String,
	modelValue: { type: String, default: null },
	placeholder: {
		required: true,
		type: String,
	},
});

const emit = defineEmits(['update']);
</script>

<template>
	<div class="flex gap-2">
		<select
			:class="class"
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
	</div>
</template>
