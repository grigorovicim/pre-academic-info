'use strict';
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        year_of_study: DataTypes.INTEGER,
        nr_matricol: DataTypes.INTEGER
    }, {});
    Student.associate = function (models) {
        models.Student.hasMany(models.ExamResult, {
            foreignKey: {
                name: 'student_id',
                allowNull: false
            }
        });

        models.Student.hasMany(models.SeminarPresence, {
            foreignKey: {
                name: 'student_id',
                allowNull: false
            }
        });

        models.Student.hasMany(models.LabPresence, {
            foreignKey: {
                name: 'student_id',
                allowNull: false
            }
        });

        models.Student.hasMany(models.SeminarActivity, {
            foreignKey: {
                name: 'student_id',
                allowNull: false
            }
        });

        models.Student.hasMany(models.LabActivity, {
            foreignKey: {
                name: 'student_id',
                allowNull: false
            }
        });

        models.Student.hasMany(models.StudentCourse, {
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
        models.Student.belongsTo(models.Profile, {
            foreignKey: {
                name: 'profile_id',
                allowNull: false,
            }
        });
    };
    return Student;
};