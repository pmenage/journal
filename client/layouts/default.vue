<template>
	<v-app>
		<v-app-bar app>
			<router-link to="/">
				<v-toolbar-title v-text="title" />
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
			title: "Vuetify.js"
		};
	}
};
</script>
