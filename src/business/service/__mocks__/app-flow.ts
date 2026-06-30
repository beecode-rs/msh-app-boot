import { vi } from 'vitest'

import { type FlowList } from '#src/business/service/app-flow.js'

export class AppFlow {
	protected readonly _flowList: FlowList

	get flowList(): FlowList {
		return this._flowList
	}

	protected constructor(...args: FlowList) {
		this._flowList = [...args]
	}

	create = vi.fn()
	destroy = vi.fn()
}
