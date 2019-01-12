module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'Students',
        'section_id',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Sections',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
        .then(() => {
          return queryInterface.addColumn(
            'Students',
            'group_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Groups',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'Profiles',
            'user_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Users',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        })
        .then(() => {
          return queryInterface.addColumn(
            'Students',
            'profile_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Profiles',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        })
        .then(() => {
          return queryInterface.addColumn(
            'Students',
            'semester_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Semesters',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        })
        .then(() => {
          return queryInterface.addColumn(
            'Students',
            'year_of_study_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Students',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        })
        .then(() => {
            return queryInterface.addColumn(
                'Users',
                'role_id', 
                {
                  type: Sequelize.INTEGER,
                  references: {
                    model: 'Roles',
                    key: 'id',
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL',
                }
            );
        })
        .then(() => {
            return queryInterface.addColumn(
                'Professors',
                'profile_id',
                {
                  type: Sequelize.INTEGER,
                  references: {
                    model: 'Profiles',
                    key: 'id',
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL',
                }
            );
        })
        .then(() => {
            return queryInterface.addColumn(
                'Sections',
                'abbreviation_id', 
                {
                  type: Sequelize.INTEGER,
                  references: {
                    model: 'Abbreviations',
                    key: 'id',
                  },
                  onUpdate: 'CASCADE',
                  onDelete: 'SET NULL',
                }
            );
        })
        .then(() => {
          return queryInterface.addColumn(
            'Courses',
            'academic_programme_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'AcademicProgrammes',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        })
        .then(() => {
          return queryInterface.addColumn(
            'Courses',
            'section_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Sections',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        })
        // .then(() => {
        //   return queryInterface.addColumn(
        //     'Courses',
        //     'owner_id',
        //     {
        //       type: Sequelize.INTEGER,
        //       references: {
        //         model: 'Professors',
        //         key: 'id',
        //       },
        //       onUpdate: 'CASCADE',
        //       onDelete: 'SET NULL',
        //     }
        //   );
        // })
        .then(() => {
          return queryInterface.addColumn(
            'Courses',
            'semester_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Semesters',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        })
        .then(() => {
          return queryInterface.addColumn(
            'ExamResults',
            'student_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Students',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        })
        .then(() => {
          return queryInterface.addColumn(
            'ExamResults',
            'course_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Courses',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'Professors',
            'title_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Titles',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'StudentCourses',
            'student_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Students',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'StudentCourses',
            'course_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Courses',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'ProfessorCourses',
            'course_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Courses',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'ProfessorCourses',
            'professor_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Professors',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'LabPresences',
            'professor_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Professors',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'LabPresences',
            'student_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Students',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'LabPresences',
            'course_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Courses',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'SeminarPresences',
            'professor_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Professors',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'SeminarPresences',
            'student_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Students',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'SeminarPresences',
            'course_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Courses',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'LabActivities',
            'professor_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Professors',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'LabActivities',
            'student_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Students',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'LabActivities',
            'course_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Courses',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'SeminarActivities',
            'professor_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Professors',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'SeminarActivities',
            'student_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Students',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'SeminarActivities',
            'course_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Courses',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'LabTestPercentages',
            'courseconfiguration_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'CourseConfigurations',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'SeminarTestPercentages',
            'courseconfiguration_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'CourseConfigurations',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'CourseTestPercentages',
            'courseconfiguration_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'CourseConfigurations',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        }).then(() => {
          return queryInterface.addColumn(
            'Courses',
            'courseconfiguration_id',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'CourseConfigurations',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        })
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
        'Students',
        'section_id'
      )
        .then(() => {
          return queryInterface.removeColumn(
            'Students',
            'group_id'
          );
        })
        .then(() => {
          return queryInterface.removeColumn(
            'Students',
            'profile_id'
          );
        })
        .then(() => {
            return queryInterface.removeColumn(
                'Users',
                'role_id'
            );
        })
        .then(() => {
            return queryInterface.removeColumn(
                'Professors',
                'profile_id'
            );
        })
        .then(() => {
            return queryInterface.removeColumn(
                'Sections',
                'abbreviation_id'
            );
        })
        .then(() => {
          return queryInterface.removeColumn(
            'Courses',
            'academic_programme_id'
          );
        })
        .then(() => {
          return queryInterface.removeColumn(
            'Courses',
            'section_id'
          );
        })
        // .then(() => {
        //   return queryInterface.removeColumn(
        //     'Courses',
        //     'owner_id'
        //   );
        // })
        .then(() => {
          return queryInterface.removeColumn(
            'Courses',
            'semester_id'
          );
        })
        .then(() => {
          return queryInterface.removeColumn(
            'ExamResults',
            'student_id'
          );
        })
        .then(() => {
          return queryInterface.removeColumn(
            'ExamResults',
            'course_id'
          );
        })
        .then(() => {
          return queryInterface.removeColumn(
            'Professors',
            'title_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'StudentCourses',
            'student_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'StudentCourses',
            'course_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'ProfessorCourses',
            'professor_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'ProfessorCourses',
            'course_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'LabPresences',
            'course_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'LabPresences',
            'professor_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'LabPresences',
            'student_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'SeminarPresences',
            'course_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'SeminarPresences',
            'professor_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'SeminarPresences',
            'student_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'LabActivities',
            'course_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'LabActivities',
            'professor_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'LabActivities',
            'student_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'SeminarActivities',
            'course_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'SeminarActivities',
            'professor_id'
          );
        }).then(() => {
          return queryInterface.removeColumn(
            'SeminarActivities',
            'student_id'
          );
        });
    }
  };