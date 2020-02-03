import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';
import Mail from '../../lib/Mail';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveries = await Delivery.findAll({
      where: {
        canceled_at: null,
      },
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
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
        {
          model: DeliveryMan,
          as: 'delivery_man',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number()
        .positive()
        .integer()
        .required(),
      deliveryman_id: Yup.number()
        .positive()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const deliveryCreated = await Delivery.create(req.body);

    const delivery = await Delivery.findByPk(deliveryCreated.id, {
      include: [
        {
          model: DeliveryMan,
          as: 'delivery_man',
          attributes: ['name', 'email'],
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
    });

    await Mail.sendMail({
      to: `${delivery.delivery_man.name} <${delivery.delivery_man.email}>`,
      subject: `${delivery.product} já está disponível para a retirada}`,
      template: 'delivery_available',
      context: {
        delivery_man: delivery.delivery_man.name,
        product: delivery.product,
        name: delivery.recipient.name,
        address: `${delivery.recipient.address}, ${
          delivery.recipient.number
        } - ${delivery.recipient.address_complement || ''} - ${
          delivery.recipient.city
        } - ${delivery.recipient.state} - ${delivery.recipient.zip_code} `,
      },
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number()
        .positive()
        .integer(),

      deliveryman_id: Yup.number()
        .positive()
        .integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);
    await delivery.update(req.body);
    return res.json();
  }

  async destroy(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    await delivery.update({
      canceled_at: new Date(),
    });

    return res.json();
  }
}

export default new DeliveryController();
