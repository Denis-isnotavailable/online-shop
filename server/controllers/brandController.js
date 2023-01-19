const { Brand } = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res, next) {
        const { name } = req.body;
        const brand = await Brand.create({ name });
        return res.json(brand);
    }

    async getAll(req, res, next) {
        const brands = await Brand.findAll();
        return res.json(brands)
    }

    async delete(req, res, next) {
        const { id } = req.params;

        if (!id) {
            return next(ApiError.badRequest('No ID indicated'))
        }

        const brand = await Brand.findOne({ where: { id } });

        if (!brand) {
            return next(ApiError.badRequest(`No Device with id: ${id}`))
        }      

        await Brand.destroy({ where: { id } });
        
        return res.json({ message: `Brand ${brand.name} with id ${id} was deleted`});

    } 
}

module.exports = new BrandController();