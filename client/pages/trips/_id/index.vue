<template>
	<v-layout column>
		<h1>{{ trip.title }}</h1>
		<v-row>
			<v-col>
				<div>
					{{ trip.country }}, from
					{{ trip.startDate | moment('MMMM Do YYYY') }} to
					{{ trip.endDate | moment('MMMM Do YYYY') }}
				</div>
			</v-col>
		</v-row>
	</v-layout>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
	data() {
		return {
			trip: undefined
		}
	},
	async fetch() {
		this.trip = await this.$repositories.trip.findById(1)
	}
}
</script>
