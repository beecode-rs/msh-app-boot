import path from 'node:path'

import { ContractReporter } from '@beecode/msh-test-contractor/contract-reporter'
import { contractYamlPlugin } from '@beecode/msh-test-contractor/vitest-plugin'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

const srcDir = path.resolve(import.meta.dirname, 'src')

// app-boot's package.json maps `#src` to ./dist for published consumers, but the
// tests run against source (and the package build is intentionally not required
// to run them). A global `#src` alias would hijack test-contractor's own internal
// `#src` imports, so this plugin rewrites `#src` -> src/ ONLY for files imported
// from within app-boot's src, then delegates to Vite's resolver so the `.js`
// import resolves to the `.ts` source.
const appBootSrcImportPlugin = {
	enforce: 'pre' as const,
	name: 'app-boot-src-imports',
	async resolveId(source: string, importer?: string) {
		if (!importer || !importer.startsWith(srcDir) || (source !== '#src' && !source.startsWith('#src/'))) {
			return null
		}

		const resolution = await this.resolve(source.replace(/^#src/, srcDir), importer, { skipSelf: true })
		if (resolution) {
			return resolution.id
		}

		return null
	},
}

export default defineConfig({
	plugins: [contractYamlPlugin(), appBootSrcImportPlugin],
	resolve: { tsconfigPaths: true },
	test: {
		coverage: {
			exclude: ['src/index.ts', 'src/**/__fixtures__/**', ...coverageConfigDefaults.exclude],
		},
		exclude: ['src/**/__fixtures__/**'],
		include: ['src/**/*.contract.yaml'],
		mockReset: true,
		passWithNoTests: true,
		reporters: [new ContractReporter()],
		setupFiles: ['./src/__tests__/index-jest-setup.ts'],
		watch: false,
	},
})
