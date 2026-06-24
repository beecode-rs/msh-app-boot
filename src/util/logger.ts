import { type LoggerStrategy } from '@beecode/msh-logger'
import { PresetVoid } from '@beecode/msh-logger/controller/preset/void'

const _cache = {
	logger: new PresetVoid(),
}

export const setAppBootLogger = (logger: LoggerStrategy): void => {
	_cache.logger = logger
}

export const logger = (): LoggerStrategy => {
	return _cache.logger
}
