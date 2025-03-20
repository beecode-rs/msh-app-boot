import { type LifeCycleMockImplementation } from '#src/__mocks__/life-cycle-mock-implementation'
import { AppFlow } from '#src/app-flow'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type FlowListMockImplementation = (LifeCycleMockImplementation | LifeCycleMockImplementation[])[]

export class AppFlowMockImplementation extends AppFlow {
	constructor(...args: FlowListMockImplementation) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		super(...(args as any))
	}
}
