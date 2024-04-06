import { LoggerStrategy, LoggerStrategyParams } from '@beecode/msh-logger'
import { jest } from '@jest/globals'

const _cache = {
	logger: {
		clone: jest.fn<(params: LoggerStrategyParams) => LoggerStrategy>(),
		debug: jest.fn<(params: unknown[]) => void>(),
		error: jest.fn<(params: unknown[]) => void>(),
		info: jest.fn<(params: unknown[]) => void>(),
		warn: jest.fn<(params: unknown[]) => void>(),
	},
}

export const setAppBootLogger = jest.fn<(logger: LoggerStrategy) => void>()

export const logger = (): LoggerStrategy => {
	return _cache.logger
}
