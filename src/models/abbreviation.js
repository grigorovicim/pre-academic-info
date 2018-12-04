'use strict';
module.exports = (sequelize, DataTypes) => {
  const Abbreviation = sequelize.define('Abbreviation', {
    label: DataTypes.STRING
  }, {});
  Abbreviation.associate = function(models) {
<<<<<<< HEAD
    // associations can be defined here
=======
>>>>>>> origin/develop
  };
  return Abbreviation;
};