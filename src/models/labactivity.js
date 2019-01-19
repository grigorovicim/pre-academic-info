'use strict';
module.exports = (sequelize, DataTypes) => {
  const LabActivity = sequelize.define('LabActivity', {
    week: DataTypes.INTEGER,
    grade: DataTypes.INTEGER
  }, {});
  LabActivity.associate = function(models) {
    // associations can be defined here
    models.LabActivity.belongsTo(models.Student, {
      foreignKey: {
        name: 'student_id',
        allowNull: false
      }
    });
    models.LabActivity.belongsTo(models.Course, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });
    models.LabActivity.belongsTo(models.Professor, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });
  };
  return LabActivity;
};