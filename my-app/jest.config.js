module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!src/serviceWorker.js'
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ]
}