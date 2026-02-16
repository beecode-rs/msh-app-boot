import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('#src/util/logger.js')
import { LifeCycleMockImplementation } from '#src/__mocks__/life-cycle-mock-implementation.js'
import { logger } from '#src/util/logger.js'

describe('LifeCycle', () => {
	describe('name', () => {
		it('should set name property', () => {
			const someName = 'someName'
			const lifeCycle = new LifeCycleMockImplementation({ name: someName })

			expect(lifeCycle.name).toEqual(someName)
		})
	})

	describe('create', () => {
		it('should execute create and log start/stop', async () => {
			const lifeCycle = new LifeCycleMockImplementation({ name: 'test-create' })
			lifeCycle.createFn.mockResolvedValue('create returns this')

			const result = await lifeCycle.create()

			expect(result).toEqual('create returns this')
			expect(logger().debug).toHaveBeenCalledTimes(2)
			expect(logger().debug).toHaveBeenNthCalledWith(1, 'test-create Create START')
			expect(logger().debug).toHaveBeenNthCalledWith(2, 'test-create Create END')
			expect(lifeCycle.createFn).toHaveBeenCalledTimes(1)
		})
	})

	describe('destroy', () => {
		it('should execute destroy and log start/stop', async () => {
			const lifeCycle = new LifeCycleMockImplementation({ name: 'test-destroy' })
			lifeCycle.destroyFn.mockResolvedValue('destroy returns this')

			const result = await lifeCycle.destroy()

			expect(result).toEqual('destroy returns this')
			expect(logger().debug).toHaveBeenCalledTimes(2)
			expect(logger().debug).toHaveBeenNthCalledWith(1, 'test-destroy Destroy START')
			expect(logger().debug).toHaveBeenNthCalledWith(2, 'test-destroy Destroy END')
			expect(lifeCycle.destroyFn).toHaveBeenCalledTimes(1)
		})
	})
})
