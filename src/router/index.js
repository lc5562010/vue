import Vue from 'vue'
import Router from 'vue-router'
import Space from '@/components/Space'
import Station from '@/components/Station'

Vue.use(Router)

export default new Router({
    routes: [
		{
			path: '/',
			name: 'Space',
			component: Space
		},
		{
			path: '/Space',
			name: 'Space',
			component: Space
		},
		{
			path: '/Station',
			name: 'Station',
			component: Station
		},
    ]
})
