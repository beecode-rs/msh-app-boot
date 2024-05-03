import { vi } from 'vitest'

import { FlowList } from '#src/app-flow'

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
