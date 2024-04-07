import { LifeCycleMockImplementation } from '#src/__mocks__/life-cycle-mock-implementation'
import { AppFlow } from '#src/app-flow'

export type FlowListMockImplementation = (LifeCycleMockImplementation | LifeCycleMockImplementation[])[]

export class AppFlowMockImplementation extends AppFlow {
	constructor(...args: FlowListMockImplementation) {
		super(...(args as any))
	}
}
