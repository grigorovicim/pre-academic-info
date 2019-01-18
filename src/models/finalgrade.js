'use strict';
module.exports = (sequelize, DataTypes) => {
  const FinalGrade = sequelize.define('FinalGrade', {
    grade: DataTypes.REAL
  }, {});
  FinalGrade.associate = function(models) {
    models.FinalGrade.belongsTo(models.Student, {
      foreignKey: { 
        name: 'student_id',
        allowNull: false,
      }
    });
    models.FinalGrade.belongsTo(models.Course, {
      foreignKey: { 
        name: 'course_id',
        allowNull: false
      }
    });
  };
  return FinalGrade;
};