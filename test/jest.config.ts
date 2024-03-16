import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
	clearMocks: true,
	maxConcurrency: 1,
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
	},
	preset: 'ts-jest/presets/default-esm',
	setupFilesAfterEnv: ['jest-extended/all'],
	testEnvironment: 'node',
	testMatch: ['<rootDir>/src/**/*.test.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
}

export default jestConfig
