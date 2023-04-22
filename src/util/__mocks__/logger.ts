import { LoggerStrategy, LoggerStrategyParams, StringOrObjectType } from '@beecode/msh-logger'

export const _logger: LoggerStrategy = {
	clone: jest.fn<LoggerStrategy, [LoggerStrategyParams]>(),
	debug: jest.fn<void, StringOrObjectType[]>(),
	error: jest.fn<void, StringOrObjectType[]>(),
	info: jest.fn<void, StringOrObjectType[]>(),
	warn: jest.fn<void, StringOrObjectType[]>(),
}

export const logger = (): LoggerStrategy => {
	return _logger
}
