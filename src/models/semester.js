'use strict';
module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define('Semester', {
    label: DataTypes.STRING
  }, {});
  Semester.associate = function(models) {
    // associations can be defined here
  };
  return Semester;
};