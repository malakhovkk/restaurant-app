import { createWebHistory, createRouter } from 'vue-router';
import Main from '@/components/Main.vue';
import Time from '@/components/Time.vue';
import LogIn from '@/components/LogIn.vue';

const routes = [
	{
		path: '/time',
		name: 'Time',
		component: Time
	},
	{
		path: '/main',
		name: 'Main',
		component: Main
	},
	{
		path: '/',
		name: 'LogIn',
		component: LogIn
	}
];

const router = createRouter({
	history: createWebHistory(),
	mode: 'history',
	routes
});

export default router;
