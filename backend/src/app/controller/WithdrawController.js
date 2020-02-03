import { isBefore, isAfter, setHours, startOfHour } from 'date-fns';
import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import Delivery from '../models/Delivery';

class WithdrawController {
  async index(req, res) {
    const { delivered } = req.body;
    const { id } = req.params;

    const deliveryManExists = await DeliveryMan.findByPk(id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'Delivery man not found' });
    }

    if (delivered) {
      const deliveries = await Delivery.findAll({
        where: {
          deliveryman_id: id,
          canceled_at: null,
          end_date: {
            [Op.ne]: null,
          },
          signtaure_id: {
            [Op.ne]: null,
          },
        },
      });

      return res.json(deliveries);
    }
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
        signature_id: null,
      },
    });
    return res.json(deliveries);
  }

  async create(req, res) {
    const { deliveryman_id, delivery_id } = req.params;

    const deliveryManExists = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'Delivery man not found' });
    }
    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const date = new Date();
    const hourStart = setHours(startOfHour(date), 8);
    const hourEnd = setHours(startOfHour(date), 18);

    if (isBefore(date, hourStart) && isAfter(date, hourEnd)) {
      return res.status(400).json({
        error: 'Order withdrawals need to be made between 8 am and 6 pm',
      });
    }

    const countDeliveries = await Delivery.count({
      where: {
        canceled_at: null,
        start_date: {
          [Op.between]: [hourStart, hourEnd],
        },
      },
    });

    if (countDeliveries >= 5) {
      return res.status(400).json({
        error: 'Delivery man can only do five deliveries per day',
      });
    }

    delivery.start_date = new Date();

    await delivery.save();

    return res.json(delivery);
  }

  async update(req, res) {
    const { deliveryman_id, delivery_id } = req.params;

    const deliveryManExists = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryManExists) {
      return res.status(400).json({ error: 'Delivery man not found' });
    }
    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    // Enviar em imagem com signature_id

    return res.json();
  }
}

export default new WithdrawController();
