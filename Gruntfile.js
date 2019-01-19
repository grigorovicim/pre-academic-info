const sequelizeFixtures = require('sequelize-fixtures');

module.exports = function (grunt) {
    grunt.initConfig({
        fixtures: {
            import_test_data: {
                src: [
                    './src/fixtures/groups.json',
                    './src/fixtures/year_of_studies.json',
                    './src/fixtures/semesters.json',
                    './src/fixtures/abbreviations.json',
                    './src/fixtures/sections.json',
                    './src/fixtures/roles.json',
                    './src/fixtures/users.json',
                    './src/fixtures/profiles.json',
                    './src/fixtures/titles.json',
                    './src/fixtures/professors.json',
                    './src/fixtures/students.json',
                    './src/fixtures/academic_programmes.json',
                    './src/fixtures/course_configurations.json',
                    './src/fixtures/coursetestpercentages.json',
                    './src/fixtures/labtestpercentages.json',
                    './src/fixtures/courses.json',
                    './src/fixtures/student_courses.json',
                    './src/fixtures/professor_courses.json',
                    './src/fixtures/lab_activities.json',
                    './src/fixtures/lab_presences.json',
                    './src/fixtures/seminar_activities.json',
                    './src/fixtures/seminar_presences.json',
                    './src/fixtures/exam_practical_results.json',
                    './src/fixtures/exam_written_results.json',
                    './src/fixtures/final_grades.json',

                ],
                models: function () {
                    return require('./src/models')
                },
            }
        }
    });

    grunt.loadNpmTasks('sequelize-fixtures');
    grunt.registerTask('default', ['fixtures']);
}