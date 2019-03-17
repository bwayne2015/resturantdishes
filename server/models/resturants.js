module.exports = (sequelize, DataTypes) => {
  const Resturants = sequelize.define('Resturants', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
  return Resturants;
};