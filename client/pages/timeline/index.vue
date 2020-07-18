<template>
	<v-layout column>
		<h1>My trips timeline</h1>
		<v-row>
			<v-expansion-panels flat multiple>
				<v-expansion-panel :key="trips.id" v-for="trips in tripsByYear">
					<v-expansion-panel-header>
						<h2>{{ trips[0] }}</h2>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<div
							class="Trip__detail"
							:key="trip.id"
							v-for="trip in trips[1]"
						>
							<div v-text="trip.name"></div>
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

<script lang="ts">
import moment from 'moment'

type Trip = {
	id: number
	name: string
	country: string
	startDate: string
	endDate: string
	latitude: number
	longitude: number
	createdAt: string
	updatedAt: string
}

export default {
	data() {
		return {
			tripsByYearMap: new Map<number, Trip[]>()
		}
	},
	async asyncData({ app }) {
		const trips = await app.$tripRepository.findAll()
		const tripsByYearMap = new Map<number, Trip[]>()
		trips.forEach((trip: Trip) => {
			const year = moment(trip.startDate).year()
			if (tripsByYearMap.get(year)) {
				tripsByYearMap.get(year).push(trip)
			} else {
				tripsByYearMap.set(year, [trip])
			}
		})
		return {
			tripsByYearMap
		}
	},
	computed: {
		tripsByYear() {
			console.log(Array.from(this.tripsByYearMap))
			return Array.from(this.tripsByYearMap)
		}
	}
}
</script>

<style lang="scss">
.Trip__detail {
	display: flex;
	justify-content: space-between;
}
</style>