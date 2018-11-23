'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormOfEvaluation = sequelize.define('FormOfEvaluation', {
    label: DataTypes.STRING
  }, {});
  FormOfEvaluation.associate = function(models) {
    // associations can be defined here
  };
  return FormOfEvaluation;
};