import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled: {
          type: Sequelize.VIRTUAL,
          get() {
            return Boolean(this.canceled_at);
          },
        },
        delivered: {
          type: Sequelize.VIRTUAL,
          get() {
            return Boolean(this.end_date);
          },
        },
        pending: {
          type: Sequelize.VIRTUAL,
          get() {
            return Boolean(this.start_date);
          },
        },

        available: {
          type: Sequelize.VIRTUAL,
          get() {
            return Boolean(!this.start_date);
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });

    this.belongsTo(models.DeliveryMan, {
      foreignKey: 'deliveryman_id',
      as: 'delivery_man',
    });

    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Delivery;
