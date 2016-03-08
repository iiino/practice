/**
 * ** 開始手順
 *
 * $ npm install
 * $ grunt sprite
 * $ grunt
 *
 * ** watchコマンド
 *
 * $ grunt watch
 *
 * ** testコマンド
 *
 * $ grunt test
 *
 * ---------------------------------------------------------------------- */

module.exports = function (grunt) {

	// manage
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		// sprite
		sprite: 'grunt-spritesmith'
	});


	// process
	grunt.initConfig({

		path: {
			src        : 'src/',
			dist       : 'dist/',
			tmp        : 'tmp/',
			html_src   : 'src/hbs/',
			css_src    : 'src/css/',
			scss_src   : 'src/scss/',
			img_src    : 'src/img/',
			js_src     : 'src/js/',
			sprite_src : 'src/img/sprite/'
		},

		pkg: grunt.file.readJSON('package.json'),

		// clean: '<%= path.tmp %>',

		sass: {
			doc: {
				options: {
					style     : 'expanded',
					sourcemap : 'none',
					noCache   : true
				},
				files: {
					'<%= path.dist %>css/doc.css' : '<%= path.scss_src %>doc.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 3 version', 'ie 7', 'ios 4', 'android 2.3']
			},
			file: {
				src  : '<%= path.dist %>css/doc.css',
				dest : '<%= path.dist %>css/doc.css'
			}
		},

		csscomb: {
			app: {
				files: {
					'<%= path.dist %>css/doc.css' : '<%= path.dist %>css/doc.css'
				}
			}
		},

		csso: {
			app: {
				options: {
					restructure: false
				},
				files: {
					'<%= path.dist %>css/doc.min.css' : '<%= path.dist %>css/doc.css'
				}
			}
		},

		copy: {
			image: {
				files: [
					{
						expand : true,
						cwd    : '<%= path.img_src %>',
						src    : ['*.jpg','*.png','*.gif','*.svg'],
						dest   : '<%= path.dist %>img/'
					}
				]
			},
			css: {
				files: [
					{
						expand : true,
						cwd    : '<%= path.css_src %>',
						src    : ['*.css'],
						dest   : '<%= path.dist %>css/'
					}
				]
			},
			js: {
				files: [
					{
						expand : true,
						cwd    : '<%= path.js_src %>',
						src    : ['*.js'],
						dest   : '<%= path.dist %>js'
					}
				]
			}
		},

		uglify: {
			options: {
				compress: {
					drop_console: false
				}
			},
			compressed: {
				files: {
					'<%= path.dist %>js/basic.min.js'         : '<%= path.js_src %>basic.js',
					'<%= path.dist %>js/jquery-1.11.1.min.js' : '<%= path.js_src %>jquery-1.11.1.js',
					'<%= path.dist %>js/jquery.mobile-1.4.5.min.js' : '<%= path.js_src %>jquery.mobile-1.4.5.js'
				}
			}
		},

		assemble: {
			options: {
				data      : '<%= path.html_src %>data/*.json',
				layoutdir : '<%= path.html_src %>layout/',
				partials  : [
					'<%= path.html_src %>include/common/*.hbs',
					'<%= path.html_src %>include/default/*.hbs',
					'<%= path.html_src %>include/search_change/*.hbs',
					'<%= path.html_src %>include/search_result/*.hbs'
				],
				pkg     : '<%= pkg %>',
				assets  : '',
				helpers : [
					'handlebars-helpers',
					'handlebars-helper-minify'
				]
			},
			files: {
				expand : true,
				cwd    : '<%= path.html_src %>html/',
				src    : '**/*.hbs',
				dest   : '<%= path.dist %>'
			}
		},

		watch: {
			css: {
				files : ['**/*.scss'],
				tasks : ['build:css']
			},
			js: {
				files : ['**/*.js'],
				tasks : ['build:js']
			},
			html: {
				files : ['**/*.hbs'],
				tasks : ['build:html']
			},
			options: {
				livereload: true
			}
		},

		jshint: {
			all: ['Gruntfile.js', '<%= path.js_src %>*.js']
		},
	});


	grunt.registerTask('build:html' , ['assemble', 'copy:image']);
	grunt.registerTask('build:css'  , ['copy:css', 'sass', 'autoprefixer', 'csscomb', 'csso']);
	grunt.registerTask('build:js'   , ['copy:js', 'uglify']);
	grunt.registerTask('build'      , ['build:html', 'build:css', 'build:js']);
	grunt.registerTask('default', 'build');
};
