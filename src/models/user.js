'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.belongsTo(models.Role, {
      foreignKey: {
        name: 'role_id',
        allowNull: false,
      }
    });
  };
  return User;
};