'use strict';
module.exports = (sequelize, DataTypes) => {
  const CourseTestPercentage = sequelize.define('CourseTestPercentage', {
    percentage: DataTypes.INTEGER
  }, {});
  CourseTestPercentage.associate = function(models) {
    // associations can be defined here

  };
  return CourseTestPercentage;
};