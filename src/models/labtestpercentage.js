'use strict';
module.exports = (sequelize, DataTypes) => {
  const LabTestPercentage = sequelize.define('LabTestPercentage', {
    percentage: DataTypes.INTEGER
  }, {});
  LabTestPercentage.associate = function(models) {
    // associations can be defined here

  };
  return LabTestPercentage;
};