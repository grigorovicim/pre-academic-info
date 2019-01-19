'use strict';
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        year_of_study: DataTypes.INTEGER,
        nr_matricol: DataTypes.INTEGER
    }, {});
    Student.associate = function (models) {
        models.Student.hasMany(models.ExamWrittenResult, {
            foreignKey: {
                name: 'student_id',
                allowNull: false
            }
        });

        models.Student.hasMany(models.ExamPracticalResult, {
            foreignKey: {
                name: 'student_id',
                allowNull: false
            }
        });

        models.Student.hasMany(models.FinalGrade, {
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

        models.Student.hasMany(models.CourseActivity, {
            foreignKey: {
                name: 'student_id',
                allowNull: false
            }
        });

        models.Student.hasMany(models.CoursePresence, {
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
        models.Student.belongsTo(models.YearOfStudy, {
            foreignKey: {
                name: 'year_of_study_id',
                allowNull: false,
            }
        });
        models.Student.belongsTo(models.Semester, {
            foreignKey: {
                name: 'semester_id',
                allowNull: false,
            }
        });
    };
    return Student;
};