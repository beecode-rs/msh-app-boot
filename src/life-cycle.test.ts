import { afterEach, describe, expect, it, jest } from '@jest/globals'

jest.unstable_mockModule('#src/util/logger', async () => {
	return import('#src/util/__mocks__/logger')
})
const { logger: loggerMock } = await import('#src/util/logger')
const { LifeCycleMockImplementation } = await import('#src/__mocks__/life-cycle-mock-implementation')

describe('LifeCycle', () => {
	afterEach(() => {
		jest.resetAllMocks()
	})

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
			expect(loggerMock().debug).toHaveBeenCalledTimes(2)
			expect(loggerMock().debug).toHaveBeenNthCalledWith(1, 'test-create Create START')
			expect(loggerMock().debug).toHaveBeenNthCalledWith(2, 'test-create Create END')
			expect(lifeCycle.createFn).toHaveBeenCalledTimes(1)
		})
	})

	describe('destroy', () => {
		it('should execute destroy and log start/stop', async () => {
			const lifeCycle = new LifeCycleMockImplementation({ name: 'test-destroy' })
			lifeCycle.destroyFn.mockResolvedValue('destroy returns this')

			const result = await lifeCycle.destroy()

			expect(result).toEqual('destroy returns this')
			expect(loggerMock().debug).toHaveBeenCalledTimes(2)
			expect(loggerMock().debug).toHaveBeenNthCalledWith(1, 'test-destroy Destroy START')
			expect(loggerMock().debug).toHaveBeenNthCalledWith(2, 'test-destroy Destroy END')
			expect(lifeCycle.destroyFn).toHaveBeenCalledTimes(1)
		})
	})
})
