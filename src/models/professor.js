'use strict';
module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professor', {
    nickname: DataTypes.STRING
  }, {});
  Professor.associate = function(models) {
    // associations can be defined here
    models.Professor.belongsTo(models.Profile, {
      foreignKey: {
        name: 'profile_id',
        allowNull: false,
      }
    });
  };
  return Professor;
};