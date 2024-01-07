<script setup>
import {
	TabGroup,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from '@headlessui/vue';
import { ref } from 'vue';
import Login from './Login.vue';
import Auth from './Auth.vue';

const categories = {
	Регистрация: Auth,
	Вход: Login,
};

const selectedTab = ref(0);

function changeTab(index) {
	selectedTab.value = index;
}
</script>

<template>
	<section
		class="bg-gray-50 bg-contain w-full h-screen flex items-center justify-center p-5"
	>
		<div
			class="bg-white w-96 flex flex-col space-x-4 items-center border shadow-xl rounded-lg pl-4 pr-8 pt-4 pb-2"
		>
			<!-- logo -->
			<div
				class="flex items-center space-x-3 bg-white rounded-sm border-2 border-black w-40 px-1.5 py-1 mb-5 text-xl"
			>
				<p
					class="bg-blue-10 text-white px-5 py-1.5"
				>
					MINI
				</p>
				<p class="font-black text-blue-10">CRM</p>
			</div>
			<!-- logo -->

			<TabGroup
				@change="changeTab"
				:selectedIndex="selectedTab"
			>
				<TabList class="w-full flex pb-3">
					<Tab
						ref="index"
						class="w-full"
						v-for="category in Object.keys(
							categories
						)"
						as="template"
						:key="category"
						v-slot="{ selected }"
					>
						<button
							class="flex justify-center border-b-2 px-2 py-2 duration-200 outline-none"
							:class="[
								selected
									? '!text-blue-10 border-blue-10'
									: '',
							]"
						>
							{{ category }}
						</button>
					</Tab>
				</TabList>

				<TabPanels class="w-full">
					<TabPanel
						v-for="(posts, idx) in categories"
						:key="idx"
					>
						<component
							:is="posts"
							@changeTab="changeTab"
						/>
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
				class="text-xs text-gray-500 text-center pt-4"
			>
				Добро пожаловать в Mini CRM
			</p>
		</div>
	</section>
</template>
