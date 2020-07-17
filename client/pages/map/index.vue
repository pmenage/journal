<template>
	<v-layout column>
		<h1>My trips</h1>
		<v-row>
			<v-col cols="12" class="map-container">
				<div id="map"></div>
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
			trips: await app.$tripRepository.findAll()
		}
	},
	mounted() {
		mapboxgl.accessToken = process.env.MAPBOX_TOKEN
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-79.4512, 43.6568],
			zoom: 2,
			height: '500'
		})
		new mapboxgl.Marker({
			draggable: true
		})
			.setLngLat([0, 0])
			.addTo(map)

		map.on('load', () => {
			map.resize()
			this.trips.forEach(trip => {
				new mapboxgl.Marker()
					.setLngLat([trip.longitude, trip.latitude])
					.setPopup(
						new mapboxgl.Popup().setHTML(
							`<h3>${trip.name}</h3><p>${trip.startDate}</p>`
						)
					)
					.addTo(map)
			})
		})
	}
}
</script>

<style scoped>
.map-container {
	height: 500px;
}

#map {
	height: 100%;
}

.mapboxgl-canvas {
	height: 100%;
}
</style>