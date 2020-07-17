<template>
	<v-app>
		<v-app-bar color="#778beb" app flat class="NavBar">
			<router-link to="/" class="NavBar__title">
				<v-toolbar-title v-text="title" />
			</router-link>
			<router-link to="/" class="NavBar__subtitle">
				<v-toolbar-title v-text="trips" />
			</router-link>
			<router-link to="/timeline" class="NavBar__subtitle">
				<v-toolbar-title v-text="timeline" />
			</router-link>
			<router-link to="/map" class="NavBar__subtitle">
				<v-toolbar-title v-text="map" />
			</router-link>
		</v-app-bar>
		<v-content>
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
		<v-footer app>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			title: 'Journal',
			trips: 'My trips',
			timeline: 'Timeline',
			map: 'Map'
		}
	}
}
</script>

<style lang="scss" scoped>
.NavBar__title {
	text-decoration: none;
	color: #fff;
	margin-right: 20px;
}

.NavBar__subtitle {
	text-decoration: none;
	color: #fff;
	margin-left: 20px;

	.v-toolbar__title {
		font-size: 1rem;
	}
}
</style>