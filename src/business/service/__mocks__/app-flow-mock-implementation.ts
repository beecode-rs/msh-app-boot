import { type LifeCycleMockImplementation } from '#src/business/service/__mocks__/life-cycle-mock-implementation.js'
import { AppFlow } from '#src/business/service/app-flow.js'

export type FlowListMockImplementation = (LifeCycleMockImplementation | LifeCycleMockImplementation[])[]

export class AppFlowMockImplementation extends AppFlow {
	constructor(...args: FlowListMockImplementation) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		super(...(args as any))
	}
}
