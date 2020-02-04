import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import Delivery from '../models/Delivery';
import File from '../models/File';

class FinishedController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const deliveryManExists = await DeliveryMan.findByPk(id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'Delivery man not found' });
    }

    const deliveries = await Delivery.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: {
          [Op.ne]: null,
        },
        signature_id: {
          [Op.ne]: null,
        },
      },
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const { deliveryman_id, delivery_id } = req.params;
    const { originalname: name, filename: path } = req.file;

    const deliveryManExists = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'Delivery man not found' });
    }
    const delivery = await Delivery.findByPk(delivery_id, {
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (!delivery.start_date) {
      return res.status(400).json({ error: 'Delivery not started' });
    }

    // Enviar em imagem com signature_id
    const { id } = await File.create({
      name,
      path,
    });

    delivery.signature_id = id;
    delivery.end_date = new Date();
    await delivery.save();

    return res.json(delivery);
  }
}
export default new FinishedController();
