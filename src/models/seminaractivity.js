'use strict';
module.exports = (sequelize, DataTypes) => {
  const SeminarActivity = sequelize.define('SeminarActivity', {
    date_of_presence: DataTypes.DATE,
    grade: DataTypes.INTEGER
  }, {});
  SeminarActivity.associate = function(models) {
    // associations can be defined here
    models.SeminarActivity.belongsTo(models.Student, {
      foreignKey: {
        name: 'student_id',
        allowNull: false
      }
    });
    models.SeminarActivity.belongsTo(models.Course, {
      foreignKey: {
        name: 'course_id',
        allowNull: false
      }
    });
    models.SeminarActivity.belongsTo(models.Professor, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });
  };
  return SeminarActivity;
};