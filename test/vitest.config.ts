import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: { tsconfigPaths: true },
	test: {
		mockReset: true,
		passWithNoTests: true,
		setupFiles: ['./index-jest-setup.ts'],
		watch: false,
	},
})
