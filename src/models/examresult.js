'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExamResult = sequelize.define('ExamResult', {
    grade: DataTypes.REAL
  }, {});
  ExamResult.associate = function(models) {
  };
  return ExamResult;
};