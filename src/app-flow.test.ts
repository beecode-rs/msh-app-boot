import { afterEach, describe, expect, it, vi } from 'vitest'

import { AppFlowMockImplementation } from '#src/__mocks__/app-flow-mock-implementation'
import { type LifeCycleMockImplementation } from '#src/__mocks__/life-cycle-mock-implementation'
import { AppFlow, FlowDirectionMapper } from '#src/app-flow'
import { logger } from '#src/util/logger'

vi.mock('#src/util/logger')

describe('AppFlow', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('create', () => {
		it('should call _deepExecFlowList', async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
			const flow: any[] | LifeCycleMockImplementation = []
			const appFlow = new AppFlowMockImplementation(...flow)
			const spy_deepExecFlowList = vi.spyOn(AppFlow, 'DeepExecFlowList').mockImplementation(() => Promise.resolve())

			await appFlow.create()
			expect(spy_deepExecFlowList).toHaveBeenCalledTimes(1)
			expect(spy_deepExecFlowList).toHaveBeenCalledWith({ direction: FlowDirectionMapper.CREATE, flowList: flow })
		})
	})

	describe('destroy', () => {
		it('should call _deepExecFlowList and _topLevelReversedFlowList', async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
			const flow: any[] | LifeCycleMockImplementation = []
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
			const reversFlow: any[] | LifeCycleMockImplementation = []
			const appFlow = new AppFlowMockImplementation(...flow)
			const spy_deepExecFlowList = vi.spyOn(AppFlow, 'DeepExecFlowList').mockImplementation(() => Promise.resolve())
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const spy_topLevelReversedFlowList = vi.spyOn(appFlow as any, '_topLevelReversedFlowList').mockReturnValue(reversFlow)

			await appFlow.destroy()
			expect(spy_deepExecFlowList).toHaveBeenCalledTimes(1)
			expect(spy_deepExecFlowList).toHaveBeenCalledWith({ direction: FlowDirectionMapper.DESTROY, flowList: reversFlow })
			expect(spy_topLevelReversedFlowList).toHaveBeenCalledTimes(1)
		})
	})

	describe('_topLevelReversedFlowList', () => {
		it('should call reverse on flowList', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const fake_flow = { reverse: vi.fn().mockImplementation(() => undefined) } as any

			const appFlow = new AppFlowMockImplementation()

			// @ts-expect-error test
			appFlow['_flowList'] = fake_flow

			appFlow['_topLevelReversedFlowList']()
			expect(fake_flow.reverse).toHaveBeenCalledTimes(1)
		})
	})

	describe('ExecSyncFlowList', () => {
		it('should call destroy fn for every lifeCycle entity ', async () => {
			const fakeLifeCycle1 = { destroy: vi.fn() }
			const fakeLifeCycle2 = { destroy: vi.fn() }
			const fakeLifeCycle3 = { destroy: vi.fn() }
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const lifeCycleArray = [fakeLifeCycle1, fakeLifeCycle2, fakeLifeCycle3] as any[]
			await AppFlow.ExecSyncFlowList(lifeCycleArray, FlowDirectionMapper.DESTROY)
			expect(fakeLifeCycle1.destroy).toHaveBeenCalledTimes(1)
			expect(fakeLifeCycle2.destroy).toHaveBeenCalledTimes(1)
			expect(fakeLifeCycle3.destroy).toHaveBeenCalledTimes(1)
		})
	})

	describe('DeepExecFlowList', () => {
		it('should not call ExecSyncFlowList if flow empty', async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const flow = [] as any[]
			const spy_execSyncFlowList = vi.spyOn(AppFlow, 'ExecSyncFlowList').mockImplementation(() => Promise.resolve())

			await AppFlow.DeepExecFlowList({ direction: FlowDirectionMapper.DESTROY, flowList: flow })

			expect(spy_execSyncFlowList).not.toHaveBeenCalled()
		})

		it('should not call ExecSyncFlowList if flow has no arrays', async () => {
			const fakeLifeCycle1 = { destroy: vi.fn() }
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const flow = [fakeLifeCycle1] as any[]
			const spy_execSyncFlowList = vi.spyOn(AppFlow, 'ExecSyncFlowList').mockImplementation(() => Promise.resolve())

			await AppFlow.DeepExecFlowList({ direction: FlowDirectionMapper.DESTROY, flowList: flow })

			expect(spy_execSyncFlowList).not.toHaveBeenCalled()
			expect(fakeLifeCycle1.destroy).toHaveBeenCalledTimes(1)
		})

		it('should call _execSyncFlowList if flow has arrays', async () => {
			const fakeLifeCycle1 = { destroy: vi.fn() }
			const fakeLifeCycle2 = { destroy: vi.fn() }

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const flow = [[fakeLifeCycle1, fakeLifeCycle2]] as any[]

			const spy_execSyncFlowList = vi.spyOn(AppFlow, 'ExecSyncFlowList').mockImplementation(() => Promise.resolve())
			await AppFlow.DeepExecFlowList({ direction: FlowDirectionMapper.DESTROY, flowList: flow })

			expect(spy_execSyncFlowList).toHaveBeenCalledTimes(1)
		})

		it('should log end throw error if lifeCycle fails', async () => {
			const lifeCycleError = new Error('boom')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const fakeLifeCycle1 = { destroy: vi.fn<any>().mockRejectedValue(lifeCycleError) }
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const flow = [fakeLifeCycle1] as any[]
			const spy_execSyncFlowList = vi.spyOn(AppFlow, 'ExecSyncFlowList').mockImplementation(() => Promise.resolve())

			try {
				await AppFlow.DeepExecFlowList({ direction: FlowDirectionMapper.DESTROY, flowList: flow })
				throw new Error('failed')
			} catch (err) {
				expect(logger().error).toHaveBeenCalledTimes(1)
				expect(logger().error).toHaveBeenCalledWith(lifeCycleError)
				expect(spy_execSyncFlowList).not.toHaveBeenCalled()
				expect(fakeLifeCycle1.destroy).toHaveBeenCalledTimes(1)
			}
		})
	})
})
