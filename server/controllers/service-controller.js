const Service = require('../models/service-model');

const serviceModel = async (req, res) => {
    try {
        const Services = await Service.find();
        return res.status(200).json({ data: Services });
    } catch (error) {
        console.log(error);
        // next(error);

    }
}

module.exports = serviceModel;