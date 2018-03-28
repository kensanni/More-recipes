module.exports = {
  rootDir: 'client',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/../coverage/client',
  coveragePathIgnorePatterns: [
    '<rootDir>/__tests__',
  ],
  collectCoverageFrom: ['**/*.{js,jsx}'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__tests__/__mocks__/styleMock.js',
  },
  testMatch: [
    '**/?(*.)(test).js?(x)'
  ],
  globals: {
    localStorage: {
      setItem: (() => { }),
      clearItem: (() => { }),
      getItem: (() => { }),
      removeItem: (() => { }),
      clear: (() => {})
    }
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],  
  setupFiles: [
    '<rootDir>/__tests__/config.js',
    '<rootDir>/__tests__/__mocks__/localStorage.js',
  ],
  transformIgnorePatterns: [
    'node_modules/?!(mini-toastr)'
  ]
};
