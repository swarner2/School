module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
				
			},
			all: {
				files: ['**.*', '*.*','**/*.*',],
				tasks: ['run'],
				options: {
					
				}
			}
		},
		express: {
			options: {

			},
			dev: {
				options: {
					script: './index.js'
				}
			}
		},
		env : {
			dev : {
				dev : 'true'
			}
		}
	});

	grunt.registerTask('default',['build']);
	grunt.registerTask('run', ['env', 'express:dev'])
	grunt.registerTask('build', ['run', 'watch:all'])

	require('load-grunt-tasks')(grunt);
}