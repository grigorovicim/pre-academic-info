'use strict';
module.exports = (sequelize, DataTypes) => {
  const Abbreviation = sequelize.define('Abbreviation', {
    label: DataTypes.STRING
  }, {});
  Abbreviation.associate = function(models) {
  };
  return Abbreviation;
};