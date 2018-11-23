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
  };
  return Course;
};