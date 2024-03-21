import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

import { AppFlow } from '#src/app-flow'
import { AppStarter, AppStarterStatusMapper } from '#src/app-starter'

jest.unstable_mockModule('#src/util/logger', async () => {
	return import('#src/util/__mocks__/logger')
})
const { logger: loggerMock } = await import('#src/util/logger')

jest.unstable_mockModule('#src/app-flow', async () => {
	return import('#src/__mocks__/app-flow')
})
const { AppFlow: AppFlowMock } = await import('#src/app-flow')

class AppFlowMockImplementation extends AppFlowMock {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor() {
		super()
	}
}

describe('AppStarter', () => {
	let appFlowMock: AppFlow
	let appStarter: AppStarter

	beforeEach(() => {
		appFlowMock = new AppFlowMockImplementation()
		appStarter = new AppStarter(appFlowMock)
	})

	afterEach(() => {
		jest.restoreAllMocks()
		jest.resetAllMocks()
	})
	describe('constructor', () => {
		it('should set appFlow and check for defaults', () => {
			expect(appStarter['_flow']).toEqual(appFlowMock)
			expect(appStarter['_status']).toEqual(AppStarterStatusMapper.STOPPED)
		})
	})

	describe('start', () => {
		beforeEach(() => {
			appStarter['_registerOnExit'] = jest.fn()
			appStarter['_onError'] = jest.fn<any>()
		})

		it('should log end return if status is STARTED', async () => {
			appStarter['_status'] = AppStarterStatusMapper.STARTED
			await appStarter.start()
			expect(loggerMock().warn).toHaveBeenCalledTimes(1)
			expect(loggerMock().warn).toHaveBeenCalledWith('App already started')
		})

		it('should set status to STARTED and call created and if no error call _registerOnExit', async () => {
			;(appFlowMock.create as jest.Mock<any>).mockResolvedValue(undefined)
			expect(appStarter['_status']).toEqual(AppStarterStatusMapper.STOPPED)

			await appStarter.start()

			expect(appStarter['_status']).toEqual(AppStarterStatusMapper.STARTED)
			expect(appFlowMock.create).toHaveBeenCalledTimes(1)
			expect(appStarter['_registerOnExit']).toHaveBeenCalledTimes(1)
			expect(appStarter['_onError']).not.toHaveBeenCalled()
		})

		it('should call created and if on error call _onError', async () => {
			const error = new Error('boom')
			;(appFlowMock.create as jest.Mock<any>).mockRejectedValue(error)
			;(appStarter['_onError'] as jest.Mock<any>).mockResolvedValue(undefined)
			await appStarter.start()

			expect(appStarter['_registerOnExit']).not.toHaveBeenCalled()
			expect(appStarter['_onError']).toHaveBeenCalledTimes(1)
			expect(appStarter['_onError']).toHaveBeenCalledWith(error)
			expect(error.message).toEqual('boom')
		})

		it('should throw error if _onError fails', async () => {
			const error = new Error('boom')
			const onErrorError = new Error('boom2')
			;(appFlowMock.create as jest.Mock<any>).mockRejectedValue(error)
			;(appStarter['_onError'] as jest.Mock<any>).mockRejectedValue(onErrorError)

			try {
				await appStarter.start()
				throw new Error('test failed')
			} catch (err) {
				expect(appStarter['_registerOnExit']).not.toHaveBeenCalled()
				expect(appStarter['_onError']).toHaveBeenCalledTimes(1)
				expect(appStarter['_onError']).toHaveBeenCalledWith(error)
				expect(err).toEqual(onErrorError)
			}
		})
	})

	describe('stop', () => {
		it('should log end return if status is STOPPED', () => {
			expect(appStarter['_status']).toEqual(AppStarterStatusMapper.STOPPED)

			appStarter.stop()
			expect(loggerMock().warn).toHaveBeenCalledTimes(1)
			expect(loggerMock().warn).toHaveBeenCalledWith('App already stopped')
		})

		it('should set status to STOPPED and call created and if no error call _registerOnExit', async () => {
			;(appFlowMock.destroy as jest.Mock<any>).mockResolvedValue(undefined)
			appStarter['_status'] = AppStarterStatusMapper.STARTED

			await appStarter.stop()

			expect(appFlowMock.destroy).toHaveBeenCalledTimes(1)
			expect(appStarter['_status']).toEqual(AppStarterStatusMapper.STOPPED)
		})
	})

	describe('_onError', () => {
		let spy_process_exit: jest.SpiedFunction<any>
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			spy_process_exit = jest.spyOn(process, 'exit').mockImplementation(() => {}) // eslint-disable-line
		})

		it('should log error message, call stop and end process', async () => {
			appStarter.stop = jest.fn<any>().mockResolvedValue(undefined)
			const error = new Error('boom')
			await appStarter['_onError'](error)
			expect(loggerMock().error).toHaveBeenCalledTimes(1)
			expect(loggerMock().error).toHaveBeenCalledWith('boom')
			expect(appStarter.stop).toHaveBeenCalledTimes(1)
			expect(spy_process_exit).toHaveBeenCalledTimes(1)
			expect(spy_process_exit).toHaveBeenCalledWith(1)
		})
		it('should log error message, call stop and fail', async () => {
			const stopError = new Error('stopBoom')
			appStarter.stop = jest.fn<any>().mockRejectedValue(stopError)
			try {
				const error = new Error('boom')
				await appStarter['_onError'](error)
			} catch (e) {
				expect(loggerMock().error).toHaveBeenCalledTimes(1)
				expect(loggerMock().error).toHaveBeenCalledWith('boom')
				expect(appStarter.stop).toHaveBeenCalledTimes(1)
				expect(spy_process_exit).not.toHaveBeenCalled()
				expect(e).toEqual(stopError)
			}
		})
	})

	describe('_gracefulStop', () => {
		let spy_process_exit: jest.SpiedFunction<any>
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			spy_process_exit = jest.spyOn(process, 'exit').mockImplementation(() => {}) // eslint-disable-line
		})
		it('should call stop and exit', async () => {
			appStarter.stop = jest.fn<any>().mockResolvedValue(undefined)
			await appStarter['_gracefulStop']()

			expect(appStarter.stop).toHaveBeenCalledTimes(1)
			expect(spy_process_exit).toHaveBeenCalledTimes(1)
			expect(spy_process_exit).toHaveBeenCalledWith(0)
		})
		it('should call stop and fail', async () => {
			const stopError = new Error('stopBoom')
			appStarter.stop = jest.fn<any>().mockRejectedValue(stopError)
			try {
				await appStarter['_gracefulStop']()
			} catch (e) {
				expect(appStarter.stop).toHaveBeenCalledTimes(1)
				expect(spy_process_exit).not.toHaveBeenCalled()
				expect(e).toEqual(stopError)
			}
		})
	})

	describe('_registerOnExit', () => {
		let spy_process_on: jest.SpiedFunction<any>
		const processOnSlots: Record<string, () => Promise<void>> = {}
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			spy_process_on = jest.spyOn(process, 'on').mockImplementation((slot: string, fn: () => Promise<void>) => {
				processOnSlots[slot] = fn
			})
		})
		it('should register two signals', () => {
			appStarter['_registerOnExit']()
			expect(spy_process_on).toHaveBeenCalledTimes(2)
			expect(spy_process_on).toHaveBeenNthCalledWith(1, 'SIGTERM', expect.anything())
			expect(spy_process_on).toHaveBeenNthCalledWith(2, 'SIGINT', expect.anything())
		})
		it('should call graceful stop for signal SIGTERM', async () => {
			appStarter['_registerOnExit']()
			appStarter['_gracefulStop'] = jest.fn<any>().mockResolvedValue(undefined)
			await (processOnSlots['SIGTERM'] ?? ((): void => {}))()
			expect(appStarter['_gracefulStop']).toHaveBeenCalledTimes(1)
		})
		it('should call graceful stop for signal SIGINT', async () => {
			appStarter['_registerOnExit']()
			appStarter['_gracefulStop'] = jest.fn<any>().mockResolvedValue(undefined)
			await (processOnSlots['SIGINT'] ?? ((): void => {}))()
			expect(appStarter['_gracefulStop']).toHaveBeenCalledTimes(1)
		})
		it('should log error if graceful fails for signal SIGTERM', async () => {
			const error = new Error('boom')
			appStarter['_registerOnExit']()
			appStarter['_gracefulStop'] = jest.fn<any>().mockRejectedValue(error)
			await (processOnSlots['SIGTERM'] ?? ((): void => {}))()
			expect(appStarter['_gracefulStop']).toHaveBeenCalledTimes(1)
			expect(loggerMock().error).toHaveBeenCalledTimes(1)
			expect(loggerMock().error).toHaveBeenCalledWith(error)
		})
		it('should log error if graceful fails for signal SIGINT', async () => {
			const error = new Error('boom')
			appStarter['_registerOnExit']()
			appStarter['_gracefulStop'] = jest.fn<any>().mockRejectedValue(error)
			await (processOnSlots['SIGINT'] ?? ((): void => {}))()
			expect(appStarter['_gracefulStop']).toHaveBeenCalledTimes(1)
			expect(loggerMock().error).toHaveBeenCalledTimes(1)
			expect(loggerMock().error).toHaveBeenCalledWith(error)
		})
	})
})
