const sequelize_fixtures = require('sequelize-fixtures');

module.exports = function(grunt) {
    grunt.initConfig({
        fixtures: {
            import_test_data: {
                src: ['./src/fixtures/*.json'],
                models: function () {
                    return require('./src/models')
                },
            }
        }
    });

    grunt.loadNpmTasks('sequelize-fixtures');
    grunt.registerTask('default', ['fixtures']);
}