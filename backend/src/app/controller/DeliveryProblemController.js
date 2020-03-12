import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import DeliveryProblem from '../models/DeliveryProblem';
import Mail from '../../lib/Mail';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveryProblems = await DeliveryProblem.findAndCountAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product'],
        },
      ],
    });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const deliveryExists = await Delivery.findByPk(id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const data = {
      delivery_id: Number(req.params.id),
      ...req.body,
    };

    const { delivery_id, description } = await DeliveryProblem.create(data);

    return res.json({ id: Number(id), description, delivery_id });
  }

  async update(req, res) {
    const { id } = req.params;

    const deliveryProblem = await DeliveryProblem.findByPk(id, {
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'product', 'canceled_at'],
          include: [
            {
              model: DeliveryMan,
              as: 'delivery_man',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'name',
                'address',
                'number',
                'address_complement',
                'state',
                'city',
                'zip_code',
              ],
            },
          ],
        },
      ],
    });

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Delivery problem not found' });
    }

    deliveryProblem.delivery.canceled_at = new Date();
    await deliveryProblem.save();

    await Mail.sendMail({
      to: `${deliveryProblem.delivery.delivery_man.name} <${deliveryProblem.delivery.delivery_man.email}>`,
      subject: `Novo cancelamento devido ao problema`,
      template: 'cancellation',
      context: {
        delivery_man: deliveryProblem.delivery.delivery_man.name,
        product: deliveryProblem.delivery.product,
        problem: deliveryProblem.description,
        name: deliveryProblem.delivery.recipient.name,
        address: `${deliveryProblem.delivery.recipient.address}, ${
          deliveryProblem.delivery.recipient.number
        } - ${deliveryProblem.delivery.recipient.address_complement || ''} - ${
          deliveryProblem.delivery.recipient.city
        } - ${deliveryProblem.delivery.recipient.state} - ${
          deliveryProblem.delivery.recipient.zip_code
        } `,
      },
    });

    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemController();
