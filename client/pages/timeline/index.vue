<template>
	<v-layout column>
		<h1>My trips timeline</h1>
		<v-row>
			<v-col v-if="tripsByYear.length === 0">
				You haven't created any trip yet. Create your first here!
			</v-col>
			<v-expansion-panels v-if="tripsByYear.length > 0" flat multiple>
				<v-expansion-panel :key="trips.id" v-for="trips in tripsByYear">
					<v-expansion-panel-header>
						<h2>{{ trips[0] }}</h2>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-card
							max-width="344"
							class="mx-auto"
							:key="trip.id"
							v-for="trip in trips[1]"
						>
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title class="headline">{{
										trip.title
									}}</v-list-item-title>
									<v-list-item-subtitle>{{
										trip.subtitle
									}}</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-img :src="getImageUrl(trip.coverImage)" height="194"></v-img>

							<v-card-text>
								Visit ten places on our planet that are undergoing the biggest
								changes today.
							</v-card-text>

							<v-card-actions>
								<v-btn text color="deep-purple accent-4">
									Read
								</v-btn>
								<v-btn text color="deep-purple accent-4">
									Bookmark
								</v-btn>
								<v-spacer></v-spacer>
								<v-btn icon>
									<v-icon>mdi-heart</v-icon>
								</v-btn>
								<v-btn icon>
									<v-icon>mdi-share-variant</v-icon>
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-row>
	</v-layout>
</template>

<script>
import moment from 'moment'

export default {
	data() {
		return {
			tripsByYear: []
		}
	},
	async fetch() {
		const trips = await this.$repositories.trip.findAll()
		const tripsByYearMap = new Map()
		trips.forEach(trip => {
			const year = moment(trip.startDate).year()
			if (tripsByYearMap.get(year) === undefined) {
				tripsByYearMap.set(year, [trip])
			} else {
				tripsByYearMap.get(year).push(trip)
			}
		})
		this.tripsByYear = Array.from(tripsByYearMap)
	},
	methods: {
		getImageUrl(coverImage) {
			return coverImage
				? `${process.env.API_BASE_URL}/images/${coverImage}`
				: '/v.png'
		}
	}
}
</script>

<style lang="scss"></style>
