const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const type = await Type.create({ name });
            return res.json(type);
        } catch (e) {
            next(e);
        }
        
    }

    async getAll(req, res, next) {
        const types = await Type.findAll();
        return res.json(types)
    }

    async delete(req, res, next) {
        const { id } = req.params;

        if (!id) {
            return next(ApiError.badRequest('No ID indicated'))
        }

        const type = await Type.findOne({ where: { id } });

        if (!type) {
            return next(ApiError.badRequest(`No Type with id: ${id}`))
        }      

        await Type.destroy({ where: { id } });
        
        return res.json({ message: `Type ${type.name} with id ${id} was deleted`});
    } 
}

module.exports = new TypeController();