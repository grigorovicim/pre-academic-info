'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    year_of_study: DataTypes.INTEGER
  }, {});
  Student.associate = function(models) {
    models.Student.hasMany(models.ExamResult, {
      foreignKey: {
        name: 'student_id',
        allowNull: false
      }
    });

    models.Student.belongsTo(models.Group, {
      foreignKey: {
        name: 'group_id',
        allowNull: false
      }
    });

    models.Student.belongsTo(models.Section, {
      foreignKey: {
        name: 'section_id',
        allowNull: false
      }
    });
    models.Professor.belongsTo(models.Profile, {
      foreignKey: {
        name: 'profile_id',
        allowNull: false,
      }
    });
  };
  return Student;
};