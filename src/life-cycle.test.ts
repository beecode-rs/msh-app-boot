import { afterEach, describe, expect, it, jest } from '@jest/globals'

// import { LifeCycle } from '#src/life-cycle'
import { logger } from '#src/util/logger'

jest.mock('#/util/logger')

export class LifeCycleMockImplementation {
	readonly name: string

	constructor(params: { name: string }) {
		const { name } = params
		this.name = name

		this._createFn = jest.fn<() => Promise<string>>()
		this._destroyFn = jest.fn<() => Promise<string>>()
		this.create = jest.fn<() => Promise<string>>()
		this.destroy = jest.fn<() => Promise<string>>()
	}

	protected _createFn: jest.Mock<() => Promise<string>>
	protected _destroyFn: jest.Mock<() => Promise<string>>

	create: jest.Mock
	destroy: jest.Mock

	get createFn(): jest.Mock<() => Promise<string>> {
		return this._createFn
	}

	get destroyFn(): jest.Mock<() => Promise<string>> {
		return this._destroyFn
	}
}

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
