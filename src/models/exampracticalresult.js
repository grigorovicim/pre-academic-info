'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExamPracticalResult = sequelize.define('ExamPracticalResult', {
    grade: DataTypes.REAL
  }, {});
  ExamPracticalResult.associate = function(models) {
    models.ExamPracticalResult.belongsTo(models.Student, {
      foreignKey: { 
        name: 'student_id',
        allowNull: false,
      }
    });
    models.ExamPracticalResult.belongsTo(models.Course, {
      foreignKey: { 
        name: 'course_id',
        allowNull: false
      }
    });
  };
  return ExamPracticalResult;
};