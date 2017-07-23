module.exports = function (wallaby) {
  return {
    files: [
      'src/js/**/*.js',
      '!src/js/app.js'
    ],

    tests: [
      'tests/spec/**/*test.js'
    ],

    env: {
      type: 'node'
    },

    testFramework: 'mocha',

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    }
  };
};