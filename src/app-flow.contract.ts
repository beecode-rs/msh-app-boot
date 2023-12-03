import { contractFactory } from '@beecode/msh-test-contractor/dist/contract/contractor-factory'
import { SpecialFnName } from '@beecode/msh-test-contractor/dist/enum/special-fn-name'

import * as AppFlow from '#/app-flow'

export const dummyData = Object.freeze({
	lifeCycleList: [{ init: 1 }, [{ init: 2.1 }, { init: 2.2 }], { init: 3 }],
	reverseLifeCycleList: [{ init: 3 }, [{ init: 2.1 }, { init: 2.2 }], { init: 1 }],
})

export default contractFactory(
	{ module: AppFlow, subjectName: 'AppFlow' },
	{
		[SpecialFnName.CONSTRUCTOR]: {
			terms: [
				{
					params: [...dummyData.lifeCycleList],
					// eslint-disable-next-line @typescript-eslint/naming-convention
					result: { _flowList: [...dummyData.lifeCycleList] },
				},
			],
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		_topLevelReversedFlowList: {
			terms: [
				{
					constructorParams: [...dummyData.lifeCycleList],
					params: [],
					result: dummyData.reverseLifeCycleList,
				},
			],
		},
	}
)
