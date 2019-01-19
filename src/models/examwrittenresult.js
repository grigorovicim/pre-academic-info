'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExamWrittenResult = sequelize.define('ExamWrittenResult', {
    grade: DataTypes.REAL
  }, {});
  ExamWrittenResult.associate = function(models) {
    models.ExamWrittenResult.belongsTo(models.Student, {
      foreignKey: { 
        name: 'student_id',
        allowNull: false,
      }
    });
    models.ExamWrittenResult.belongsTo(models.Course, {
      foreignKey: { 
        name: 'course_id',
        allowNull: false
      }
    });
  };
  return ExamWrittenResult;
};