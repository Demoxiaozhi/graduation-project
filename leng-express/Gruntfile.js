/**
 * Created by lzhan on 16/9/26.
 */

module.exports = function (grunt) {
    grunt.initConfig({pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
            },
            dist: {
                src: ['public/javascripts/index.js','public/javascripts/test.js'],//src文件夹下包括子文件夹下的两个文件
                dest: 'public/javascripts/main.js'//合并文件目录
            }
        },
        uglify: {
            options: {banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'},
            build: {
                files: [
                    {
                    src: ['public/javascripts/main.js'],
                // src: 'public/javascripts/<%= pkg.name %>.js',
                // dest: 'public/dist/js/<%= pkg.name %>.<%= pkg.version %>.min.js'
                    dest: 'public/dist/js/main.<%= pkg.version %>.min.js'
                    },
                    {
                    src : 'public/javascripts/dateFormat.js',
                // src: 'public/javascripts/<%= pkg.name %>.js',
                // dest: 'public/dist/js/<%= pkg.name %>.<%= pkg.version %>.min.js'
                    dest : 'public/dist/js/dateFormat.min.js'
                    }
                ]
            }


},
        cssmin: {
            compress: {
                files: {
                    'public/dist/css/<%= pkg.name %>.<%= pkg.version %>.min.css': [
                        "public/stylesheets/*.css"
                    ]
                }
            }
        }
    });
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concat','uglify','cssmin']);};

