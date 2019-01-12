'use strict';
module.exports = (sequelize, DataTypes) => {
  const LabPresence = sequelize.define('LabPresence', {
    date_of_presence: DataTypes.DATE
  }, {});
  LabPresence.associate = function(models) {
    // associations can be defined here
    models.LabPresence.belongsTo(models.Student, {
      foreignKey: {
        name: 'student_id',
        allowNull: false
      }
    });
    models.LabPresence.belongsTo(models.Course, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });
    models.LabPresence.belongsTo(models.Professor, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });
  };
  return LabPresence;
};