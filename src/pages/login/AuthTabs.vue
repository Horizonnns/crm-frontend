<script setup>
import {
	TabGroup,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from '@headlessui/vue';
import Login from './Login.vue';
import Registration from './Registration.vue';

const categories = {
	Login: Login,
	Registration: Registration,
};

const getName = [
	{
		component: 'Login',
		title: 'Login',
	},
	{
		component: 'Registration',
		title: 'Registration',
	},
];
</script>

<template>
	<section
		class="bg-header-gradient w-full h-screen flex items-center justify-center p-5"
	>
		<div
			class="bg-white w-96 flex flex-col space-x-4 items-center border shadow-xl rounded-lg pl-4 pr-8 pt-4 pb-2"
		>
			<h1
				class="text-2xl font-bold text-center border-b w-full leading-10"
			>
				Mini CRM
			</h1>

			<TabGroup>
				<TabList class="w-full flex pb-3">
					<Tab
						class="w-full"
						v-for="item in getName"
						as="template"
						:key="item"
						v-slot="{ selected }"
					>
						<button
							class="flex justify-center border-b-2 px-2 py-2 duration-200 outline-none"
							:class="[
								selected
									? '!text-primary border-primary'
									: '',
							]"
						>
							{{ item.title }}
						</button>
					</Tab>
				</TabList>

				<TabPanels class="w-full">
					<TabPanel
						v-for="(posts, idx) in categories"
						:key="idx"
					>
						<component :is="posts" />
						<div v-if="posts.length > 1">
							<TabGroup>
								<TabPanels>
									<TabPanel
										v-for="(
											post, idx
										) in Object.values(posts)"
										:key="post"
									>
										<div
											v-for="(item, ind) in post"
											:key="ind"
										>
											<component :is="item" />
										</div>
									</TabPanel>
								</TabPanels>
							</TabGroup>
						</div>
					</TabPanel>
				</TabPanels>
			</TabGroup>

			<p
				class="text-xs text-gray-400 text-center pt-4"
			>
				Welcome to the SRM page
			</p>
		</div>
	</section>
</template>
