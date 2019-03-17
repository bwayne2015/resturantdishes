module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  
  return Users;
};