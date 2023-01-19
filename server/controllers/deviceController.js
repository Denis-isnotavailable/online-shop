const uuid = require('uuid');
const path = require('path');

const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');


class DeviceController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            let filename = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', filename));

            const device = await Device.create({ name, price, brandId, typeId, img: filename });

            if (info) {
                let infoParsed = JSON.parse(info)
                infoParsed.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }

    async getAll(req, res, next) {
        let { brandId, typeId, limit, page } = req.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        let devices;

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset});
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset});
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset});
        }

        return res.json(devices);
    }

    async getOne(req, res, next) {
        const { id } = req.params;

        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }]
        });

        return res.json(device);
    }

    async delete(req, res, next) {
        const { id } = req.params;

        if (!id) {
            return next(ApiError.badRequest('No ID indicated'))
        }

        const device = await Device.findOne({ where: { id } });

        if (!device) {
            return next(ApiError.badRequest(`No Device with id: ${id}`))
        }      

        await Device.destroy({ where: { id } });
        
        return res.json({ message: `Device ${device.name} with id ${id} was deleted`});
    } 
}

module.exports = new DeviceController();