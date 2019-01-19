'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProfessorCourse = sequelize.define('ProfessorCourse', {
    year: DataTypes.INTEGER,
    isTeachingSeminar: DataTypes.BOOLEAN,
    isTeachingLab: DataTypes.BOOLEAN,
    isTeachingCourse: DataTypes.BOOLEAN
  }, {});
  ProfessorCourse.associate = function(models) {
    // associations can be defined here
    models.ProfessorCourse.belongsTo(models.Professor, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false,
      }
    });

    models.ProfessorCourse.belongsTo(models.Course, {
      foreignKey: {
        name: 'course_id',
        allowNull: false,
      }
    });
  };
  return ProfessorCourse;
};