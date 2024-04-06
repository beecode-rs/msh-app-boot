import { jest } from '@jest/globals'

import { FlowList } from '#src/app-flow'

export class AppFlow {
	protected readonly _flowList: FlowList

	get flowList(): FlowList {
		return this._flowList
	}

	protected constructor(...args: FlowList) {
		this._flowList = [...args]
	}

	create = jest.fn()
	destroy = jest.fn()
}
