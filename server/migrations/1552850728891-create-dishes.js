module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Dishes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dish_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resturant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currently_avaliable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Dishes'),
};