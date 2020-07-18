<template>
	<v-layout column>
		<h1>{{ trip.name }}</h1>
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
			trips: []
		}
	},
	async asyncData({ app }) {
		return {
			trip: await app.$tripRepository.findAllById(1)
		}
	}
}
</script>
