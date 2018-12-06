'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    credits: DataTypes.INTEGER,
    year_of_study: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {});
  
  Course.associate = function(models) {
    models.Course.hasMany(models.ExamResult, {
      foreignKey: {
        name: 'course_id',
        allowNull: false,
      }
    });

    models.Course.hasMany(models.SeminarPresence, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });

    models.Course.hasMany(models.LabPresence, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });

    models.Course.hasMany(models.SeminarActivity, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });

    models.Course.hasMany(models.LabActivity, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });

    models.Course.hasMany(models.StudentCourse, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });

    models.Course.hasMany(models.ProfessorCourse, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });
  };
  return Course;
  
};
  
  
