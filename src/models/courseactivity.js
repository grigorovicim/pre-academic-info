'use strict';
module.exports = (sequelize, DataTypes) => {
  const CourseActivity = sequelize.define('CourseActivity', {
    week: DataTypes.INTEGER,
    grade: DataTypes.INTEGER
  }, {});
  CourseActivity.associate = function(models) {
    // associations can be defined here
    models.CourseActivity.belongsTo(models.Student, {
      foreignKey: {
        name: 'student_id',
        allowNull: false
      }
    });
    models.CourseActivity.belongsTo(models.Course, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });
    models.CourseActivity.belongsTo(models.Professor, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });
  };
  return CourseActivity;
};