'use strict';
module.exports = (sequelize, DataTypes) => {
  const YearOfStudy = sequelize.define('YearOfStudy', {
    label: DataTypes.STRING
  }, {});
  YearOfStudy.associate = function(models) {
    models.YearOfStudy.hasMany(models.Student, {
      foreignKey: {
        name: 'year_of_study_id',
        allowNull: false
      }
    });
  };
  return YearOfStudy;
};