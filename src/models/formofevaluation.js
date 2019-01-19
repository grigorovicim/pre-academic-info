'use strict';
module.exports = (sequelize, DataTypes) => {
  const FormOfEvaluation = sequelize.define('FormOfEvaluation', {
      seminar_total: DataTypes.INTEGER,
      seminar_minim: DataTypes.INTEGER,
      seminar_exception: DataTypes.INTEGER,
      lab_total: DataTypes.INTEGER,
      lab_minim: DataTypes.INTEGER,
      lab_exception: DataTypes.INTEGER,
      lab_grade: DataTypes.FLOAT,
      lab_percentage: DataTypes.INTEGER,
      seminar_grade: DataTypes.FLOAT,
      seminar_percentage: DataTypes.INTEGER,
      written_grade: DataTypes.FLOAT,
      written_percentage: DataTypes.INTEGER,
      practical_grade: DataTypes.FLOAT,
      practical_percentage: DataTypes.INTEGER,
      project_grade: DataTypes.FLOAT,
      project_percentage: DataTypes.INTEGER,
      other_grade: DataTypes.FLOAT,
      other_percentage: DataTypes.INTEGER,
      note: DataTypes.STRING,
  }, {});
  FormOfEvaluation.associate = function(models) {
    // associations can be defined here
  };
  return FormOfEvaluation;
};