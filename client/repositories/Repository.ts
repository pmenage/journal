import TripRepository from './TripRepository'

export default ($axios: any) => ({
	trip: TripRepository($axios)
})
