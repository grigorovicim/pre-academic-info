'use strict';
module.exports = (sequelize, DataTypes) => {
  const SeminarPresence = sequelize.define('SeminarPresence', {
    week: DataTypes.INTEGER
  }, {});
  SeminarPresence.associate = function(models) {
    // associations can be defined here
    models.SeminarPresence.belongsTo(models.Student, {
      foreignKey: {
        name: 'student_id',
        allowNull: false
      }
    });
    models.SeminarPresence.belongsTo(models.Course, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });
    models.SeminarPresence.belongsTo(models.Professor, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });
  };
  return SeminarPresence;
};