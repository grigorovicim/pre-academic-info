'use strict';
module.exports = (sequelize, DataTypes) => {
  const CourseConfiguration = sequelize.define('CourseConfiguration', {
    description: DataTypes.STRING,
    rules: DataTypes.STRING,
    hasLecture: DataTypes.BOOLEAN,
    hasLab: DataTypes.BOOLEAN,
    hasSeminar: DataTypes.BOOLEAN,
    numberOfLectures: DataTypes.INTEGER,
    numberOfLabs: DataTypes.INTEGER,
    numberOfSeminars: DataTypes.INTEGER,
    lectureGradePercentage: DataTypes.INTEGER,
    labGradePercentage: DataTypes.INTEGER,
    seminarGradePercentage: DataTypes.INTEGER,
    numberOfLectureTests: DataTypes.INTEGER,
    numberOfLabTests: DataTypes.INTEGER,
    numberOfSeminarTests: DataTypes.INTEGER,
    examWrittenPercentage: DataTypes.INTEGER,
    examPracticalPercentage: DataTypes.INTEGER
  }, {});
  CourseConfiguration.associate = function(models) {
    // associations can be defined here
    models.CourseConfiguration.hasMany(models.LabTestPercentage, {
      foreignKey: {
        name: 'courseconfiguration_id',
        allowNull: false
      }
    });

    models.CourseConfiguration.hasMany(models.CourseTestPercentage, {
      foreignKey: {
        name: 'courseconfiguration_id',
        allowNull: false
      }
    });

    models.CourseConfiguration.hasMany(models.SeminarTestPercentage, {
      foreignKey: {
        name: 'courseconfiguration_id',
        allowNull: false
      }
    });

    models.CourseConfiguration.hasOne(models.Course, {
      foreignKey: {
        name:'courseconfiguration_id',
        allowNull: true
      }
    });
  };
  return CourseConfiguration;
};