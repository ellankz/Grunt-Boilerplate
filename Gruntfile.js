module.exports = function(grunt) {

  // 1. Вся настройка находится здесь
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: { // Task
      dist: { // Target
        options: { // Target options
          sassDir: 'public/css/sass',
          cssDir: 'public/css',
          environment: 'production'
        }
      },
    },
    sass: { // Task
      dist: { // Target
        options: { // Target options
          style: 'compressed',
          compass: false,
        },
        files: { // Dictionary of files
          'public/css/style.css': 'public/css/sass/style.scss' // 'destination': 'source'
        }
      }
    },
    uglify: {
      build: {
        src: 'public/js/script.js',
        dest: 'public/js/script.min.js'
      },
      options: {
        sourceMap: false
      }
    },
    liquid: {
      options: {
        includes: 'templates/inc',
      },
      pages: {
        files: [{
          expand: true,
          flatten: true,
          src: 'templates/*.liquid',
          dest: 'html/',
          ext: '.html'
        }]
      }
    },
    watch: {
      sass: {
        // We watch and compile sass files as normal but don't live reload here
        files: ['public/css/sass/*.scss'],
        tasks: ['sass'],
      },
      liquid: {
        files: ['templates/*.liquid', 'templates/inc/*.liquid'],
        tasks: ['liquid'],
      },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        options: {
          livereload: true
        },
        files: ['public/css/*.css', 'html/*.html'],
      },



    },
  });

  // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-liquid');

  // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
  grunt.registerTask('default', ['sass', 'uglify', 'liquid', 'compass', 'watch']);

};