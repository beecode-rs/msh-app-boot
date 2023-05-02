module.exports = {
	maxConcurrency: 1,
	moduleFileExtensions: ['js', 'ts'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
	},
	preset: 'ts-jest',
	roots: ['<rootDir>/src'],
	setupFilesAfterEnv: ['jest-extended/all'],
	testEnvironment: 'node',
	testMatch: ['<rootDir>/src/**/*.test.ts'],
	testPathIgnorePatterns: ['/node_modules/'],
}
