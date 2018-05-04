<template>
	<div id="app">
		<myHeader></myHeader>
		<myNav></myNav>
		<div class="content">
			<router-view/>
		</div>
	</div>
</template>

<script>
	import Header from './components/frame/Header.vue'
	import LeftNav from './components/frame/LeftNav.vue'
	export default {
		name: 'App',
		components: {
			myHeader: Header,
			myNav: LeftNav
		}
	}
</script>

<style lang="less" scoped>
	.content {
		position: absolute;
		left: 240px;
		top: 65px;
		bottom: 0;
		right: 0;
		padding: 20px;
	}
</style>
