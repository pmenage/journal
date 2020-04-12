<template>
	<v-layout column>
		<h1>My trips</h1>
		<v-row>
			<v-list>
				<v-list-item-group>
					<v-list-item :key="trip.id" v-for="trip in trips">
						<v-list-item-content>
							<nuxt-link :to="`/trips/${trip.id}`">
								<v-list-item-title v-text="trip.name"></v-list-item-title>
							</nuxt-link>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-row>
		<v-row>
			<v-col cols="12">
				<div id="map"></div>
			</v-col>
		</v-row>
	</v-layout>
</template>

<script>
import mapboxgl from "mapbox-gl";

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
	},
	mounted() {
		mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
		const map = new mapboxgl.Map({
			container: "map",
			style: "mapbox://styles/mapbox/streets-v11",
			center: [-79.4512, 43.6568],
			zoom: 2
		});
		new mapboxgl.Marker({
			draggable: true
		})
			.setLngLat([0, 0])
			.addTo(map);

		map.on("load", () => {
			this.trips.forEach(trip => {
				new mapboxgl.Marker()
					.setLngLat([trip.longitude, trip.latitude])
					.setPopup(
						new mapboxgl.Popup().setHTML(
							`<h3>${trip.name}</h3><p>${trip.startDate}</p>`
						)
					)
					.addTo(map);
			});
		});
	}
};
</script>
