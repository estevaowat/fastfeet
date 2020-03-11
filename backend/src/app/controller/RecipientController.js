import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { page = 1, query = '', all = false } = req.query;

    if (all) {
      const recipients = await Recipient.findAll();
      return res.json(recipients);
    }
    const recipients = await Recipient.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      order: ['state', 'city', 'address'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    const {
      name,
      address,
      number,
      address_complement,
      state,
      city,
      zip_code,
    } = recipient;

    return res.json({
      id,
      name,
      address,
      number,
      address_complement,
      state,
      city,
      zip_code,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
      address_complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      address: Yup.string(),
      number: Yup.string(),
      address_complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const recipient = await Recipient.findByPk(id);

    const {
      name,
      address,
      number,
      address_complement,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      name,
      address,
      number,
      address_complement,
      state,
      city,
      zip_code,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    await Recipient.destroy({
      where: {
        id,
      },
    });

    return res.json();
  }
}

export default new RecipientController();
