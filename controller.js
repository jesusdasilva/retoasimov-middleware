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
    async disabledDates({ query }, res, next) {
        try {
            res.locals = await service.disabledDays(query);
            next();
        } catch (err) {
            next(err);
        }
    },
    async disabledHours({ query }, res, next) {
        try {
            res.locals = await service.disabledHours(query);
            next();
        } catch (err) {
            next(err);
        }
    },
    async active({ query }, res, next) {
        try {
            res.locals = await service.active(query);
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