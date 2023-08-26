import { LoggerStrategyVoid } from '@beecode/msh-logger/dist/logger-strategy/void'
import { logger, setAppBootLogger } from 'src/util/logger'

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
