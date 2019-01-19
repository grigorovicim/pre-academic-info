const sequelizeFixtures = require('sequelize-fixtures');

module.exports = function(grunt) {
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
                    './src/fixtures/courses.json',
                    './src/fixtures/student_courses.json',
                    './src/fixtures/professor_courses.json',

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