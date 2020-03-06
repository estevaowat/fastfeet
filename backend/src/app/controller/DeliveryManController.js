import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  async index(req, res) {
    const { page = 1, query = '' } = req.query;

    const deliveryMen = await DeliveryMan.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryMen);
  }

  async show(req, res) {
    const { id } = req.params;
    const deliveryMan = await DeliveryMan.findByPk(id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryMan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;
    const deliveryManExists = await DeliveryMan.findOne({
      where: {
        email,
      },
    });

    if (deliveryManExists) {
      return res
        .status(400)
        .json({ error: 'Already has a delivery man with this e-mail' });
    }

    const { id, name } = await DeliveryMan.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return res.status(400).json({ error: 'Delivery man not found' });
    }

    const { name, email } = await deliveryMan.update(req.body);

    return res.json({ id, name, email });
  }

  async destroy(req, res) {
    const { id } = req.params;

    await DeliveryMan.destroy({
      where: {
        id,
      },
    });

    return res.json();
  }
}

export default new DeliveryManController();
