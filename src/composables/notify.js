import { ref } from 'vue';
import store from '../store/store';
const notifyStatus = ref(false);

const notify = () => {
	store.state.notify !== null
		? (notifyStatus.value = true)
		: (notifyStatus.value = false);

	return setTimeout(() => {
		notifyStatus.value = false;
	}, 3000);
};

export { notify, notifyStatus };
