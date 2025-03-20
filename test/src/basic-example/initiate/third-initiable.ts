import { LifeCycle } from '@beecode/msh-app-boot/life-cycle'

export class ThirdInitiable extends LifeCycle {
	constructor() {
		super({ name: 'Third initiable' })
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/require-await
	protected async _createFn(): Promise<any> {
		console.log('%%%%%% Third create') // eslint-disable-line no-console
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/require-await
	protected async _destroyFn(): Promise<any> {
		console.log('%%%%%% Third destroy') // eslint-disable-line no-console
	}
}
