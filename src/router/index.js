import Vue from 'vue'
import Router from 'vue-router'
import Lock from '@/components/nav/Lock'
import Person from '@/components/nav/Person'
import Power from '@/components/nav/Power'
import History from '@/components/nav/History'

Vue.use(Router)

// 路由配置
export default new Router({
    routes: [
		{
			path: '/',
			name: 'Lock',
			component: Lock
		},
		{
			path: '/Lock',
			name: 'Lock',
			component: Lock
		},
		{
			path: '/Person',
			name: 'Person',
			component: Person 
		},
		{
			path: '/Power',
			name: 'Power',
			component: Power 
		},
		{
			path: '/History',
			name: 'History',
			component: History 
		},
    ]
})
