'use strict';
module.exports = (sequelize, DataTypes) => {
  const AcademicProgramme = sequelize.define('AcademicProgramme', {
    label: DataTypes.STRING
  }, {});
  AcademicProgramme.associate = function(models) {
    // associations can be defined here
  };
  return AcademicProgramme;
};