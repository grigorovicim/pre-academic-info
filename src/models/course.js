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
  // associations can be defined here
  models.Course.belongsTo(models.AcademicProgramme, {
  foreignKey: {
  name: 'academic_programme',
  allowNull: false,
  }
  });
  models.Course.belongsTo(models.Section, {
  foreignKey: {
  name: 'section_id',
  allowNull: false,
  }
  });
  
  models.Course.belongsTo(models.Semester, {
  foreignKey: {
  name: 'semester_id',
  allowNull: false,
  }
  });
  models.Course.belongsTo(models.FormOfEvaluation, {
  foreignKey: {
  name: 'form_of_evaluation',
  allowNull: false,
  }
  });
  models.Course.belongsTo(models.Professor, {
    foreignKey: {
    name: 'owner_id',
    allowNull: false,
    }
    });
  };
  return Course;
  
};
  
  
