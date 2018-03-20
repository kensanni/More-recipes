module.exports = {
  rootDir: 'client',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/../coverage/client',
  collectCoverageFrom: ['**/*.{js,jsx}'],
  globals: {
    localStorage: {
      getItem: function() {},
      setItem: function() {}
    }
  },
  transformIgnorePatterns: [
    'node_modules/?!(mini-toastr)'
  ]
};
