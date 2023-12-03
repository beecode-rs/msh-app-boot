import { LoggerStrategy, LoggerStrategyParams } from '@beecode/msh-logger'
import { jest } from '@jest/globals'

export const _logger: LoggerStrategy = {
	clone: jest.fn<(params: LoggerStrategyParams) => LoggerStrategy>(),
	debug: jest.fn<(params: unknown[]) => void>(),
	error: jest.fn<(params: unknown[]) => void>(),
	info: jest.fn<(params: unknown[]) => void>(),
	warn: jest.fn<(params: unknown[]) => void>(),
}

export const logger = (): LoggerStrategy => {
	return _logger
}
