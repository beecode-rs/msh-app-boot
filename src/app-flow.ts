import { LifeCycle } from '#/life-cycle'
import { logger } from '#/util/logger'

export type FlowList = (LifeCycle | LifeCycle[])[]

export enum FlowDirectionMapper {
	DESTROY = 'destroy',
	CREATE = 'create',
}

export abstract class AppFlow {
	protected readonly _flowList: FlowList

	protected constructor(...args: FlowList) {
		this._flowList = [...args]
	}

	async create(): Promise<void> {
		await AppFlow.DeepExecFlowList({ direction: FlowDirectionMapper.CREATE, flowList: this._flowList })
	}

	async destroy(): Promise<void> {
		await AppFlow.DeepExecFlowList({ direction: FlowDirectionMapper.DESTROY, flowList: this._topLevelReversedFlowList() })
	}

	protected _topLevelReversedFlowList(): FlowList {
		return this._flowList.reverse()
	}

	static async DeepExecFlowList(params: { flowList: FlowList; direction: FlowDirectionMapper }): Promise<void> {
		try {
			const { flowList, direction } = params
			// eslint-disable-next-line no-loops/no-loops
			for (const lifeCycle of flowList) {
				if (Array.isArray(lifeCycle)) {
					await AppFlow.ExecSyncFlowList(lifeCycle, direction)
				} else {
					await lifeCycle[direction]()
				}
			}
		} catch (err) {
			if (err instanceof Error) {
				logger().error(err)
			}
			throw err
		}
	}

	static async ExecSyncFlowList(lifeCycleList: LifeCycle[], createOrDestroy: FlowDirectionMapper): Promise<void> {
		await Promise.all(lifeCycleList.map((lifeCycle: LifeCycle) => lifeCycle[createOrDestroy]()))
	}
}
