import createRepository from '~/api/repository';

export default (ctx: any, inject: any) => {
    const repositoryWithAxios = createRepository(ctx.$axios);
    inject('tripRepository', repositoryWithAxios('http://localhost:8080/trips'));
}