const resource = '/trips'

export default ($axios: any) => ({
	findAll() {
		return $axios.$get(`${resource}`)
	},

	findById(id: number) {
		return $axios.$get(`${resource}/${id}`)
	},

	create(payload: Object) {
		return $axios.$post(`${resource}`, payload)
	},

	update(id: number, payload: Object) {
		return $axios.$post(`${resource}/${id}`, payload)
	},

	delete(id: number) {
		return $axios.$delete(`${resource}/${id}`)
	},

	uploadCoverImage(id: number, formData: Object) {
		return $axios.$post(`${resource}/${id}/coverImage/upload`, formData, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		})
	}
})
