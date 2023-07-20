import { LoggerStrategy, LoggerStrategyParams, StringOrObjectType } from '@beecode/msh-logger'
import { jest } from '@jest/globals'

export const _logger: LoggerStrategy = {
	clone: jest.fn<(params: LoggerStrategyParams) => LoggerStrategy>(),
	debug: jest.fn<(params: StringOrObjectType[]) => void>(),
	error: jest.fn<(params: StringOrObjectType[]) => void>(),
	info: jest.fn<(params: StringOrObjectType[]) => void>(),
	warn: jest.fn<(params: StringOrObjectType[]) => void>(),
}

export const logger = (): LoggerStrategy => {
	return _logger
}
