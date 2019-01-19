'use strict';
module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        credits: DataTypes.INTEGER,
        year_of_study: DataTypes.INTEGER,
        is_active: DataTypes.BOOLEAN
    }, {});

    Course.associate = function (models) {
        models.Course.belongsTo(models.Section, {
            foreignKey: {
                name: 'section_id',
                allowNull: false
            }
        });
        models.Course.belongsTo(models.AcademicProgramme, {
            foreignKey: {
                name: 'academic_programme_id',
                allowNull: false
            }
        });
        models.Course.belongsTo(models.YearOfStudy, {
            foreignKey: {
                name: 'year_of_study',
                allowNull: false
            }
        });
        models.Course.belongsTo(models.Semester, {
            foreignKey: {
                name: 'semester_id',
                allowNull: false
            }
        });
        models.Course.hasMany(models.ExamWrittenResult, {
            foreignKey: {
                name: 'course_id',
                allowNull: false,
            }
        });

        models.Course.hasMany(models.ExamPracticalResult, {
            foreignKey: {
                name: 'course_id',
                allowNull: false,
            }
        });

        models.Course.hasMany(models.FinalGrade, {
            foreignKey: {
                name: 'course_id',
                allowNull: false,
            }
        });

        models.Course.hasMany(models.SeminarPresence, {
            foreignKey: {
                name: 'course_id',
                allowNull: false
            }
        });

        models.Course.hasMany(models.LabPresence, {
            foreignKey: {
                name: 'course_id',
                allowNull: false
            }
        });

        models.Course.hasMany(models.SeminarActivity, {
            foreignKey: {
                name: 'course_id',
                allowNull: false
            }
        });

        models.Course.hasMany(models.LabActivity, {
            foreignKey: {
                name: 'course_id',
                allowNull: false
            }
        });

        models.Course.hasMany(models.CourseActivity, {
            foreignKey: {
                name: 'course_id',
                allowNull: false
            }
        });

        models.Course.hasMany(models.CoursePresence, {
            foreignKey: {
                name: 'course_id',
                allowNull: false
            }
        });

        models.Course.hasMany(models.StudentCourse, {
            foreignKey: {
                name: 'course_id',
                allowNull: false
            }
        });

        models.Course.hasMany(models.ProfessorCourse, {
            foreignKey: {
                name: 'course_id',
                allowNull: false
            }
        });
    };
    return Course;

};
  
  
