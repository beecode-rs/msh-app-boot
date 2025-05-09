import { type Mock, describe, expect, it, vi } from 'vitest'

import { AppFlow } from '#src/app-flow'

class MockAppFlow extends AppFlow {
	constructor(...flow: (FakeFlow | FakeFlow[])[]) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		super(...(flow as any[]))
	}
}

type FakeFlow = {
	create: Mock
	destroy: Mock
	// eslint-disable-next-line @typescript-eslint/naming-convention
	_id: number
}

describe('AppFlow', () => {
	const fakeFlowFactory = (_id: number = Math.random()): FakeFlow => {
		return {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			_id,
			create: vi.fn().mockImplementation(() => Promise.resolve()),
			destroy: vi.fn().mockImplementation(() => Promise.resolve()),
		}
	}

	describe('create', () => {
		it('should call create on flow', async () => {
			const fakeFlowList = [fakeFlowFactory()]
			const appFlow = new MockAppFlow(...fakeFlowList)
			await appFlow.create()
			expect(fakeFlowList[0]?.create).toHaveBeenCalledTimes(1)
		})
		it('should call create on all flows', async () => {
			const flow1 = fakeFlowFactory()
			const flow2 = fakeFlowFactory()
			const flow3 = fakeFlowFactory()
			const flow4 = fakeFlowFactory()
			const fakeFlowList = [flow1, flow2, [flow3, flow4]]
			const appFlow = new MockAppFlow(...fakeFlowList)
			await appFlow.create()
			expect(flow1.create).toHaveBeenCalledTimes(1)
			// TODO find a way to test the order of calls
			// expect(flow1.create).toHaveBeenCalledBefore(flow2.create)
			expect(flow2.create).toHaveBeenCalledTimes(1)
			// expect(flow2.create).toHaveBeenCalledBefore(flow3.create)
			expect(flow3.create).toHaveBeenCalledTimes(1)
			// expect(flow3.create).toHaveBeenCalledBefore(flow4.create)
			expect(flow4.create).toHaveBeenCalledTimes(1)
		})
	})
	describe('destroy', () => {
		it('should call create on flow', async () => {
			const fakeFlowList = [fakeFlowFactory()]
			const appFlow = new MockAppFlow(...fakeFlowList)
			await appFlow.destroy()
			expect(fakeFlowList[0]?.destroy).toHaveBeenCalledTimes(1)
		})
		it('should call destroy on all flows', async () => {
			const flow1 = fakeFlowFactory()
			const flow2 = fakeFlowFactory()
			const flow3 = fakeFlowFactory()
			const flow4 = fakeFlowFactory()
			const fakeFlowList = [flow1, flow2, [flow3, flow4]]
			const appFlow = new MockAppFlow(...fakeFlowList)
			await appFlow.destroy()
			expect(flow3.destroy).toHaveBeenCalledTimes(1)
			// TODO find a way to test the order of calls
			// expect(flow3.destroy).toHaveBeenCalledBefore(flow4.destroy)
			expect(flow4.destroy).toHaveBeenCalledTimes(1)
			// expect(flow3.destroy).toHaveBeenCalledBefore(flow2.destroy)
			expect(flow2.destroy).toHaveBeenCalledTimes(1)
			// expect(flow2.destroy).toHaveBeenCalledBefore(flow1.destroy)
			expect(flow1.destroy).toHaveBeenCalledTimes(1)
		})
	})
})
