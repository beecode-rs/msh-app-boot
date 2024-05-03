import { Mock, vi } from 'vitest'

import { LifeCycle } from '#src/life-cycle'

export class LifeCycleMockImplementation<T = any> extends LifeCycle<T> {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(params: { name: string }) {
		super(params)
	}

	protected _createFn = vi.fn()
	protected _destroyFn = vi.fn()

	get createFn(): Mock {
		return this._createFn
	}

	get destroyFn(): Mock {
		return this._destroyFn
	}
}
