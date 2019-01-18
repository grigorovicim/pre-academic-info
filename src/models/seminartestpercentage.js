'use strict';
module.exports = (sequelize, DataTypes) => {
  const SeminarTestPercentage = sequelize.define('SeminarTestPercentage', {
    percentage: DataTypes.INTEGER,
    week: DataTypes.INTEGER
  }, {});
  SeminarTestPercentage.associate = function(models) {
    // associations can be defined here

  };
  return SeminarTestPercentage;
};