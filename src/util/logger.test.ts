import { PresetVoid } from '@beecode/msh-logger/controller/preset/void'
import { describe, expect, it } from 'vitest'

import { logger, setAppBootLogger } from '#src/util/logger.js'

describe('logger', () => {
	describe('appBootLogger', () => {
		it('should retrieve default logger', () => {
			const defaultLogger = logger()
			expect(defaultLogger instanceof PresetVoid).toBeTruthy()
		})

		it('should allow to change logger', () => {
			const newLogger = new PresetVoid()
			setAppBootLogger(newLogger)
			const currentLogger = logger()
			expect(currentLogger instanceof PresetVoid).toBeTruthy()
		})
	})
})
