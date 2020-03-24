import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliveryManDeliveriesDeliveredController {
  async index(req, res) {
    const { id } = req.params;

    const deliveryManExists = await DeliveryMan.findByPk(id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'Delivery man not found' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: {
          [Op.not]: null,
        },
      },
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
    });

    return res.json(deliveries);
  }
}

export default new DeliveryManDeliveriesDeliveredController();
