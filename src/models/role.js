'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    label: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
<<<<<<< HEAD
    // associations can be defined here
=======
    models.Role.hasMany(models.User, {
      foreignKey: {
        name: 'role_id',
        allowNull: false
      }
    });
>>>>>>> origin/develop
  };
  return Role;
};