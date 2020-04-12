export default ($axios: any) => (resource: any) => ({
    findAll() {
        return $axios.$get(`${resource}`);
    },

    findAllById(id: number) {
        return $axios.$get(`${resource}/${id}`);
    },

    create(payload: Object) {
        return $axios.$post(`${resource}`, payload)
    },

    update(id: number, payload: Object) {
        return $axios.$post(`${resource}/${id}`, payload)
    },

    delete(id: number) {
        return $axios.$delete(`${resource}/${id}`)
    }
})