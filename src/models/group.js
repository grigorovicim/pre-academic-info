'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    group_number: DataTypes.INTEGER
  }, {});
  Group.associate = function(models) {
<<<<<<< HEAD
    // associations can be defined here
=======
    models.Group.hasMany(models.Student, {
      foreignKey: {
        name: 'group_id',
        allowNull: false
      }
    });
>>>>>>> origin/develop
  };
  return Group;
};