'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CourseConfigurations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      rules: {
        type: Sequelize.STRING
      },
      hasLecture: {
        type: Sequelize.BOOLEAN
      },
      hasLab: {
        type: Sequelize.BOOLEAN
      },
      hasSeminar: {
        type: Sequelize.BOOLEAN
      },
      numberOfLectures: {
        type: Sequelize.INTEGER
      },
      numberOfLabs: {
        type: Sequelize.INTEGER
      },
      numberOfSeminars: {
        type: Sequelize.INTEGER
      },
      lectureGradePercentage: {
        type: Sequelize.INTEGER
      },
      labGradePercentage: {
        type: Sequelize.INTEGER
      },
      seminarGradePercentage: {
        type: Sequelize.INTEGER
      },
      numberOfLectureTests: {
        type: Sequelize.INTEGER
      },
      numberOfLabTests: {
        type: Sequelize.INTEGER
      },
      numberOfSeminarTests: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CourseConfigurations');
  }
};