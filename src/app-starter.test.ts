import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { AppFlowMockImplementation } from '#src/__mocks__/app-flow-mock-implementation'
import { AppStarterSpy } from '#src/__mocks__/app-starter-spy'
import { AppFlow } from '#src/app-flow'
import { AppStarterStatusMapper } from '#src/app-starter'
import { logger } from '#src/util/logger'

vi.mock('#src/util/logger')
vi.mock('#src/app-flow')

describe('AppStarter', () => {
	let appFlowMock: AppFlow
	let appStarter: AppStarterSpy

	beforeEach(() => {
		appFlowMock = new AppFlowMockImplementation()
		appStarter = new AppStarterSpy(appFlowMock)
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})
	describe('constructor', () => {
		it('should set appFlow and check for defaults', () => {
			expect(appStarter.getFlow).toEqual(appFlowMock)
			expect(appStarter.getStatus).toEqual(AppStarterStatusMapper.STOPPED)
		})
	})

	describe('start', () => {
		beforeEach(() => {
			appStarter.registerOnExitSpy = vi.fn()
			appStarter.onErrorSpy = vi.fn()
		})

		it('should log end return if status is STARTED', async () => {
			appStarter.setStatus = AppStarterStatusMapper.STARTED
			await appStarter.start()
			expect(logger().warn).toHaveBeenCalledTimes(1)
			expect(logger().warn).toHaveBeenCalledWith('App already started')
		})

		it('should set status to STARTED and call created and if no error call _registerOnExit', async () => {
			;(appFlowMock.create as Mock).mockResolvedValue(undefined)
			expect(appStarter.getStatus).toEqual(AppStarterStatusMapper.STOPPED)

			await appStarter.start()

			expect(appStarter.getStatus).toEqual(AppStarterStatusMapper.STARTED)
			expect(appFlowMock.create).toHaveBeenCalledTimes(1)
			expect(appStarter.registerOnExitSpy).toHaveBeenCalledTimes(1)
			expect(appStarter.onErrorSpy).not.toHaveBeenCalled()
		})

		it('should call created and if on error call _onError', async () => {
			const error = new Error('boom')
			;(appFlowMock.create as Mock).mockRejectedValue(error)
			;(appStarter.onErrorSpy as Mock).mockResolvedValue(undefined)
			await appStarter.start()

			expect(appStarter.registerOnExitSpy).not.toHaveBeenCalled()
			expect(appStarter.onErrorSpy).toHaveBeenCalledTimes(1)
			expect(appStarter.onErrorSpy).toHaveBeenCalledWith(error)
			expect(error.message).toEqual('boom')
		})

		it('should throw error if _onError fails', async () => {
			const error = new Error('boom')
			const onErrorError = new Error('boom2')
			;(appFlowMock.create as any as Mock).mockRejectedValue(error)
			;(appStarter.onErrorSpy as any as Mock).mockRejectedValue(onErrorError)

			try {
				await appStarter.start()
				throw new Error('test failed')
			} catch (err) {
				expect(appStarter.registerOnExitSpy).not.toHaveBeenCalled()
				expect(appStarter.onErrorSpy).toHaveBeenCalledTimes(1)
				expect(appStarter.onErrorSpy).toHaveBeenCalledWith(error)
				expect(err).toEqual(onErrorError)
			}
		})
	})

	describe('stop', () => {
		it('should log end return if status is STOPPED', async () => {
			expect(appStarter.getStatus).toEqual(AppStarterStatusMapper.STOPPED)

			await appStarter.stop()
			expect(logger().warn).toHaveBeenCalledTimes(1)
			expect(logger().warn).toHaveBeenCalledWith('App already stopped')
		})

		it('should set status to STOPPED and call created and if no error call _registerOnExit', async () => {
			;(appFlowMock.destroy as any as Mock).mockResolvedValue(undefined)
			appStarter.setStatus = AppStarterStatusMapper.STARTED

			await appStarter.stop()

			expect(appFlowMock.destroy).toHaveBeenCalledTimes(1)
			expect(appStarter.getStatus).toEqual(AppStarterStatusMapper.STOPPED)
		})
	})

	describe('_onError', () => {
		let spy_process_exit: Mock
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			spy_process_exit = vi.spyOn(process, 'exit').mockImplementation(() => {}) // eslint-disable-line
		})

		it('should log error message, call stop and end process', async () => {
			appStarter.stop = vi.fn().mockResolvedValue(undefined)
			const error = new Error('boom')
			await appStarter.onErrorSpy(error)
			expect(logger().error).toHaveBeenCalledTimes(1)
			expect(logger().error).toHaveBeenCalledWith('boom')
			expect(appStarter.stop).toHaveBeenCalledTimes(1)
			expect(spy_process_exit).toHaveBeenCalledTimes(1)
			expect(spy_process_exit).toHaveBeenCalledWith(1)
		})
		it('should log error message, call stop and fail', async () => {
			const stopError = new Error('stopBoom')
			appStarter.stop = vi.fn().mockRejectedValue(stopError)
			try {
				const error = new Error('boom')
				await appStarter.onErrorSpy(error)
			} catch (e) {
				expect(logger().error).toHaveBeenCalledTimes(1)
				expect(logger().error).toHaveBeenCalledWith('boom')
				expect(appStarter.stop).toHaveBeenCalledTimes(1)
				expect(spy_process_exit).not.toHaveBeenCalled()
				expect(e).toEqual(stopError)
			}
		})
	})

	describe('_gracefulStop', () => {
		let spy_process_exit: Mock
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			spy_process_exit = vi.spyOn(process, 'exit').mockImplementation(() => {}) // eslint-disable-line
		})
		it('should call stop and exit', async () => {
			appStarter.stop = vi.fn().mockResolvedValue(undefined)
			await appStarter.gracefulStopSpy()

			expect(appStarter.stop).toHaveBeenCalledTimes(1)
			expect(spy_process_exit).toHaveBeenCalledTimes(1)
			expect(spy_process_exit).toHaveBeenCalledWith(0)
		})
		it('should call stop and fail', async () => {
			const stopError = new Error('stopBoom')
			appStarter.stop = vi.fn().mockRejectedValue(stopError)
			try {
				await appStarter.gracefulStopSpy()
			} catch (e) {
				expect(appStarter.stop).toHaveBeenCalledTimes(1)
				expect(spy_process_exit).not.toHaveBeenCalled()
				expect(e).toEqual(stopError)
			}
		})
	})

	describe('_registerOnExit', () => {
		let spy_process_on: Mock
		const processOnSlots: Record<string, () => Promise<void>> = {}
		beforeEach(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			spy_process_on = vi.spyOn(process, 'on').mockImplementation((slot: string, fn: () => Promise<void>) => {
				processOnSlots[slot] = fn
			})
		})
		it('should register two signals', () => {
			appStarter.registerOnExitSpy()
			expect(spy_process_on).toHaveBeenCalledTimes(2)
			expect(spy_process_on).toHaveBeenNthCalledWith(1, 'SIGTERM', expect.anything())
			expect(spy_process_on).toHaveBeenNthCalledWith(2, 'SIGINT', expect.anything())
		})
		it('should call graceful stop for signal SIGTERM', async () => {
			appStarter.registerOnExitSpy()
			appStarter.gracefulStopSpy = vi.fn().mockResolvedValue(undefined)
			await (processOnSlots['SIGTERM'] ?? ((): void => {}))()
			expect(appStarter.gracefulStopSpy).toHaveBeenCalledTimes(1)
		})
		it('should call graceful stop for signal SIGINT', async () => {
			appStarter.registerOnExitSpy()
			appStarter.gracefulStopSpy = vi.fn().mockResolvedValue(undefined)
			await (processOnSlots['SIGINT'] ?? ((): void => {}))()
			expect(appStarter.gracefulStopSpy).toHaveBeenCalledTimes(1)
		})
		// TODO fix this tests
		// it('should log error if graceful fails for signal SIGTERM', async () => {
		// 	const error = new Error('boom')
		// 	appStarter.registerOnExitSpy()
		// 	appStarter.gracefulStopSpy.mockRejectedValue(error)
		// 	await (processOnSlots['SIGTERM'] ?? ((): void => {}))()
		// 	expect(appStarter.gracefulStopSpy).toHaveBeenCalledTimes(1)
		// 	expect(logger().error).toHaveBeenCalledTimes(1)
		// 	expect(logger().error).toHaveBeenCalledWith(error)
		// })
		// it('should log error if graceful fails for signal SIGINT', async () => {
		// 	const error = new Error('boom')
		// 	appStarter.registerOnExitSpy()
		// 	appStarter.gracefulStopSpy = vi.fn().mockRejectedValue(error)
		// 	await (processOnSlots['SIGINT'] ?? ((): void => {}))()
		// 	expect(appStarter.gracefulStopSpy).toHaveBeenCalledTimes(1)
		// 	expect(logger().error).toHaveBeenCalledTimes(1)
		// 	expect(logger().error).toHaveBeenCalledWith(error)
		// })
	})
})
