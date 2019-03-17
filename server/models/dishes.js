module.exports = (sequelize, DataTypes) => {
  const Dishes = sequelize.define('Dishes', {
    dish_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resturant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currently_avaliable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  
  return Dishes;
};