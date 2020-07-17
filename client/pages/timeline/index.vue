<template>
	<v-layout column>
		<h1>My trips timeline</h1>
		<v-row>
			<v-list>
				<v-list-item-group>
					<v-list-item :key="trip.id" v-for="trip in trips">
						<v-list-item-content>
							<nuxt-link :to="`/trips/${trip.id}`">
								<v-list-item-title
									v-text="trip.name"
								></v-list-item-title>
							</nuxt-link>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-row>
	</v-layout>
</template>

<script>
export default {
	data() {
		return {
			trips: []
		}
	},
	async asyncData({ app }) {
		return {
			trips: await app.$tripRepository.findAll()
		}
	}
}
</script>
