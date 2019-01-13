'use strict';
module.exports = (sequelize, DataTypes) => {
  const CoursePresence = sequelize.define('CoursePresence', {
    week: DataTypes.INTEGER
  }, {});
  CoursePresence.associate = function(models) {
    // associations can be defined here
    models.CoursePresence.belongsTo(models.Student, {
      foreignKey: {
        name: 'student_id',
        allowNull: false
      }
    });
    models.CoursePresence.belongsTo(models.Course, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });
    models.CoursePresence.belongsTo(models.Professor, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });
  };
  return CoursePresence;
};