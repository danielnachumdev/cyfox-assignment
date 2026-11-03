module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],
  setupFiles: ['<rootDir>/src/test/env.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/test/**/*.ts',
    '!src/database/migrate.ts',
    '!src/database/seed.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testTimeout: 30000,
  // Shared Docker Postgres; parallel workers race on migrate/reset.
  maxWorkers: 1,
  // pg Pool + process signal handlers keep the event loop alive after suites finish.
  forceExit: true,
  verbose: true,
};