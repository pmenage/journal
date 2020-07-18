<template>
	<v-layout align-start column>
		<h1>Add a trip</h1>
		<v-container>
			<v-row>
				<v-col>
					<v-form ref="form" v-model="valid">
						<v-text-field
							v-model="formData.title"
							:rules="titleRules"
							label="Title"
							required
						></v-text-field>
						<v-text-field
							v-model="formData.subtitle"
							:rules="subtitleRules"
							label="Subtitle"
							required
						></v-text-field>
						<v-file-input
							accept="image/*"
							label="Cover image"
							@change="coverImageSelected"
						></v-file-input>
						<v-menu
							v-model="startMenu"
							:close-on-content-click="false"
							:nudge-right="40"
							transition="scale-transition"
							offset-y
							min-width="290px"
						>
							<template v-slot:activator="{ on }">
								<v-text-field
									v-model="formData.startDate"
									label="Start date"
									readonly
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="formData.startDate"
								@input="startMenu = false"
							></v-date-picker>
						</v-menu>
						<v-menu
							v-model="endMenu"
							:close-on-content-click="false"
							:nudge-right="40"
							transition="scale-transition"
							offset-y
							min-width="290px"
						>
							<template v-slot:activator="{ on }">
								<v-text-field
									v-model="formData.endDate"
									label="End date"
									readonly
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="formData.endDate"
								@input="endMenu = false"
							></v-date-picker>
						</v-menu>
						<div id="geocoder" class="geocoder"></div>
						<div id="geocoder2" class="geocoder"></div>
						<v-text-field
							v-model="formData.country"
							:rules="countryRules"
							label="Country"
							required
						></v-text-field>
						<v-text-field
							v-model="formData.latitude"
							label="Latitude"
							required
						></v-text-field>
						<v-text-field
							v-model="formData.longitude"
							label="Longitude"
							required
						></v-text-field>
						<v-btn @click="submit">Submit</v-btn>
					</v-form>
				</v-col>
				<v-col>
					<div class="map-container">
						<div id="map"></div>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-layout>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

export default {
	data: () => ({
		valid: false,
		formData: {
			title: '',
			subtitle: '',
			startDate: new Date().toISOString().substr(0, 10),
			endDate: new Date().toISOString().substr(0, 10),
			coverImage: '',
			country: '',
			latitude: 0,
			longitude: 0
		},
		startMenu: false,
		endMenu: false,
		titleRules: [v => !!v || 'Title is required'],
		subtitleRules: [v => !!v || 'Subtitle is required'],
		countryRules: [v => !!v || 'Country is required'],
		coverImage: ''
	}),
	methods: {
		async submit() {
			if (!this.valid) {
				this.$refs.form.validate()
			} else {
				const trip = await this.$repositories.trip.create(this.formData)
				const imageFormData = new FormData()
				imageFormData.append('file', this.coverImage)
				await this.$repositories.trip.uploadCoverImage(trip.id, imageFormData)
				this.$router.push({ path: '/timeline' })
			}
		},
		coverImageSelected(e) {
			console.log(e)
			this.coverImage = e
			console.log(this.coverImage)
		}
	},
	mounted() {
		mapboxgl.accessToken = process.env.MAPBOX_TOKEN
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-79.4512, 43.6568],
			zoom: 13
		})

		const geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl,
			placeholder: 'Location'
		})
		document.getElementById('geocoder').appendChild(geocoder.onAdd(map))
		geocoder.on('result', data => {
			this.formData.longitude = data.result.center[0]
			this.formData.latitude = data.result.center[1]
			this.formData.country = data.result.context.find(context =>
				context.id.includes('country')
			).text
		})
	}
}
</script>

<style lang="scss" scoped>
.map-container {
	height: 500px;
	width: 400px;
	margin-left: 50px;
}

#map {
	height: 100%;
}

.mapboxgl-canvas {
	height: 100%;
}
</style>
