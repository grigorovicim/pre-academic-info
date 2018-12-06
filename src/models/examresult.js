'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExamResult = sequelize.define('ExamResult', {
    grade: DataTypes.REAL
  }, {});
  ExamResult.associate = function(models) {
    models.ExamResult.belongsTo(models.Student, {
      foreignKey: { 
        name: 'student_id',
        allowNull: false,
      }
    });
    models.ExamResult.belongsTo(models.Course, {
      foreignKey: { 
        name: 'course_id',
        allowNull: false
      }
    });
  };
  return ExamResult;
};