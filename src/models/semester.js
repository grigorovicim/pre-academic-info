'use strict';
module.exports = (sequelize, DataTypes) => {
  const Semester = sequelize.define('Semester', {
    label: DataTypes.STRING
  }, {});
  Semester.associate = function(models) {
    models.Semester.hasMany(models.Course, {
      foreignKey: {
        name: 'semester_id',
        allowNull: false,
      }
    });

    models.Semester.hasMany(models.Student, {
      foreignKey: {
        name: 'semester_id',
        allowNull: false
      }
    });
  };
  return Semester;
};