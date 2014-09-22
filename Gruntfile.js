module.exports = function(grunt) {

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-svg-sprite');

  grunt.initConfig({
    svgsprite: {
      svg: {
        src: ['images/svg'],
        dest: '.',
        options: {
          verbose: 3,
          keep: true,
          render: {
            css: false,
            scss: {
              template: 'template/svgSass.scss.mustache',
              dest: 'sass/_sd-svg-sprite.scss'
            }
          }
        }
      }
    },
    svg2png: {
       all: {
         // specify files in array format with multiple src-dest mapping
         files: [
           {
             src: ['svg/**/*.svg', '!svg/**/sprite.svg'],
             dest: 'images/png/'
           }
        ]
      }
    },
    sprite: {
      png: {
        src: 'images/png/**/*.png',
        destImg: 'images/svgSprite.png',
        destCSS: 'sass/_sd-png-sprite.scss',
        algorithm: 'binary-tree',
        cssTemplate: 'template/pngSass.scss.mustache'
      }
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 6
        },
        files: {
          'images/svgSprite.png': 'images/svgSprite.png'
        }
      }
    },
    clean: {
      svg: ['images/png/', 'svg/'],
      build: ['images/svgSprite.png', 'sass/pngSprite.scss']
    }
  });

  grunt.registerTask('svg', ['svgsprite', 'svg2png', 'sprite:png', 'imagemin:png', 'clean:svg']);
  grunt.registerTask('default', 'svg');

};

