<template>
	<v-layout align-start column>
		<h1>Add a trip</h1>
		<v-form ref="form" v-model="valid">
			<v-text-field v-model="formData.name" :rules="nameRules" label="Name" required></v-text-field>
			<v-menu
				v-model="startMenu"
				:close-on-content-click="false"
				:nudge-right="40"
				transition="scale-transition"
				offset-y
				min-width="290px"
			>
				<template v-slot:activator="{ on }">
					<v-text-field v-model="formData.startDate" label="Start date" readonly v-on="on"></v-text-field>
				</template>
				<v-date-picker v-model="formData.startDate" @input="startMenu = false"></v-date-picker>
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
					<v-text-field v-model="formData.endDate" label="End date" readonly v-on="on"></v-text-field>
				</template>
				<v-date-picker v-model="formData.endDate" @input="endMenu = false"></v-date-picker>
			</v-menu>
			<v-text-field v-model="formData.country" :rules="countryRules" label="Country" required></v-text-field>
			<v-text-field v-model="formData.latitude" label="Latitude" required></v-text-field>
			<v-text-field v-model="formData.longitude" label="Longitude" required></v-text-field>
			<v-btn @click="submit">Submit</v-btn>
		</v-form>
	</v-layout>
</template>

<script>
export default {
	data: () => ({
		valid: false,
		formData: {
			name: "",
			startDate: new Date().toISOString().substr(0, 10),
			endDate: new Date().toISOString().substr(0, 10),
			country: "",
			latitude: 0,
			longitude: 0
		},
		startMenu: false,
		endMenu: false,
		nameRules: [v => !!v || "Name is required"],
		countryRules: [v => !!v || "Contry is required"]
	}),
	methods: {
		async submit() {
			if (!this.valid) {
				this.$refs.form.validate();
			} else {
				console.log(this.formData);
				const trip = await this.$axios.$post(
					"http://localhost:8080/trips",
					this.formData
				);
				this.$router.push({ path: "/trips" });
			}
		}
	}
};
</script>
