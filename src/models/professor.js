'use strict';
module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professor', {
    nickname: DataTypes.STRING
  }, {});
  Professor.associate = function(models) {
    models.Professor.belongsTo(models.Profile, {
      foreignKey: {
        name: 'profile_id',
        allowNull: false,
      }
    });

    models.Professor.hasMany(models.Course, {
      foreignKey: {
        name: 'owner_id',
        allowNull: false
      }
    });
  };
  return Professor;
};