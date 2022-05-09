import service from './service.js';

export default {
    async list(_, res, next) {
        try {
            res.locals = await service.list();
            next();
        } catch (err) {
            next(err);
        }
    },
    async disabledDate({ query }, res, next) {
        try {
            res.locals = await service.disabledDate(query);
            next();
        } catch (err) {
            next(err);
        }
    },
    async create({ body }, res, next) {
        try {
            res.locals = await service.create(body);
            next();
        } catch (err) {
            next(err);
        }
    }
}