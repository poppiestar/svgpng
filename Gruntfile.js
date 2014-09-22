module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    svgmin: {
      all: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.svg'],
          dest: 'images/svgtmp/'
        }]
      }
    },
    svg2png: {
       all: {
         // specify files in array format with multiple src-dest mapping
         files: [
           {
             cwd: 'images/',
             src: ['svgtmp/**/*.svg'],
             dest: 'images/png/'
           }
        ]
      }
    },
    sprite: {
      svg: {
        src: 'images/png/**/*.png',
        destImg: 'images/svgSprite.png',
        destCSS: 'sass/pngSprite.scss',
        algorithm: 'binary-tree',
        cssTemplate: 'template/pngSass.scss.mustache'
      }
    },
    imagemin: {
      svg: {
        options: {
          optimizationLevel: 6
        },
        files: {
          'images/svgSprite.png': 'images/svgSprite.png'
        }
      }
    },
    clean: {
      svg: ['images/png/', 'images/svgtmp/'],
      build: ['images/svgSprite.png', 'sass/pngSprite.scss']
    }
  });

  grunt.registerTask('tidy', ['clean:svg', 'clean:build']);
  grunt.registerTask('svg', ['svgmin', 'svg2png', 'sprite:svg', 'imagemin:svg', 'clean:svg']);
  grunt.registerTask('default', 'svg');

};

