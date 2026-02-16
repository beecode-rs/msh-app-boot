import { LoggerStrategyVoid } from '@beecode/msh-logger/logger-strategy/void'
import { describe, expect, it } from 'vitest'

import { logger, setAppBootLogger } from '#src/util/logger.js'

describe('logger', () => {
	describe('appBootLogger', () => {
		it('should retrieve default logger', () => {
			const defaultLogger = logger()
			expect(defaultLogger instanceof LoggerStrategyVoid).toBeTruthy()
		})

		it('should allow to change logger', () => {
			const newLogger = new LoggerStrategyVoid()
			setAppBootLogger(newLogger)
			const currentLogger = logger()
			expect(currentLogger instanceof LoggerStrategyVoid).toBeTruthy()
		})
	})
})
