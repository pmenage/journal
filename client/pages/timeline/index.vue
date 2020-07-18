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
						<div class="Trip__detail" :key="trip.id" v-for="trip in trips[1]">
							<div v-text="trip.title"></div>
							<div>
								<v-btn icon :to="`/trips/${trip.id}`" nuxt>
									<v-icon>mdi-eye</v-icon>
								</v-btn>
								<v-btn icon :to="`/trips/${trip.id}/edit`">
									<v-icon>mdi-pencil</v-icon>
								</v-btn>
								<v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
							</div>
						</div>
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
	}
}
</script>

<style lang="scss">
.Trip__detail {
	display: flex;
	justify-content: space-between;
}
</style>
