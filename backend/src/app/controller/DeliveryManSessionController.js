import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';
import authConfig from '../../config/auth';

class DeliveryManSession {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const deliveryMan = await DeliveryMan.findByPk(req.body.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    const { id, name, email, createdAt, avatar } = deliveryMan;

    return res.json({
      user: {
        id,
        name,
        email,
        createdAt,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new DeliveryManSession();
