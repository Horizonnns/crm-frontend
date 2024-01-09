import { ref } from 'vue';

const notifyStatus = ref(false);
const notifyMessage = ref({ type: '', text: '' });

const notify = (type, message) => {
	notifyStatus.value = true;
	notifyMessage.value = { type, text: message };

	return setTimeout(() => {
		notifyMessage.value = { type: '', text: '' };
		notifyStatus.value = false;
	}, 3000);
};

export { notify, notifyStatus, notifyMessage };
