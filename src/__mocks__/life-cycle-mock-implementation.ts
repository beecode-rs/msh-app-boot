import { jest } from '@jest/globals'

import { LifeCycle } from '#src/life-cycle'

export class LifeCycleMockImplementation<T = any> extends LifeCycle<T> {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(params: { name: string }) {
		super(params)
	}

	protected _createFn = jest.fn<() => Promise<T>>()
	protected _destroyFn = jest.fn<() => Promise<T>>()

	get createFn(): jest.Mock<() => Promise<T>> {
		return this._createFn
	}

	get destroyFn(): jest.Mock<() => Promise<T>> {
		return this._destroyFn
	}
}
