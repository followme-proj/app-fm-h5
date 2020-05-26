import Vue from 'vue';
import {IonicVueRouter} from '@ionic/vue';

Vue.use(IonicVueRouter);

export default new IonicVueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'Index',
			redirect: 'follower',
			component: () => import('../views/index.vue'),
			children: [
				{
					path: 'follower',
					name: 'Follower',
					component: () => import('../views/follower/index.vue')
				}, {
					path: 'my',
					name: 'My',
					component: () => import('../views/my/index.vue')
				},
			]
		},
		{
			path: '/new_message',
			name: 'NewMessage',
			component: () => import('../views/message/new.vue')
		},
		{
			path: '/sign_in',
			name: 'SignIn',
			component: () => import('../views/SignIn.vue')
		},
		{
			path: '/my_class',
			name: 'MyClass',
			component: () => import('../views/MyClass.vue')
		},
	]
});
