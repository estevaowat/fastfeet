module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipients', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNullL: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNullL: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNullL: false,
      },
      address_complement: {
        type: Sequelize.STRING,
        allowNullL: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNullL: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNullL: false,
      },
      zip_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('recipients');
  },
};
