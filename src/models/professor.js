'use strict';
module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professor', {
    nickname: DataTypes.STRING
  }, {});
  Professor.associate = function(models) {
    models.Professor.belongsTo(models.Profile, {
      foreignKey: {
        name: 'profile_id',
        allowNull: false,
      }
    });

    models.Professor.hasMany(models.SeminarPresence, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });

    models.Professor.hasMany(models.LabPresence, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });

    models.Professor.hasMany(models.SeminarActivity, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });

    models.Professor.hasMany(models.LabActivity, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });

    models.Professor.hasMany(models.CourseActivity, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });

    models.Professor.hasMany(models.CoursePresence, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });

    models.Professor.hasMany(models.ProfessorCourse, {
      foreignKey: {
        name: 'professor_id',
        allowNull: false
      }
    });

  //   models.Professor.hasMany(models.Course, {
  //     foreignKey: {
  //       name: 'owner_id',
  //       allowNull: false
  //     }
  //   });
  };
  return Professor;
};