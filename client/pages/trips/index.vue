<template>
	<v-layout column justify-center align-center>
		<v-flex xs12 sm8 md6>
			<h1>My trips</h1>
			<ul>
				<li :key="trip.id" v-for="trip in trips">
					<nuxt-link :to="`/trips/${trip.id}`">{{trip.name}}</nuxt-link>
				</li>
			</ul>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	data() {
		return {
			trips: []
		};
	},
	async asyncData({ app }) {
		return {
			trips: await app.$tripRepository.findAll()
		};
	}
};
</script>
