<script setup>
import { ref, watch, computed } from 'vue';
import { cva } from 'class-variance-authority';
import IconEyeOpen from '../icons/IconEyeOpen.vue';
import IconEyeClose from '../icons/IconEyeClose.vue';

const props = defineProps({
	maska: {
		type: String,
		default: undefined,
	},
	placeholder: {
		type: String,
		default: undefined,
	},
	type: {
		type: String,
		default: 'text',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	modelValue: String,
	id: {
		type: [String, Number],
		default: () =>
			new Array(5)
				.join()
				.replace(/(.|$)/g, () =>
					((Math.random() * 36) | 0).toString(36)
				),
	},
	title: {
		type: [String, Number],
		required: true,
	},
	error: {
		type: [Boolean, String, Array],
		default: false,
	},
	intent: {
		type: String,
		validator: (val) =>
			['primary', 'secondary', 'cancel'].includes(
				val
			),
		default: 'primary',
	},
	size: {
		type: String,
		default: 'xl',
	},
	length: String,
	autocomplete: String,
	inputmode: String,
});

const input = computed(() => {
	return cva('border-gray-10', {
		variants: {
			intent: {
				primary:
					'block border rounded-lg outline-none font-bold placeholder:font-normal w-full appearance-none focus:outline-none focus:ring-0 focus:border-blue-10 disabled:bg-gray-50 peer dark:bg-transparent',
				secondary:
					'bg-secondary text-white hover:opacity-75',
				cancel:
					'bg-red-10 text-white hover:bg-red-20 hover:text-red-10',
			},
		},
	})({
		intent: props.intent,
	});
});

const label = computed(() => {
	return cva('border-gray-10', {
		variants: {
			intent: {
				primary:
					'absolute !font-normal duration-300 transform scale-75 z-10 origin-[0] left-2 peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:px-2 cursor-text px-2',
				secondary:
					'bg-secondary text-white hover:opacity-75',
				cancel:
					'bg-red-10 text-white hover:bg-red-20 hover:text-red-10',
			},
		},
	})({
		intent: props.intent,
	});
});

const size = computed(() => {
	return {
		'px-4 py-2': props.size === 'sm',
		'px-4 py-3': props.size === 'base',
		'px-4 py-4 text-sm': props.size === 'lg',
		'px-4 py-5': props.size === 'xl',
	};
});

const translate = computed(() => {
	return {
		'-translate-y-5 peer-focus:-translate-y-5 top-2':
			props.size === 'sm',
		'-translate-y-6 peer-focus:-translate-y-6 top-3':
			props.size === 'base',
		'-translate-y-7 peer-focus:-translate-y-7 top-4':
			props.size === 'lg',
		'-translate-y-8 peer-focus:-translate-y-8 top-5':
			props.size === 'xl',
	};
});

const showPassword = ref(true);
const type = ref(props.type);
const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
	emit('update:modelValue', event.target.value);
};
watch(showPassword, () => {
	if (showPassword.value) {
		type.value = 'password';
	} else {
		type.value = 'text';
	}
});

const isFocused = ref(true);

const handleFocus = () => {
	isFocused.value = false;
};

const handleBlur = () => {
	isFocused.value = true;
};
</script>

<template>
	<div class="relative">
		<input
			v-maska
			:data-maska="maska"
			:inputmode="inputmode"
			:autocomplete="autocomplete"
			:maxlength="length"
			:type="type"
			:disabled="disabled"
			:value="modelValue"
			@input="updateValue"
			@focus="handleFocus"
			@blur="handleBlur"
			:id="id.toString()"
			:class="[
				error &&
					'!border-red-500 !text-red-600 !placeholder-red-700',
				disabled &&
					'!bg-gray-50 cursor-not-allowed',
				input,
				size,
			]"
			:placeholder="isFocused ? '' : placeholder"
		/>
		<label
			:for="id"
			:class="[
				error && '!text-red-500',
				disabled
					? '!bg-gray-50 text-gray-10 cursor-not-allowed'
					: 'bg-white text-gray-10 ',
				label,
				translate,
			]"
		>
			{{ title }}
		</label>
		<button
			v-if="type === 'password' || !showPassword"
			@click="showPassword = !showPassword"
			class="absolute inset-y-0 right-0 px-6"
			type="button"
		>
			<IconEyeOpen v-show="!showPassword" />
			<IconEyeClose v-show="showPassword" />
		</button>
	</div>
	<p
		v-show="error"
		class="text-xs text-red-500 leading-3"
	>
		{{ error }}
	</p>
</template>
