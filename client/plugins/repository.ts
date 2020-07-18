import createRepository from '~/repositories/Repository'

export default (ctx: any, inject: any) => {
	inject('repositories', createRepository(ctx.$axios))
}
