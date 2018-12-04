'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    year_of_study: DataTypes.INTEGER
  }, {});
  Student.associate = function(models) {
<<<<<<< HEAD
    models.Student.belongsTo(models.Group, {
      foreignKey: {
        name: 'group_id',
        allowNull: false,
      }
    });
    models.Student.belongsTo(models.Section, {
      foreignKey: { 
        name: 'section_id',
        allowNull: false,
=======
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
>>>>>>> origin/develop
      }
    });
  };
  return Student;
};