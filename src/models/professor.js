'use strict';
module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professor', {
    nickname: DataTypes.STRING
  }, {});
  Professor.associate = function(models) {
<<<<<<< HEAD
    // associations can be defined here
=======
>>>>>>> origin/develop
    models.Professor.belongsTo(models.Profile, {
      foreignKey: {
        name: 'profile_id',
        allowNull: false,
      }
    });
<<<<<<< HEAD
=======

    models.Professor.hasMany(models.Course, {
      foreignKey: {
        name: 'owner_id',
        allowNull: false
      }
    });
>>>>>>> origin/develop
  };
  return Professor;
};