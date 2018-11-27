'use strict';
module.exports = (sequelize, DataTypes) => {
  const AcademicProgramme = sequelize.define('AcademicProgramme', {
    label: DataTypes.STRING
  }, {});
  AcademicProgramme.associate = function(models) {
    models.AcademicProgramme.hasMany(models.Course, {
      foreignKey: { 
        name: 'academic_programme_id',
        allowNull: false,
      }
    });
  };
  return AcademicProgramme;
};