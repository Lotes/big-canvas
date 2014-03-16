module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		coffee: {
			main: {
				expand: true,
				cwd: "src/main/coffee",
				src: ["**/*.coffee", "**/*.generated.coffee"],
				dest: "src/main/js",
				ext: ".js"
			},
			test: {
				expand: true,
				cwd: "src/test/coffee",
				src: ["**/*.coffee"],
				dest: "src/test/js",
				ext: ".js"
			}
		},
		browserify: {
			client: {
				files: {
					"public2/big-canvas.js": ["src/main/js/client/main.js"]
				}
			}
		},
		less: {
			main: {
				files: {
					"public2/bigcanvas.css": "public2/bigcanvas.less"
				}
			}
		},
		execute: {
			server: {
				src: ["src/main/js/server/main.js"]
			},
            database: {
                src: ["src/main/js/tools/initdb.js"]
            }
		},
		mochaTest: {
			test: {
				src: ["src/test/js/**/*.js"]
			}
		},
		watch: {
			main: {
				files: "src/main/coffee/**/*.coffee",
				tasks: ["coffee:main", "browserify:client"]
			}
		},
        exec: {
            schema: {
                cmd: "java -jar bin/jsonschemadsl-compiler.jar src/main/coffee/rpc/big-canvas.jsonschema"
            }
        }
	});
	
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-coffee");
	grunt.loadNpmTasks("grunt-execute");
	grunt.loadNpmTasks("grunt-mocha-test");
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask("default", [/*"less:main",*/ "coffee:main", "browserify:client", "execute:server"]);
	grunt.registerTask("test", ["coffee:main", "coffee:test", "mochaTest:test"]);
	grunt.registerTask("watching", ["watch:main"]);
    grunt.registerTask("init", ["coffee:main", "execute:database"]);
    grunt.registerTask("rpc", ["exec:schema"]);
};