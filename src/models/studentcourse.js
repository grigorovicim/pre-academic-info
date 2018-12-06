'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentCourse = sequelize.define('StudentCourse', {
    year: DataTypes.INTEGER
  }, {});
  StudentCourse.associate = function(models) {
    // associations can be defined here
    models.StudentCourse.belongsTo(models.Student, {
      foreignKey: {
        name: 'student_id',
        allowNull: false,
      }
    });

    models.StudentCourse.belongsTo(models.Course, {
      foreignKey: {
        name: 'course_id',
        allowNull: false,
      }
    });
  };
  return StudentCourse;
};